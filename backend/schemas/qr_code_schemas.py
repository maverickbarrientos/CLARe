from pydantic import BaseModel
import enum
from datetime import datetime

from schemas.reservation_schemas import ReservationCreateResponse

class QRCodeStatus(enum.Enum):
    valid = "valid"
    invalid = "invalid"
    expired = "expired"
    
class QRCodeCreate(BaseModel):
    reservation_id: int
    qr_value: str
    issue_date: datetime
    expiry_date: datetime
    
class QRCodeResponse(QRCodeCreate):
    id: int

class QRCodeWithReservation(QRCodeResponse):
    reservations: ReservationCreateResponse
    
class ApprovalResponse(BaseModel):
    reservation: ReservationCreateResponse
    qr_code: QRCodeResponse