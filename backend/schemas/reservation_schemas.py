from pydantic import BaseModel
from typing import Optional
import enum

from schemas.user_schemas import UserResponse

from datetime import datetime

class ReservationStatus(enum.Enum):
    pending = "pending"
    reserved = "reserved"
    rejected = "rejected"
    in_use = "in_use"
    cancelled = "cancelled"
    completed = "completed"
    
class ReservationCreate(BaseModel):
    user_id: int
    lab_id: int
    full_name: str
    reservation_type: str
    start_date: datetime
    end_date: datetime
    status: ReservationStatus
    
class ReservationResponse(BaseModel):
    id: int
    user_id: int
    lab_id: int
    full_name: str
    reservation_type: str
    start_date: datetime
    end_date: datetime
    status: ReservationStatus
    user: UserResponse

class ReservationCreateResponse(ReservationCreate):
    id: int

class ReservationUpdate(BaseModel):
    lab_id: Optional[int] = None
    full_name: Optional[str] = None
    start_date: Optional[datetime] = None 
    end_date: Optional[datetime] = None
    status: Optional[ReservationStatus] = None