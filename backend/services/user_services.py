from sqlalchemy import select, update, delete

from .base import BaseService
from database.base import Users, UsersInformation, Reservations, ComputerLabs

class UserServices(BaseService):
    
    async def get_computer_labs(self):
        stmt = select(ComputerLabs).where(ComputerLabs.id == Reservations.lab_id)
        result = self.session.execute(stmt)
        reserved_labs = result.scalars().all()
        
        return reserved_labs