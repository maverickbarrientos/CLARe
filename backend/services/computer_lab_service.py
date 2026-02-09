from fastapi import HTTPException
from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime, timezone, date, timedelta

from database.base import ComputerLabs, Reservations

class ComputerLabService():
    def __init__(self, session: AsyncSession):
        self.session = session
        
    async def get_computer_labs(self):
        stmt = select(ComputerLabs)
        result = await self.session.execute(stmt)
        computer_labs = result.scalars().all()
        
        if not computer_labs:
            raise HTTPException(status_code=404, detail="No computer labs found")
        
        return computer_labs
    
    async def get_computer_lab(self, lab_id):
        stmt = select(ComputerLabs).where(ComputerLabs.id == lab_id)
        result = await self.session.execute(stmt)
        computer_lab = result.scalars().all()
        
        if not computer_lab:
            raise HTTPException(status_code=404, detail="Computer Lab not found")
        
        return computer_lab
     