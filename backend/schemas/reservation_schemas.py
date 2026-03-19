from pydantic import BaseModel
from typing import Optional
import enum

from schemas.user_schemas import UserResponse
from schemas.cancellation_request_schema import CancellationResponse

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
    capacity: int

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
    department: str
    reservation_description: str
    start_date: datetime
    end_date: datetime
    status: ReservationStatus
    
class UserReservationCreate(BaseModel):
    lab_id: int
    reservation_description: str
    start_date: datetime
    end_date: datetime

class AdminReservationCreate(ReservationCreate):
    email: str
    
class ReservationResponse(BaseModel):
    id: int
    user_id: int
    lab_id: int
    full_name: str
    department: str
    email: str
    reservation_description: str
    start_date: datetime
    end_date: datetime
    status: ReservationStatus
    user: UserResponse
    computer_labs: ComputerLabResponse
    qr_codes: Optional[QRCodeResponse] = None
    cancellation_requests: Optional[CancellationResponse] = None

class ReservationCreateResponse(ReservationCreate):
    id: int

class ReservationUpdate(BaseModel):
    lab_id: Optional[int] = None
    full_name: Optional[str] = None
    email: Optional[str] = None
    reservation_description: Optional[str] = None
    start_date: Optional[datetime] = None 
    end_date: Optional[datetime] = None