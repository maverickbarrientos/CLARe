from fastapi import HTTPException
from sqlalchemy import select, update, delete
from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from .base import BaseService
from database.base import Users
from models.users_information import UsersInformation

from schemas.user_schemas import UserResponse

class UserServices(BaseService):
    
    async def get_all_users(self):
        
        stmt = select(UsersInformation).where(UsersInformation.user_id == Users.id)
        
        try:
            result = await self.session.execute(stmt)
            users = result.scalars().all()
            
        except SQLAlchemyError as e:
            print(f"Database error in get_all_users (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch all users")
        
        # if not users:
        #     raise HTTPException(status_code=404, detail="No users found")
        
        return users
    
    async def get_user_by_id(self, user_id: int) -> UserResponse:
        
        if not user_id:
            raise HTTPException(status_code=400, detail="No ID provided")
        
        stmt = select(UsersInformation).where(UsersInformation.user_id == user_id)
        
        try:
            result = await self.session.execute(stmt)
            user = result.scalar_one_or_none()
        
        except SQLAlchemyError as e:
            print(f"Database error in get_user_by_id (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch user")
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        return user