from pydantic import BaseModel
from datetime import datetime
import enum

class CancellationStatus(enum.Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"
    
class CancellationRequestCreate(BaseModel):
    cancellation_reason: str
    created_at: datetime