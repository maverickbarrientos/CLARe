from pydantic import BaseModel
from fastapi_users import schemas
from typing import Optional

class UserRead(schemas.BaseUser[int]):
    pass

class UserCreate(schemas.BaseUserCreate):
    pass

class UserUpdate(schemas.BaseUserUpdate):
    pass

class UserInformationCreate(BaseModel):
    first_name: str
    last_name: str
    program: str
    section: str

class UserInformationResponse(UserInformationCreate, UserRead):
    pass

class UserInformationUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    program: Optional[str] = None
    section: Optional[str] = None

#also inherit from userInformation response to avoid confusion