from fastapi import HTTPException
from sqlalchemy import select, and_
from sqlalchemy.orm import joinedload
from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from services.base import BaseService

from models.lab_class import LabClass

from schemas.lab_class_schemas import LabClassCreate, LabClassUpdate

class LabClassService(BaseService):
    
    async def _fetch_class_by_id(self, class_id):
        
        stmt = select(LabClass).where(LabClass.id == class_id)
        
        try:
            result = await self.session.execute(stmt)
            lab_class = result.scalar_one_or_none()
        
        except SQLAlchemyError as e:
            print(f"Database error in _fetch_class_by_id (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch lab class")
        
        if not lab_class:
            raise HTTPException(status_code=404, detail="Class not found")
        
        return lab_class
    
    async def __check_conflict(self, lab_id, day, start_time, end_time):
        
        stmt = (select(LabClass)
                .where(LabClass.lab_id == lab_id)
                .where(and_(
                    LabClass.start_time < end_time,
                    LabClass.end_time > start_time
                    ))
                )
        
        try:
            result = await self.session.execute(stmt)
            conflict = result.scalar_one_or_none()
            
        except SQLAlchemyError as e:
            print(f"Database error in __check_conflict (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch class")
        
        return conflict
                
    async def get_all_class(self, day: str = None):
        
        stmt = (select(LabClass)
                .join(LabClass.computer_labs)
                .options(joinedload(LabClass.computer_labs)))
        
        if day:
            print(day)
            stmt = stmt.where(LabClass.day == day)
        
        try:
            result = await self.session.execute(stmt)
            lab_classes = result.unique().scalars().all()
            
        except SQLAlchemyError as e:
            print(f"Database error in get_all_class (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch all lab_class")
        
        return lab_classes
    
    async def get_class_by_id(self, class_id):
                
        stmt = (select(LabClass)
                .where(LabClass.id == class_id)
                .join(LabClass.computer_labs)
                .options(joinedload(LabClass.computer_labs)))
        
        try:
            result = await self.session.execute(stmt)
            lab_class = result.unique().scalar_one_or_none()
            
        except SQLAlchemyError as e:
            print(f"Database error in get_class_by_id (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch class")
        
        if not lab_class:
            raise HTTPException(status_code=404, detail="Class not found")
        
        return lab_class
    
    async def create_class(self, payload: LabClassCreate):
        conflict = await self.__check_conflict(payload.lab_id, payload.day, payload.start_time, payload.end_time)
        
        if conflict:
            raise HTTPException(status_code=409, detail="Class conflict between dates")
        
        lab_class = LabClass(**payload.model_dump())
        
        self.session.add(lab_class)
        
        try:
            await self.session.commit()

        except IntegrityError as e:
            await self.session.rollback()
            print(f"Integrity error in create_class")
            raise HTTPException(status_code=409, detail="Class already exists")
        
        except SQLAlchemyError as e:
            await self.session.rollback()
            print(f"Database error in create_class (commit) : {e}")
            raise HTTPException(status_code=500, detail="Failed to create class")
        
        await self.session.refresh(lab_class)
        
        return lab_class
    
    async def update_class(self, class_id, payload: LabClassUpdate):
        
        lab_class = await self._fetch_class_by_id(class_id)
        
        for key, value in payload.model_dump(exclude_unset=True).items():
            setattr(lab_class, key, value)
            
        try:
            await self.session.commit()
        
        except SQLAlchemyError as e:
            await self.session.rollback()
            print(f"Database error in update_class (commit) : {e}")
            raise HTTPException(status_code=500, detail="Failed to update class")
        
        await self.session.refresh(lab_class)
        
        return lab_class
    
    async def delete_class(self, class_id):
        
        if not class_id:
            raise HTTPException(status_code=400, detail="No class_id provided")
        
        lab_class = await self._fetch_class_by_id(class_id)
        
        try:
            await self.session.delete(lab_class)
            await self.session.commit()
            
        except SQLAlchemyError as e:
            print(f"Database error in delete_class (commit) : {e}")
            raise HTTPException(status_code=500, detail="Failed to delete class")
        
        return "deleted"