from sqlalchemy import Column, String, Integer, ForeignKey, Time, Enum
from sqlalchemy.orm import relationship
from datetime import datetime, time

from database.base import Base
from schemas.lab_class_schemas import DaysOfWeek

class LabClass (Base):
    __tablename__ = "lab_class"
    
    id: int = Column(Integer, primary_key=True, autoincrement=True)
    lab_id: int = Column(ForeignKey("computer_labs.id", onupdate="CASCADE", ondelete="CASCADE"))
    subject: str = Column(String(255))
    section: str = Column(String(255))
    department: str = Column(String(255))
    teacher: str = Column(String(255))
    day: str = Column(Enum(DaysOfWeek))
    start_time: time = Column(Time)
    end_time: time = Column(Time)
    
    computer_labs = relationship("ComputerLab", back_populates="lab_class")