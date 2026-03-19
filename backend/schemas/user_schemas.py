from fastapi import Form
from pydantic import BaseModel, EmailStr
from fastapi_users import schemas
from typing import Optional

class UserInformationCreate(BaseModel):
    first_name: str
    last_name: str
    department: str

class UserInformationResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    department: str
    user_id: int

class UserInformationUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    department: Optional[str] = None
    
class UserRead(schemas.BaseUser[int]):
    pass
    
class UserResponse(schemas.BaseUser[int]):
    users_information: Optional[UserInformationResponse] = None

class UserCreate(schemas.BaseUserCreate):
    pass

class UserCreateResponse(BaseModel):
    user: UserRead
    user_information: UserInformationResponse

class UserUpdate(schemas.BaseUserUpdate):
    pass

class UserRegistration(BaseModel):
    user: UserCreate
    user_information: UserInformationCreate
#also inherit from userInformation response to avoid confusion