from pydantic import BaseModel
from fastapi_users import schemas
from typing import Optional

class UserInformationCreate(BaseModel):
    first_name: str
    last_name: str
    program: str
    section: str

class UserInformationRead(BaseModel):
    id: int
    first_name: str
    last_name: str
    program: str
    user_id: int
    section: str

class UserInformationUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    program: Optional[str] = None
    section: Optional[str] = None

class UserRead(schemas.BaseUser[int]):
    user_information: UserInformationRead

class UserCreate(schemas.BaseUserCreate):
    pass

class UserUpdate(schemas.BaseUserUpdate):
    pass
#also inherit from userInformation response to avoid confusion