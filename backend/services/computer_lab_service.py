from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from models.computer_lab import ComputerLab

from .base import BaseService
from schemas.computer_lab_schema import ComputerLabCreate, ComputerLabResponse, ComputerLabUpdate

class ComputerLabService(BaseService):
        
    async def get_all_labs(self) -> list[ComputerLabResponse]:
        
        try:
            stmt = select(ComputerLab)
            result = await self.session.execute(stmt)
            computer_labs = result.scalars().all()
        
        except SQLAlchemyError as e:
            print(f"An unexpected SQLAlchemy error occurred : {e}")
            raise HTTPException(status_code=500, detail="Database connection failed")

        if not computer_labs:
            raise HTTPException(status_code=404, detail="No computer labs found")
        
        return computer_labs
    
    
    async def get_lab_by_id(self, lab_id: int) -> ComputerLabResponse:
        
        try:
            stmt = select(ComputerLab).where(ComputerLab.id == lab_id)
            result = await self.session.execute(stmt)
            computer_lab = result.scalar_one_or_none()
        
        except SQLAlchemyError as e:
            print(f"An unexpected SQLAlchemy error occurred : {e}")
            raise HTTPException(status_code=500, detail="Database connection failed")
        
        if not computer_lab:
            raise HTTPException(status_code=404, detail="Computer Lab not found")
        
        return computer_lab
    
    
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