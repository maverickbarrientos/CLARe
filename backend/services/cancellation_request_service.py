from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from datetime import datetime
from .base import BaseService
from .reservation_service import ReservationService

from models.cancellation_request import CancellationRequest

from schemas.cancellation_request_schema import CancellationStatus, CancellationRequestCreate
from schemas.reservation_schemas import ReservationStatus

class CancellationRequestService(ReservationService):
    
    async def get_cancellation_by_reservation(self, reservation_id):
        
        stmt = (select(CancellationRequest).where(CancellationRequest.reservation_id == reservation_id))
        
        """ JOIN CANCELLATION AND RESERVATION HERE """
        
        try:
            result = await self.session.execute(stmt)
            cancellation_request = result.scalar_one_or_none()
            
        except SQLAlchemyError as e:
            print(f"Database error in get_cancellation_by_reservation (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch cancellation request")
        
        return cancellation_request
    
    async def create_request(self, user_id: int, reservation_id: int, payload: CancellationRequestCreate):
        
        reservation = await self._fetch_reservation_by_id(reservation_id)
        existing_cancellation = await self.get_cancellation_by_reservation(reservation_id)
        
        if not reservation:
            raise HTTPException(status_code=404, detail="Reservation not found")
        
        if existing_cancellation:
            raise HTTPException(status_code=409, detail="Cancellation request already exists for this reservation")
        
        if reservation.status != ReservationStatus.reserved:
            raise HTTPException(status_code=409, detail="Cancellation request is only allowed for reserved reservations")
        
        cancellation_request = CancellationRequest(**payload.model_dump(), user_id=user_id, reservation_id=reservation_id)
        
        self.session.add(cancellation_request)
        
        try:
            await self.session.commit()
            
        except IntegrityError as e:
            print(f"Integrity error in create_request : {e}")
            raise HTTPException(status_code=409, detail="Cancellation for this reservation already exists")
        
        except SQLAlchemyError as e:
            print(f"Database error in create_request (commit) : {e}")
            raise HTTPException(status_code=500, detail="Failed to create cancellation request")
        
        await self.session.refresh(cancellation_request)
        updated_reservation = await self.update_reservation_status(reservation_id, ReservationStatus.pending_cancellation)
        
        return cancellation_request, updated_reservation
    
    async def reject_request(self, reservation_id: int, admin_note: str):
        stmt = select(CancellationRequest).where(CancellationRequest.reservation_id == reservation_id)
        
        try:
            result = await self.session.execute(stmt)
            cancellation_request = result.scalar_one_or_none()
            
        except SQLAlchemyError as e:
            print(f"Database error in reject_request (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch cancellation request")
        
        if not cancellation_request:
            raise HTTPException(status_code=404, detail="Reservation not found")
                
        setattr(cancellation_request, "status", CancellationStatus.rejected)
        setattr(cancellation_request, "admin_note", admin_note)
        setattr(cancellation_request, "handled_at", datetime.now())
        
        try:
            await self.session.commit()
            
        except SQLAlchemyError as e:
            await self.session.rollback()
            print(f"Database error in reject_request (commit) : {e}")
            raise HTTPException(status_code=500, detail="Failed to update cancellation request status")
        
        await self.session.refresh(cancellation_request)
        updated_reservation = await self.update_reservation_status(reservation_id, ReservationStatus.reserved)
        
        return cancellation_request, updated_reservation
    
    async def approve_request(self, reservation_id: int):
        
        stmt = select(CancellationRequest).where(CancellationRequest.reservation_id == reservation_id)
        
        try:
            result = await self.session.execute(stmt)
            cancellation_request = result.scalar_one_or_none()
            
        except SQLAlchemyError as e:
            print(f"Database error in reject_request (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch cancellation request")
        
        if not cancellation_request:
            raise HTTPException(status_code=404, detail="Reservation not found")
                
        setattr(cancellation_request, "status", CancellationStatus.approved)
        
        try:
            await self.session.commit()
            
        except SQLAlchemyError as e:
            await self.session.rollback()
            print(f"Database error in reject_request (commit) : {e}")
            raise HTTPException(status_code=500, detail="Failed to update cancellation request status")
        
        await self.session.refresh(cancellation_request)
        updated_reservation = await self.update_reservation_status(reservation_id, ReservationStatus.cancelled)
        
        return cancellation_request, updated_reservation