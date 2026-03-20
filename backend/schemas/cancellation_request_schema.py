from typing import Optional
from pydantic import BaseModel
from datetime import datetime
import enum

class CancellationStatus(enum.Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"
    
class CancellationRequestCreate(BaseModel):
    reservation_id: int
    cancellation_reason: str
    
class CancellationResponse(BaseModel):
    id: int    
    user_id: int
    reservation_id: int
    cancellation_reason: str
    created_at: datetime
    status: CancellationStatus
    admin_note: Optional[str] = None
    handled_at: Optional[datetime] = None