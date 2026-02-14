from sqlalchemy import Column, String, Integer, Enum, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from database.base import Base
from schemas.qr_code_schemas import QRCodeStatus

from datetime import datetime

class QRCode(Base):
    __tablename__ = "qr_codes"
    
    id: int = Column(Integer, primary_key=True, autoincrement=True)
    reservation_id: int = Column(ForeignKey("reservations.id", onupdate="CASCADE", ondelete="CASCADE"))
    qr_value: str = Column(String(255))
    issue_date: datetime = Column(DateTime)
    expiry_date: datetime = Column(DateTime)
    status: str = Column(Enum(QRCodeStatus), default=QRCodeStatus.valid)
        
    reservations = relationship("Reservation", back_populates="qr_codes")