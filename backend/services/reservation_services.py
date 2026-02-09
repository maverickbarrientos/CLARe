from sqlalchemy import select, and_
from datetime import date, timedelta

from .base import BaseService
from database.base import Reservations, ComputerLabs

class ReservationService(BaseService):
    
    async def check_conflict(self, lab_id, start_date, end_date):
        if start_date < date.today() + timedelta(days=2):
            return { "success" : False, "message" : "Reservation must be made at least 2 days in advance" }
        
        stmt = select(Reservations).where(
                and_(Reservations.lab_id == lab_id,
                     Reservations.start_date < end_date, 
                     Reservations.end_date > start_date
                    )
                )
        
        result = await self.session.execute(stmt)
        conflicts = result.scalar_one_or_none()
        
        return conflicts