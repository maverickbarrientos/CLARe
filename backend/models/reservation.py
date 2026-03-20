from sqlalchemy import Column, String, Integer, ForeignKey, DateTime, Enum, Text
from sqlalchemy.orm import relationship
from database.base import Base

from datetime import datetime
from schemas.reservation_schemas import ReservationStatus

class Reservation(Base):
    __tablename__ = "reservations"
    
    id: int = Column(Integer, primary_key=True, autoincrement=True)
    user_id: int = Column(ForeignKey("user.id", ondelete="CASCADE", onupdate="CASCADE"), unique=True)
    lab_id: int = Column(ForeignKey("computer_labs.id"))
    full_name: str = Column(String(255))
    department: str = Column(String(255))
    email: str = Column(String(255))
    reservation_description: str = Column(String(255))
    reject_reason: str = Column(Text)
    start_date: datetime = Column(DateTime)
    end_date: datetime = Column(DateTime)
    status: str = Column(Enum(ReservationStatus), default=ReservationStatus.pending)
    
    user = relationship("Users", back_populates="reservations")
    computer_labs = relationship("ComputerLab", back_populates="reservations")
    qr_codes = relationship("QRCode", back_populates="reservations", uselist=False)
    cancellation_requests = relationship("CancellationRequest", back_populates="reservations", uselist=False)