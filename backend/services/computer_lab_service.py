from fastapi import HTTPException
from sqlalchemy import select, and_, insert, delete
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime, timezone, date, timedelta

from database.base import ComputerLabs, Reservations

from schemas.computer_lab_schema import ComputerLabCreate, ComputerLabResponse, ComputerLabUpdate

class ComputerLabService():
    def __init__(self, session: AsyncSession):
        self.session = session
        
    async def get_computer_labs(self) -> list[ComputerLabResponse]:
        stmt = select(ComputerLabs)
        result = await self.session.execute(stmt)
        computer_labs = result.scalars().all()
        
        if not computer_labs:
            raise HTTPException(status_code=404, detail="No computer labs found")
        
        return computer_labs
    
    async def get_computer_lab(self, lab_id) -> ComputerLabResponse:
        stmt = select(ComputerLabs).where(ComputerLabs.id == lab_id)
        result = await self.session.execute(stmt)
        computer_lab = result.scalars().all()
        
        if not computer_lab:
            raise HTTPException(status_code=404, detail="Computer Lab not found")
        
        return 
    
    async def create_lab(self, computer_lab: ComputerLabCreate) -> ComputerLabResponse:
        
        new_lab = ComputerLabs(**computer_lab.model_dump())
        self.session.add(new_lab)
        await self.session.commit()
        await self.session.refresh(new_lab)
        
        return new_lab
    
    async def delete_lab(self, lab_id: int) -> dict[str, str]:
        
        if not lab_id:
            raise HTTPException(status_code=400, detail="No ID provided")
        
        stmt = delete(ComputerLabs).where(ComputerLabs.id == lab_id)
        
        await self.session.execute(stmt)
        await self.session.commit()
        
        return { "status" : "deleted" }
    
    async def update_lab(self, lab_id: int, payload: ComputerLabUpdate) -> ComputerLabResponse:
        
        stmt = select(ComputerLabs).where(ComputerLabs.id == lab_id)
        result = await self.session.execute(stmt)
        computer_lab = result.scalar_one_or_none()
        
        if not computer_lab:
            raise HTTPException(status_code=404, detail="Computer lab not found")
                
        for key, value in payload.model_dump(exclude_unset=True).items():
            setattr(computer_lab, key, value)
            
        await self.session.commit()
        await self.session.refresh(computer_lab)
        
        return computer_lab