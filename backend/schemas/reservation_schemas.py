from pydantic import BaseModel
from typing import Optional
import enum

from schemas.user_schemas import UserResponse

from datetime import datetime

class QRCodeStatus(str, enum.Enum):
    valid = "valid"
    invalid = "invalid"
    expired = "expired"

class QRCodeResponse(BaseModel):
    id: int
    reservation_id: int
    qr_value: str
    image_url: str
    issue_date: datetime
    expiry_date: datetime
    status: QRCodeStatus
    
    model_config = {"use_enum_values": True}
    
class ComputerLabResponse(BaseModel):
    id: int
    lab_name: str
    location: str
    capacity: str

class ReservationStatus(str, enum.Enum):
    pending = "pending"
    reserved = "reserved"
    rejected = "rejected"
    in_use = "in_use"
    cancelled = "cancelled"
    cancellation_requested = "cancellation_requested"
    completed = "completed"
    
class ReservationCreate(BaseModel):
    user_id: int
    lab_id: int
    full_name: str
    reservation_description: str
    start_date: datetime
    end_date: datetime
    status: ReservationStatus
    
class AdminReservationCreate(ReservationCreate):
    email: str
    
class ReservationResponse(BaseModel):
    id: int
    user_id: int
    lab_id: int
    full_name: str
    email: str
    reservation_description: str
    start_date: datetime
    end_date: datetime
    status: ReservationStatus
    user: UserResponse
    computer_labs: ComputerLabResponse
    qr_codes: Optional[QRCodeResponse] = None

class ReservationCreateResponse(ReservationCreate):
    id: int

class ReservationUpdate(BaseModel):
    lab_id: Optional[int] = None
    full_name: Optional[str] = None
    start_date: Optional[datetime] = None 
    end_date: Optional[datetime] = None