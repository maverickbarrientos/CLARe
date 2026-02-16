from pydantic import BaseModel
import enum

from datetime import datetime

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
    pass