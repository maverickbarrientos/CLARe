from fastapi import HTTPException
from sqlalchemy import select, and_, or_
from sqlalchemy.orm import joinedload
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from datetime import datetime, timedelta, timezone

from .base import BaseService
from models.reservation import Reservation
from models.users_information import UsersInformation
from database.base import Users

from schemas.reservation_schemas import ReservationStatus, ReservationCreate, ReservationUpdate

class ReservationService(BaseService):
    
    # async def __get_reservations(self):
    #     stmt = (select(Reservation)
    #             .join(Reservation.user)
    #             .join(Users.users_information)
    #             .options(joinedload(Reservation.user).joinedload(Users.users_information)))
        
    #     try:
    #         result = await self.session.execute(stmt)
    #         reservations = result.unique().scalars().all()
        
    #     except SQLAlchemyError as e:
    #         print(f"Database error in __get_reservations (fetch) : {e}")
    #         raise HTTPException(status_code=500, detail="Failed to fetch all reservations")
        
    #     return reservations
    
    async def __check_conflict(self, lab_id, start_date, end_date):
                
        if start_date < datetime.now(timezone.utc):
            return { "success" : False, "message" : "Reservation must be made at least 2 days in advance" }
        
        stmt = select(Reservation).where(
                and_(Reservation.lab_id == lab_id,
                     Reservation.start_date < end_date, 
                     Reservation.end_date > start_date
                    )
                )
        
        result = await self.session.execute(stmt)
        conflicts = result.scalar_one_or_none()
        
        return conflicts
    
    
    async def __check_existing_reservation(self, user_id):
        
        stmt = select(Reservation).where(Reservation.user_id == user_id)
        
        try:
            result = await self.session.execute(stmt)
            existing_reservation = result.scalar_one_or_none()
        
        except IntegrityError as e:
            print(f"Integrity error in check_existing_reservation : {e}")
            raise HTTPException(status_code=400, detail="Reservation for User already exists")
        
        except SQLAlchemyError as e:
            print(f"Database error in check_existing_reservation (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch existing reservation")
        
        return existing_reservation
            
    
    async def create_reservation(self, payload: ReservationCreate):
        existing_reservation = await self.__check_existing_reservation(payload.user_id)
        
        if existing_reservation:
            raise HTTPException(status_code=409, detail="Reservation already exists")
        
        conflicts = await self.__check_conflict(payload.lab_id, payload.start_date, payload.end_date)
        
        if conflicts:
            print("Hello, World")
            
        reservation = Reservation(**payload.model_dump())
        
        self.session.add(reservation)
        
        try:
            await self.session.commit()
            
        except SQLAlchemyError as e:
            await self.session.rollback()
            print(f"Database error in create_reservation (commit) : {e}")
            raise HTTPException(status_code=500, detail="Failed to create reservation")
        
        await self.session.refresh(reservation)
        
        return reservation
    
    
    async def get_all_reservations(self):
    
        stmt = (select(Reservation)
                .join(Reservation.user)
                .join(Users.users_information)
                .options(joinedload(Reservation.user).joinedload(Users.users_information)))
        
        try:
            result = await self.session.execute(stmt)
            reservations = result.unique().scalars().all()
            
        except SQLAlchemyError as e:
            print(f"Database error in get_all_reservations (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch all reservations")
        
        return reservations
    
    
    async def get_reservation_by_id(self, reservation_id):
        
        stmt = (select(Reservation).where(Reservation.id == reservation_id)
                .join(Reservation.user)
                .join(Users.users_information)
                .options(joinedload(Reservation.user).joinedload(Users.users_information))
                )
        
        try:
            result = await self.session.execute(stmt)
            reservation = result.unique().scalar_one_or_none()
            
        except SQLAlchemyError as e:
            print(f"Database error in get_reservation_by_id (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch reservation")
        
        if not reservation:
            raise HTTPException(status_code=404, detail="Reservation not found")
        
        return reservation
    
    async def search_reservation(self, search: str):
        
        stmt = (select(Reservation)
                .join(Reservation.user)
                .join(Users.users_information)
                .options(joinedload(Reservation.user).joinedload(Users.users_information)))
        
        if search:
            stmt = stmt.where(or_(
                UsersInformation.first_name.ilike(f"%{search}%"),
                UsersInformation.last_name.ilike(f"%{search}"),
                UsersInformation.program.ilike(f"%{search}%")
            ))
        
        try:
            result = await self.session.execute(stmt)
            reservation_search = result.unique().scalars().all()
            
        except SQLAlchemyError as e:
            print(f"Database error in search_reservation (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to search reservation")
        
        return reservation_search
    
    async def update_reservation(self, payload: ReservationUpdate, reservation_id):
        
        stmt = select(Reservation).where(Reservation.id == reservation_id)
        
        try:
            result = await self.session.execute(stmt)
            reservation = result.scalar_one_or_none()
        
        except SQLAlchemyError as e:
            print(f"Database error in update_reservation (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch reservation")
        
        if not reservation: 
            raise HTTPException(status_code=404, detail="Reservation not found")
        
        reservation_conflicts = await self.__check_conflict(payload.lab_id, payload.start_date, payload.end_date)
        
        if reservation_conflicts:
            raise HTTPException(status_code=409, detail="Conflict between dates!")
        
        for key, value in payload.model_dump(exclude_unset=True).items():
            setattr(reservation, key, value)
        
        try:
            await self.session.commit()
        
        except IntegrityError as e:
            print(f"Integrity error in update_reservation : {e}")
            raise HTTPException(status_code=400, detail="Reservation already exists")

        except SQLAlchemyError as e:
            print(f"Database error in update_reservation (commit) : {e}")
            raise HTTPException(status_code=500, detail="Failed to update reservation")
        
        await self.session.refresh(reservation)
        
        return reservation
    
    async def delete_reservation(self, reservation_id):
        
        if not reservation_id:
            raise HTTPException(status_code=400, detail="No Reservation ID found")
        
        stmt = select(Reservation).where(Reservation.id == reservation_id)
        
        try:
            result = await self.session.execute(stmt)
            reservation = result.scalar_one_or_none()
            
        except SQLAlchemyError as e:
            print(f"Database error in delete_reservation (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch reservation")
        
        if not reservation:
            raise HTTPException(status_code=404, detail="Reservation not found")
        
        try:
            await self.session.delete(reservation)
            await self.session.commit()

        except SQLAlchemyError as e:
            await self.session.rollback()
            print(f"Database error in delete_reservation (commit) : {e}")
            raise HTTPException(status_code=500, detail="Failed to delete reservation")
        
        return "deleted"
    
    async def update_reservation_status(self, reservation_id, status: ReservationStatus):
        
        stmt = select(Reservation).where(Reservation.id == reservation_id)
        
        try:
            result = await self.session.execute(stmt)
            reservation = result.scalar_one_or_none()
            
        except SQLAlchemyError as e:
            print(f"Database error in approve_reservation (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch reservation")
        
        if not reservation:
            raise HTTPException(status_code=404, detail="Reservation not found")
                
        
        match status:
            case ReservationStatus.reserved:
                print("send an email")
            case ReservationStatus.rejected:
                print("send email of rejection")
            
        
        setattr(reservation, "status", status)
        
        try:
            await self.session.commit()
            
        except IntegrityError as e:
            print(f"Integrity error in approve_reservation : {e}")
            raise HTTPException(status_code=400, detail="Reservation already approved")
        
        except SQLAlchemyError as e:
            print(f"Database error in approve_reservation (commit) : {e}")
            raise HTTPException(status_code=500, detail="Failed to update Reservation status")
        
        await self.session.refresh(reservation)
        
        return reservation