from fastapi import HTTPException
from sqlalchemy import select, and_, or_
from sqlalchemy.orm import joinedload
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from datetime import datetime, timedelta

from models.reservation import Reservation
from models.users_information import UsersInformation
from models.lab_class import LabClass
from database.base import Users

from schemas.reservation_schemas import ReservationStatus, UserReservationCreate, AdminReservationCreate, ReservationUpdate, ReservationResponse, ReservationCreateResponse

from .qr_code_service import QRCodeService
from .mailer_service import MailerService

class ReservationService(QRCodeService, MailerService):
    
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
    
    async def _fetch_reservation_by_id(self, reservation_id):
        stmt = select(Reservation).where(Reservation.id == reservation_id)
        
        try:
            result = await self.session.execute(stmt)
            reservation = result.scalar_one_or_none()
            
        except SQLAlchemyError as e:
            print(f"Database error in delete_reservation (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch reservation")
        
        return reservation
    
    async def __check_conflict(self,lab_id, start_date, end_date):
                
        if start_date.replace(tzinfo=None) < datetime.now():
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
    
    async def __has_date_conflict(self, reservation_id, lab_id, start_date, end_date):
        if start_date < datetime.now():
            return { "success" : False, "message" : "Reservation must be made at least 2 days in advance" }
        
        stmt = select(Reservation).where(
                and_(Reservation.id != reservation_id,
                     Reservation.lab_id == lab_id,
                     Reservation.start_date < end_date, 
                     Reservation.end_date > start_date
                    )
                )
        
        result = await self.session.execute(stmt)
        conflicts = result.scalar_one_or_none()
        
        return conflicts
    
    async def __is_deletable(self, reservation: Reservation) -> bool:
        return reservation.status in [ReservationStatus.pending, ReservationStatus.completed, ReservationStatus.cancelled, ReservationStatus.rejected]
    
    async def __check_existing_reservation(self, user_id: int):
        
        stmt = (select(Reservation)
                .where(Reservation.user_id == user_id)
                .where(Reservation.status.in_([ReservationStatus.pending, ReservationStatus.reserved, ReservationStatus.in_use])))
        
        try:
            result = await self.session.execute(stmt)
            existing_reservation = result.scalars().all()
            
        except IntegrityError as e:
            print(f"Integrity error in check_existing_reservation : {e}")
            raise HTTPException(status_code=400, detail="Reservation for User already exists")
        
        except SQLAlchemyError as e:
            print(f"Database error in check_existing_reservation (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch existing reservation")
        
        return existing_reservation
            
    
    async def user_create_reservation(self, payload: UserReservationCreate, user: Users):
        existing_reservation = await self.__check_existing_reservation(user.id)
        
        if existing_reservation:    
            raise HTTPException(status_code=409, detail="You still have an existing reservation")
        
        conflicts = await self.__check_conflict(payload.lab_id, payload.start_date, payload.end_date)
        
        if conflicts:
            raise HTTPException(status_code=409, detail="Date conflicts")

        await self.session.refresh(user, ["users_information"])
        
        full_name = f"{user.users_information.first_name} {user.users_information.last_name}"
        department = f"{user.users_information.department}"
                
        reservation = Reservation(**payload.model_dump(), user_id=user.id,email=user.email, full_name=full_name, department=department)
        self.session.add(reservation)
                
        try:
            await self.session.commit()
            
        except IntegrityError as e:
            await self.session.rollback()
            print(f"Integrity error in user_create_reservation : {e}")
            raise HTTPException(status_code=400, detail="Reservation already exists")
        
        except SQLAlchemyError as e:
            await self.session.rollback()
            print(f"Database error in user_create_reservation (commit) : {e}")
            raise HTTPException(status_code=500, detail="Failed to create reservation")
        
        await self.session.refresh(reservation)
        
        reservation_response = await self.get_reservation_by_id(reservation.id)
        
        return reservation_response
    
    async def create_reservation(self, payload: AdminReservationCreate):  
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
        
        reservation_response = await self.get_reservation_by_id(reservation.id)
        
        print("Generate QR Code")
        
        # if reservation.status == ReservationStatus.reserved:
        #     qr_payload = await self.generate_qr_data(reservation)
        #     qr_code = await self.create_qr_code(qr_payload)
        
        return reservation
    
    async def get_weekly_events(self, start_of_week, end_of_week):
        
        reservations_stmt = (select(Reservation)
                             .where(and_(
                                 Reservation.start_date < start_of_week + timedelta(days=6),
                                 Reservation.end_date > start_of_week,
                                 Reservation.status.in_([
                                     ReservationStatus.reserved,
                                     ReservationStatus.in_use
                                 ])
                             )))
        
        classes_stmt = select(LabClass)
                
        try:
            reservations_result = await self.session.execute(reservations_stmt)
            classes_result = await self.session.execute(classes_stmt)
            reservations = reservations_result.scalars().all()
            classes = classes_result.scalars().all()
                        
        except SQLAlchemyError as e:
            print(f"Database error in get_weekly_events (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch reservations and classes")
        
        return { "reservations": reservations, "classes": classes }
    
    async def get_all_reservations(self, search: str) -> list[ReservationResponse]:
    
        stmt = (select(Reservation)
                .join(Reservation.user)
                .join(Users.users_information)
                .join(Reservation.computer_labs)
                .outerjoin(Reservation.qr_codes)
                .outerjoin(Reservation.cancellation_requests)
                .options(
                    joinedload(Reservation.user).joinedload(Users.users_information),
                    joinedload(Reservation.computer_labs),
                    joinedload(Reservation.qr_codes),
                    joinedload(Reservation.cancellation_requests)
                ))
        
        if search:
            stmt = stmt.where(or_(
                    Reservation.full_name.ilike(f"%{search}%"),
                    UsersInformation.department.ilike(f"%{search}%")
                ))
        
        try:
            result = await self.session.execute(stmt)
            reservations = result.unique().scalars().all()
            
        except SQLAlchemyError as e:
            print(f"Database error in get_all_reservations (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch all reservations")
        
        return reservations
    
    async def get_upcoming_reservation(self, user_id: int):
        
        stmt = (select(Reservation)
                .where(Reservation.user_id == user_id)
                .where(Reservation.start_date >= datetime.now())
                .where(Reservation.status.in_([
                    ReservationStatus.pending,
                    ReservationStatus.reserved
                ]))
                .join(Reservation.computer_labs)
                .join(Reservation.user)
                .join(Users.users_information)
                .options(
                    joinedload(Reservation.user).joinedload(Users.users_information),
                    joinedload(Reservation.computer_labs)
                )
            )
        try:
            result = await self.session.execute(stmt)
            upcoming_reservation = result.scalar_one_or_none()
            
        except SQLAlchemyError as e:
            print(f"Database error in get_upcoming_reservation (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch upcoming reservatiion")
        
        return upcoming_reservation    
        
    
    async def get_reservation_by_id(self, reservation_id) -> ReservationResponse:
        
        stmt = (select(Reservation).where(Reservation.id == reservation_id)
                .join(Reservation.user)
                .join(Users.users_information)
                .join(Reservation.computer_labs)
                .outerjoin(Reservation.qr_codes)
                .outerjoin(Reservation.cancellation_requests)
                .options(joinedload(Reservation.user).joinedload(Users.users_information),
                         joinedload(Reservation.computer_labs),
                         joinedload(Reservation.qr_codes),
                         joinedload(Reservation.cancellation_requests))
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
    
    async def get_user_reservations(self, user_id):
        
        stmt = (select(Reservation).where(Reservation.user_id == user_id)
                .join(Reservation.user)
                .join(Users.users_information)
                .join(Reservation.computer_labs)
                .outerjoin(Reservation.qr_codes)
                .options(
                    joinedload(Reservation.user).joinedload(Users.users_information),
                    joinedload(Reservation.computer_labs), joinedload(Reservation.qr_codes)
                ))
        
        try: 
            result = await self.session.execute(stmt)
            user_reservations = result.scalars().all()
            
        except SQLAlchemyError as e:
            print(f"Database error in get_user_reservation (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch reservations")
        
        return user_reservations
    
    async def get_reservation_by_user(self, user_id):
        stmt = (select(Reservation).where(Reservation.user_id == user_id)
                .join(Reservation.user)
                .join(Users.users_information)
                .join(Reservation.computer_labs)
                .options(
                    joinedload(Reservation.user).joinedload(Users.users_information),
                    joinedload(Reservation.computer_labs)
                ))
        
        try: 
            result = await self.session.execute(stmt)
            user_reservations = result.scalar_one_or_none()
            
        except SQLAlchemyError as e:
            print(f"Database error in get_user_reservation (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch reservations")
        
        return user_reservations
    
    async def search_reservation(self, search: str) -> list[ReservationResponse]:
        
        stmt = (select(Reservation)
                .join(Reservation.user)
                .join(Users.users_information)
                .options(joinedload(Reservation.user).joinedload(Users.users_information)))
        
        if search:
            stmt = stmt.where(or_(
                Reservation.full_name.ilike(f"%{search}%"),
                UsersInformation.department.ilike(f"%{search}%")
            ))
        
        try:
            result = await self.session.execute(stmt)
            reservation_search = result.unique().scalars().all()
            
        except SQLAlchemyError as e:
            print(f"Database error in search_reservation (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to search reservation")
        
        return reservation_search
    
    
    async def update_reservation(self, payload: ReservationUpdate, reservation_id) -> ReservationCreateResponse:
        
        reservation = await self._fetch_reservation_by_id(reservation_id)
        
        if not reservation: 
            raise HTTPException(status_code=404, detail="Reservation not found")
        
        reservation_conflicts = await self.__has_date_conflict(reservation_id, payload.lab_id, payload.start_date, payload.end_date)
        
        # if reservation_conflicts:
        #     raise HTTPException(status_code=409, detail="Conflict between dates!")
        
        for key, value in payload.model_dump(exclude_unset=True).items():
            print(reservation, key, value)
            setattr(reservation, key, value)
        
        try:
            await self.session.commit()

        except SQLAlchemyError as e:
            print(f"Database error in update_reservation (commit) : {e}")
            raise HTTPException(status_code=500, detail="Failed to update reservation")
        
        await self.session.refresh(reservation)
        
        reservation_response = await self.get_reservation_by_id(reservation.id)
        
        return reservation_response
    
    async def user_update_reservation(self, user_id: int,payload: ReservationUpdate, reservation_id): 
        
        stmt = (select(Reservation)
                .where(and_(Reservation.id == reservation_id, 
                            Reservation.user_id == user_id)))
        
        try: 
            result = await self.session.execute(stmt)
            reservation = result.scalar_one_or_none()
            
        except SQLAlchemyError as e:
            print(f"Database error in user_update_reservation (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch user reservation")
        
        if not reservation:
            raise HTTPException(status_code=404, detail="Reservation not found")
        
        if reservation.status != ReservationStatus.pending:
            raise HTTPException(status_code=409, detail="Reservation can only be updated when reservation is pending")
        
        reservation_conflicts = await self.__has_date_conflict(reservation.id, payload.lab_id, payload.start_date, payload.end_date)
                
        if reservation_conflicts:
            raise HTTPException(status_code=409, detail="Conflict between dates!")
        
        for key, value in payload.model_dump(exclude_unset=True).items():
            setattr(reservation, key, value)
            
        try:
            await self.session.commit()
        
        except SQLAlchemyError as e:
            await self.session.rollback()
            print(f"Database error in user_update_reservation (commit) : {e}")
            raise HTTPException(status_code=500, detail="Failed to update reservation")
        
        await self.session.refresh(reservation)
        
        return reservation
    
    async def user_delete_reservation(self, reservation_id, user_id):
        stmt = (select(Reservation)
                .where(and_(Reservation.id == reservation_id, 
                            Reservation.user_id == user_id)))
        
        try: 
            result = await self.session.execute(stmt)
            reservation = result.scalar_one_or_none()
            
        except SQLAlchemyError as e:
            print(f"Database error in user_update_reservation (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch user reservation")
        
        if not reservation:
            raise HTTPException(status_code=404, detail="Reservation not found")
        
        deletable = await self.__is_deletable(reservation)
                
        if not deletable:
            raise HTTPException(status_code=409, detail="Reservation cannot be deleted at its current status")
        
        try:
            await self.session.delete(reservation)
            await self.session.commit()
            
        except SQLAlchemyError as e:
            await self.session.rollback()
            print(f"Database error in user_delete_reservation (commit) : {e}")
            raise HTTPException(status_code=500, detail="Failed to delete reservation")
        
        return "deleted"

    async def delete_reservation(self, reservation_id) -> str:
        
        if not reservation_id:
            raise HTTPException(status_code=400, detail="No Reservation ID found")
        
        reservation = await self._fetch_reservation_by_id(reservation_id)
        
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
    
    
    async def update_reservation_status(self, reservation_id, status: ReservationStatus) -> ReservationCreateResponse:
        
        reservation = await self._fetch_reservation_by_id(reservation_id)
        
        if not reservation:
            raise HTTPException(status_code=404, detail="Reservation not found")
        
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
        
        reservation_response = await self.get_reservation_by_id(reservation.id)
        
        match reservation.status:
            case ReservationStatus.reserved:
                qr_payload = await self.generate_qr_data(reservation)
                qr_code = await self.create_qr_code(qr_payload)
                await self.send_email({ "to" : [reservation.email], 
                                 "subject": "reservation confirmed", 
                                 "template": "templates/reservation-confirmed.html",
                                  "context" : {
                                      "full_name" : reservation.full_name,
                                      "lab_name" : reservation_response.computer_labs.lab_name,
                                      "location" : reservation_response.computer_labs.location,
                                      "start_date" : reservation.start_date,
                                      "end_date" : reservation.end_date,
                                      "department" : reservation.department,
                                      "reservation_description" : reservation.reservation_description,
                                      "qr_url": qr_code.image_url
                                  } })
        
            case ReservationStatus.rejected:
                print("send email of rejection")
                        
        return reservation_response