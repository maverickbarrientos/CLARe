from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from sqlalchemy.orm import joinedload
from datetime import timedelta, datetime, timezone
import qrcode, json, uuid

from .base import BaseService
from models.qr_code import QRCode
from models.reservation import Reservation

from schemas.qr_code_schemas import QRCodeCreate, QRCodeResponse, QRCodeStatus
from schemas.reservation_schemas import ReservationCreateResponse

class QRCodeService(BaseService):  
    
    async def __save_qr_to_db(self, payload: QRCodeCreate) -> QRCodeResponse:
        
        qr_code = QRCode(**payload)
        
        self.session.add(qr_code)
        
        try:
            await self.session.commit()
            
        except IntegrityError as e:
            await self.session.rollback()
            print(f"Integrity error in __save_qr_to_db : {e}")
            raise HTTPException(status_code=400, detail="QR Code already exists")
        
        except SQLAlchemyError as e:
            await self.session.rollback()
            print(f"Database error in __save_qr_to_db (commit) : {e}")
            raise HTTPException(status_code=500, detail="Failed to save QR Code to database")
        
        await self.session.refresh(qr_code)
        
        return qr_code
    
    async def __get_qr(self, qr_value: str):
        
        stmt = (select(QRCode)
                .where(QRCode.qr_value == qr_value)
                .options(joinedload(QRCode.reservations))
                )
                
        try:
            result = await self.session.execute(stmt)
            qr_code = result.scalar_one_or_none()
            
        except SQLAlchemyError as e:
            print(f"Database error in __get_qr (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch QR Code")
        
        if not qr_code:
            raise HTTPException(status_code=404, detail="QR Code not found")
        
        return qr_code
    
    async def invalidate_qr_code(self, qr_code):
        
        setattr(qr_code, "status", "invalid")
        
        try:
            await self.session.commit()
        
        except IntegrityError as e:
            await self.session.rollback()
            print(f"Integrity error in __update_reservation : {e}")
            raise HTTPException(status_code=400, detail="Reservation already updated")
        
        except SQLAlchemyError as e:
            await self.session.rollback()
            print(f"Database error in __update_reservation (commit) : {e}")
            raise HTTPException(status_code=500, detail="Failed to update reservation status")
        
        await self.session.refresh(qr_code)
        
        return qr_code
    
    async def __update_reservation(self, reservation: Reservation):
        
        setattr(reservation, "status", "in_use")
        
        try:
            await self.session.commit()
        
        except IntegrityError as e:
            await self.session.rollback()
            print(f"Integrity error in __update_reservation : {e}")
            raise HTTPException(status_code=400, detail="Reservation already updated")
        
        except SQLAlchemyError as e:
            await self.session.rollback()
            print(f"Database error in __update_reservation (commit) : {e}")
            raise HTTPException(status_code=500, detail="Failed to update reservation status")
        
        await self.session.refresh(reservation)
        
        return reservation
    
    async def generate_qr_data(self, reservation: ReservationCreateResponse) -> QRCodeResponse:
        
        expiry_date = reservation.start_date + timedelta(minutes=30)
        
        qr_data = { "reservation_id" : reservation.id,
                     "qr_value" : uuid.uuid4(),
                     "issue_date" : datetime.now(timezone.utc),
                     "expiry_date" : expiry_date,
                     }
        
        return qr_data
      
    async def create_qr_code(self, payload: QRCodeCreate) -> QRCodeResponse:
        
        qr = qrcode.QRCode()
                
        qr.add_data(str(payload["qr_value"]))

        try:
            qr.make(fit=True)    
            img = qr.make_image(fill_color=True, back_color="white")
            img_name = f"reservation.png"
            img.save(img_name)
            
            qr_code = await self.__save_qr_to_db(payload)
            
        except Exception as e:
            print(f"QR Code generation error (create_qr_code) : {e}")
            raise HTTPException(status_code=500, detail="Failed to generate QR Code")
        
        return qr_code
    
    async def verify_qr(self, qr_value: str):
                
        qr_code = await self.__get_qr(qr_value)
        
        if qr_code.status == QRCodeStatus.invalid:
            raise HTTPException(status_code=400, detail="QR Code invalid")
        
        reservation = qr_code.reservations
        
        now = datetime.now(timezone.utc)
        start_scan = reservation.start_date - timedelta(minutes=30)
        end_scan = reservation.start_date + timedelta(minutes=30)
        
        if now < start_scan:
            raise HTTPException(status_code=400, detail="Cannot scan yet")
        
        if now > end_scan:
            raise HTTPException(status_code=400, detail="Scan no longer valid")

        updated_reservation = await self.__update_reservation(reservation)        
        updated_qr_with_reservation = await self.invalidate_qr_code(qr_code)
        
        return updated_qr_with_reservation