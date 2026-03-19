from pydantic import BaseModel
from typing import Optional
import enum
from datetime import time

class DaysOfWeek(enum.Enum):
    monday = "monday"
    tuesday = "tuesday"
    wednesday = "wednesday"
    thursday = "thursday"
    friday = "friday"
    saturday = "saturday"
    
class LabClassCreate(BaseModel):
    lab_id: int
    subject: str
    section: str
    department: str
    teacher: str
    day: str
    start_time: time
    end_time: time
    
class LabClassResponse(LabClassCreate):
    id: int

class LabClassUpdate(BaseModel):
    lab_id: Optional[int] = None
    subject: Optional[str] = None
    section: Optional[str] = None
    department: Optional[str] = None
    teacher: Optional[str] = None
    day: Optional[str] = None
    start_time: Optional[time] = None
    end_time: Optional[time] = None