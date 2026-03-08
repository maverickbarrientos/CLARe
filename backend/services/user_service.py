from fastapi import HTTPException
from sqlalchemy import select, or_
from sqlalchemy.orm import selectinload
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from fastapi_users.exceptions import UserNotExists

from config.security import UserManager
from .base import BaseService
from database.base import Users
from models.users_information import UsersInformation

from schemas.user_schemas import UserInformationCreate, UserCreate, UserResponse

class UserService(BaseService):
    
    async def get_all_users(self, search: str):
        
        stmt = select(Users).options(selectinload(Users.users_information))
        
        if search:
            stmt = stmt.where(or_(
                Users.email.ilike(f"%{search}%"),
                UsersInformation.first_name.ilike(f"%{search}%"),
                UsersInformation.last_name.ilike(f"%{search}%"),
                UsersInformation.department.ilike(f"%{search}%")
            ))
        
        try:
            result = await self.session.execute(stmt)
            users = result.unique().scalars().all()
            
        except SQLAlchemyError as e:
            print(f"Database error in get_all_users (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch all users")
        
        # if not users:
        #     raise HTTPException(status_code=404, detail="No users found")
        
        return users
    
    
    async def get_user_by_id(self, user_id: int) -> UserResponse:
        
        if not user_id:
            raise HTTPException(status_code=400, detail="No ID provided")
        
        stmt = (select(Users)
                .options(selectinload(Users.users_information))
                .where(Users.id == user_id))
        
        try:
            result = await self.session.execute(stmt)
            user = result.scalar_one_or_none()
        
        except SQLAlchemyError as e:
            print(f"Database error in get_user_by_id (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch user")
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        return user
    
    
    async def create_user(self, user: UserCreate, user_information: UserInformationCreate, user_manager: UserManager) -> dict[str, UserResponse]:
                
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
        
    
    async def create_user_information(self, new_user_id: int, user_information: UserInformationCreate) -> UserResponse:
        
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
    
    
    async def update_user(self, user_id, update_user, user_information_payload, user_manager: UserManager):
        
        stmt = select(UsersInformation).where(UsersInformation.user_id == user_id)
        
        try:
            result = await self.session.execute(stmt)
            user_information = result.scalar_one_or_none()
            user = await user_manager.get(user_id)
            
        except SQLAlchemyError as e:
            print(f"Database error in update_user (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch user")
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        for key, value in user_information_payload.model_dump(exclude_unset=True).items():
            setattr(user_information, key, value)
            
        try:
            await self.session.commit()
            await self.session.refresh(user_information)
            updated_user = await user_manager.update(update_user, user)
        
        except IntegrityError as e:
            await self.session.rollback()
            print(f"Integrity Error in update_user : {e}")
            raise HTTPException(status_code=400, detail="User already exists")
        
        except SQLAlchemyError as e:
            await self.session.rollback()
            print(f"Database error in update_user (commit) : {e}")
            raise HTTPException(status_code=500, detail="Failed to update user information")
        
        return user_information, updated_user
    
    
    async def delete_user(self, user_id: int, user_manager: UserManager):
        
        try:
            user = await user_manager.get(user_id)
            
        except UserNotExists:
            raise HTTPException(status_code=404, detail="User not found")
        
        except SQLAlchemyError as e:
            print(f"Database error in delete_user (fetch) : {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch user")
                    
        try:
            await user_manager.delete(user)
            
        except SQLAlchemyError as e:
            print(f"Database error in delete_user (delete) : {e}")
            raise HTTPException(status_code=500, detail="Failed to delete user")
        
        return "deleted"