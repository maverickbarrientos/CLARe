from pydantic import BaseModel
from fastapi_users import schemas
from typing import Optional

class UserInformation(BaseModel):
    user_id: Optional[int]
    first_name: str
    last_name: str
    program: str
    section: str

class UserResponse(UserInformation):
    pass

class UserRead(schemas.BaseUser[int]):
    pass

class UserCreate(schemas.BaseUserCreate):
    pass

class UserUpdate(schemas.BaseUserUpdate):
    pass