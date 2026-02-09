from pydantic import BaseModel
from typing import Optional

class ComputerLabCreate(BaseModel):
    lab_name: str
    location: str
    capacity: str
    
class ComputerLabResponse(BaseModel):
    id: int
    lab_name: str
    location: str
    capacity: str
    
class ComputerLabUpdate(BaseModel):
    lab_name: Optional[str] = None
    location: Optional[str] = None
    capacity: Optional[str] = None