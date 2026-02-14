from pydantic import BaseModel
import enum

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
    reservation_type: str
    start_date: datetime
    end_date: datetime
    status: ReservationStatus
    
class ReservationResponse(BaseModel):
    id: int
    user_id: int
    lab_id: int
    qr_code_id: int
    reservation_type: str
    start_date: datetime
    end_date: datetime
    status: ReservationStatus
    
class ReservationUpdate(BaseModel):
    lab_id: int
    start_date: datetime
    end_date: datetime
    status: ReservationStatus