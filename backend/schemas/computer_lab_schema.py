from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import enum

class ReservationStatus(str, enum.Enum):
    pending = "pending"
    reserved = "reserved"
    rejected = "rejected"
    in_use = "in_use"
    cancelled = "cancelled"
    cancellation_requested = "cancellation_requested"
    completed = "completed"

class ReservationResponse(BaseModel):
    id: int
    user_id: int
    lab_id: int
    full_name: str
    reservation_description: str
    start_date: datetime
    end_date: datetime
    status: ReservationStatus

class ComputerLabCreate(BaseModel):
    lab_name: str
    location: str
    capacity: int
    
class ComputerLabResponse(BaseModel):
    id: int
    lab_name: str
    location: str
    capacity: int
    reservations: Optional[list[ReservationResponse]] = None
    
class ComputerLabUpdate(BaseModel):
    lab_name: Optional[str] = None
    location: Optional[str] = None
    capacity: Optional[int] = None