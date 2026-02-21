from sqlalchemy import Column, ForeignKey, DateTime, Text, Integer, Enum
from sqlalchemy.orm import relationship
from datetime import datetime

from database.base import Base

from schemas.cancellation_request_schema import CancellationStatus

class CancellationRequest(Base):
    __tablename__ = "cancellation_requests"
    
    id: int = Column(Integer, primary_key=True, autoincrement=True)
    user_id: int = Column(Integer, ForeignKey("user.id", ondelete="CASCADE", onupdate="CASCADE"))
    reservation_id: int = Column(Integer, ForeignKey("reservations.id", ondelete="CASCADE", onupdate="CASCADE"))
    cancellation_reason: str = Column(Text, nullable=False)
    created_at: datetime = Column(DateTime)
    status: CancellationStatus = Column(Enum(CancellationStatus), default=CancellationStatus.pending)
    admin_note: str = Column(Text, nullable=True)
    handled_at: datetime = Column(DateTime, nullable=True)
    
    reservations = relationship("Reservation", back_populates="cancellation_requests")