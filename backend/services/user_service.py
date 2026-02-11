from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from config.security import UserManager
from .base import BaseService
from database.base import Users
from models.users_information import UsersInformation

from schemas.user_schemas import UserInformationCreate, UserInformationResponse, UserCreate, UserRead

class UserService(BaseService):
    
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
    
    
    async def get_user_by_id(self, user_id: int) -> UserInformationResponse:
        
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
    
    
    async def create_user(self, user: UserCreate, user_information: UserInformationCreate, user_manager: UserManager) -> dict[str, UserRead]:
                
        try:
            new_user = await user_manager.create(user)
            
        except IntegrityError as e:
            await self.session.rollback()
            print(f"Integrity Error in create_user : {e}")
            raise HTTPException(status_code=400, detail="User already exists")
        
        except SQLAlchemyError as e:
            await self.session.rollback()
            print(f"Database error in create_user (commit) : {e}")
            raise HTTPException(status_code=500, detail="Failed to create user")
        
        new_user_information = await self.create_user_information(new_user.id, user_information)
        
        return { 
                 "user" : new_user,
                 "user_information" : new_user_information
                }
        
    
    async def create_user_information(self, new_user_id: int, user_information: UserInformationCreate) -> UserInformationResponse:
        
        new_user_information = UsersInformation(user_id=new_user_id, **user_information.model_dump(exclude_unset=True))
        self.session.add(new_user_information)
        
        try:
            await self.session.commit()
            await self.session.refresh(new_user_information)
        
        except IntegrityError as e:
            await self.session.rollback()
            print(f"Integrity Error in create_user_information : {e}")
            raise HTTPException(status_code=400, detail="User already exists")
        
        except SQLAlchemyError as e:
            await self.session.rollback()
            print(f"Database error in create_user_information (commit) : {e}")
            raise HTTPException(status_code=500, detail="Failed to create user information")
        
        return new_user_information
    
    
    async def update_user(self, user_id, payload):
        
        stmt = select(UsersInformation).where(UsersInformation.user_id == user_id)

        try:
            result = await self.session.execute(stmt)
            user = result.scalar_one_or_none()
            
        except SQLAlchemyError as e:
            print(f"Database error in update_user (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch user")
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        for key, value in payload.model_dump(exclude_unset=True).items():
            setattr(user, key, value)
            
        try:
            await self.session.commit()
            await self.session.refresh(user)
        
        except IntegrityError as e:
            await self.session.rollback()
            print(f"Integrity Error in update_user : {e}")
            raise HTTPException(status_code=400, detail="User already exists")
        
        except SQLAlchemyError as e:
            await self.session.rollback()
            print(f"Database error in update_user (commit) : {e}")
            raise HTTPException(status_code=500, detail="Failed to update user information")
        
        return user 