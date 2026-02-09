from pydantic import BaseModel
import enum

class ReservationStatus(enum.Enum):
    pending = "pending"
    reserved = "reserved"
    in_use = "in_use"
    cancelled = "cancelled"
    completed = "completed"