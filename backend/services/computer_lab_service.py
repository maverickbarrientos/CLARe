from fastapi import HTTPException
from sqlalchemy import select, or_, func
from sqlalchemy.orm import joinedload, contains_eager
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from datetime import datetime, timedelta

from models.computer_lab import ComputerLab
from models.reservation import Reservation

from .base import BaseService
from schemas.computer_lab_schema import ComputerLabCreate, ComputerLabResponse, ComputerLabUpdate
from schemas.reservation_schemas import ReservationStatus

class ComputerLabService(BaseService):
        
    async def get_all_labs(self) -> list[ComputerLabResponse]:
        
        stmt = select(ComputerLab).options(joinedload(ComputerLab.reservations))
        
        try:
            result = await self.session.execute(stmt)
            computer_labs = result.unique().scalars().all()
        
        except SQLAlchemyError as e:
            print(f"An unexpected SQLAlchemy error occurred : {e}")
            raise HTTPException(status_code=500, detail="Database connection failed")

        if not computer_labs:
            raise HTTPException(status_code=404, detail="No computer labs found")
        
        return computer_labs
    
    
    async def get_lab_by_id(self, lab_id: int) -> ComputerLabResponse:
        
        stmt = (select(ComputerLab).outerjoin(ComputerLab.reservations)
                .where(ComputerLab.id == lab_id)
                .where(or_(Reservation.status.in_([
                        ReservationStatus.reserved,
                        ReservationStatus.in_use,
                        ReservationStatus.pending
                        ]),
                        Reservation.id == None
                    ))
                ).options(contains_eager(ComputerLab.reservations))

        try:
            result = await self.session.execute(stmt)
            computer_lab = result.unique().scalar_one_or_none()
        
        except SQLAlchemyError as e:
            print(f"An unexpected SQLAlchemy error occurred : {e}")
            raise HTTPException(status_code=500, detail="Database connection failed")
        
        if not computer_lab:
            raise HTTPException(status_code=404, detail="Computer Lab not found")
        
        return computer_lab
    
    async def get_active_labs(self):
        
        stmt = (select(ComputerLab).outerjoin(ComputerLab.reservations)
                .where(Reservation.status.in_([
                        ReservationStatus.reserved,
                        ReservationStatus.in_use
                    ]))
                ).options(contains_eager(ComputerLab.reservations))
        
        try:
            result = await self.session.execute(stmt)
            computer_labs = result.unique().scalars().all()
            
        except SQLAlchemyError as e:
            print(f"Database error in get_active_labs (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch active labs")
        
        return computer_labs
    
    async def create_lab(self, computer_lab: ComputerLabCreate) -> ComputerLabResponse:
        
        new_lab = ComputerLab(**computer_lab.model_dump())
        self.session.add(new_lab)
        
        try:
            await self.session.commit()
        
        except IntegrityError as e:
            await self.session.rollback()
            print(f"Integrity Error : {e}")
            raise HTTPException(status_code=400, detail="Lab already exists!")
        
        except SQLAlchemyError as e:
            await self.session.rollback()
            print(f"An unexpected SQLAlchemy Error occurred : {e}")
            raise HTTPException(status_code=500, detail="Failed to create lab")
        
        await self.session.refresh(new_lab)
        return new_lab
    
    
    async def delete_lab(self, lab_id: int) -> str:
        
        if not lab_id:
            raise HTTPException(status_code=400, detail="No ID provided")
        
        try:
            stmt = select(ComputerLab).where(ComputerLab.id == lab_id)
            result = await self.session.execute(stmt)
            computer_lab = result.scalar_one_or_none()
    
        except SQLAlchemyError as e:
            print(f"Database error in delete_lab (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch lab")
        
        if not computer_lab:
            raise HTTPException(status_code=404, detail="Computer Lab not found")
        
        try: 
            await self.session.delete(computer_lab)
            await self.session.commit()
            
        except IntegrityError as e:
            await self.session.rollback()
            print(f"Integrity error in delete_lab")
            raise HTTPException(status_code=400, detail="Cannot delete lab - it has related reservations")    
        
        except SQLAlchemyError as e:
            await self.session.rollback()
            print(f"Database error in delete_lab (commit) : {e}")
            raise HTTPException(status_code=500, detail="Failed to delete lab")
        
        return "deleted"
    
    
    async def update_lab(self, lab_id: int, payload: ComputerLabUpdate) -> ComputerLabResponse:
        
        try:
            stmt = select(ComputerLab).where(ComputerLab.id == lab_id)
            result = await self.session.execute(stmt)
            computer_lab = result.scalar_one_or_none()
            
        except SQLAlchemyError as e:
            print(f"Database error update_lab (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch lab")
        
        if not computer_lab:
            raise HTTPException(status_code=404, detail="Computer lab not found")
                
        for key, value in payload.model_dump(exclude_unset=True).items():
            setattr(computer_lab, key, value)
            
        try:
            await self.session.commit()
        
        except IntegrityError as e:
            await self.session.rollback()
            print(f"Integrity error in update_lab (commit) : {e}")
            raise HTTPException(status_code=400, detail="Lab already exists")    
        
        except SQLAlchemyError as e:
            await self.session.rollback()
            print(f"Database error in update_lab (commit) : {e}")
            raise HTTPException(status_code=500, detail="Failed to update lab")
        
        await self.session.refresh(computer_lab)
        
        return computer_lab
    
    async def get_lab_analytics(self):

        seven_days_ago = datetime.now() - timedelta(days=7)

        try:
            # --- Most Used Lab (last 7 days) ---
            most_used_stmt = (
                select(ComputerLab.lab_name, func.count(Reservation.id).label("count"))
                .join(Reservation, Reservation.lab_id == ComputerLab.id)
                .where(Reservation.start_date >= seven_days_ago)
                .group_by(ComputerLab.id)
                .order_by(func.count(Reservation.id).desc())
                .limit(1)
            )
            most_used_result = await self.session.execute(most_used_stmt)
            most_used = most_used_result.first()

            # --- Total Reservations (last 7 days) ---
            total_stmt = (
                select(func.count(Reservation.id))
                .where(Reservation.start_date >= seven_days_ago)
            )
            total_result = await self.session.execute(total_stmt)
            total = total_result.scalar() or 0

            # --- Utilization Rate ---
            # (labs that have at least 1 reservation in last 7 days / total labs) * 100
            total_labs_result = await self.session.execute(select(func.count(ComputerLab.id)))
            total_labs = total_labs_result.scalar() or 1

            active_labs_stmt = (
                select(func.count(func.distinct(Reservation.lab_id)))
                .where(Reservation.start_date >= seven_days_ago)
            )
            active_labs_result = await self.session.execute(active_labs_stmt)
            active_labs = active_labs_result.scalar() or 0

            utilization_rate = round((active_labs / total_labs) * 100)

        except SQLAlchemyError as e:
            print(f"Database error in get_lab_analytics: {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch lab analytics")

        return {
            "most_used_lab": {
                "lab_name": most_used.lab_name if most_used else "—",
                "count": most_used.count if most_used else 0,
            },
            "total_reservations": total,
            "utilization_rate": utilization_rate,
        }