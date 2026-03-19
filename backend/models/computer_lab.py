from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
from database.base import Base

class ComputerLab(Base):
    __tablename__ = "computer_labs"
    
    id: int = Column(Integer, primary_key=True, autoincrement=True)
    lab_name: str = Column(String(255))
    location: str = Column(String(255))
    capacity: str = Column(Integer)
    
    reservations = relationship("Reservation", back_populates="computer_labs")
    lab_class = relationship("LabClass", back_populates="computer_labs")