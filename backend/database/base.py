from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import Column, ForeignKey, String, Integer, Date, DateTime, Enum
from sqlalchemy.orm import DeclarativeBase, relationship
from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable, SQLAlchemyUserDatabase, mapped_column, Mapped

from database.session import engine, get_session
from schemas.reservation_schemas import ReservationStatus
from schemas.qr_code_schemas import QRCodeStatus

from datetime import date, datetime

class Base(DeclarativeBase):
    pass

class UsersInformation(Base):
    __tablename__ = "users_information"
    
    id: int = Column(Integer, primary_key=True, autoincrement=True)
    user_id: int = Column(ForeignKey("user.id", ondelete="CASCADE", onupdate="CASCADE"))
    first_name: str = Column(String(255))
    last_name: str = Column(String(255))
    program: str = Column(String(255))
    section: str = Column(String(255))
    
    user = relationship("Users", back_populates="users_information")
    
class Users(SQLAlchemyBaseUserTable[int], Base):
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    
    users_information = relationship("UsersInformation", back_populates="user")
    reservations = relationship("Reservations", back_populates="user")
    
class ComputerLabs(Base):
    __tablename__ = "computer_labs"
    
    id: int = Column(Integer, primary_key=True, autoincrement=True)
    lab_name: str = Column(String(255))
    location: str = Column(String(255))
    capacity: str = Column(String(255))
    
    reservations = relationship("Reservations", back_populates="computer_labs")
    
class Reservations(Base):
    __tablename__ = "reservations"
    
    id: int = Column(Integer, primary_key=True, autoincrement=True)
    user_id: int = Column(ForeignKey("user.id", ondelete="CASCADE", onupdate="CASCADE"))
    lab_id: int = Column(ForeignKey("computer_labs.id"))
    qr_code_id: int = Column(ForeignKey("qr_codes.id", ondelete="CASCADE", onupdate="CASCADE"))
    reservation_type: str = Column(String(255))
    start_date: datetime = Column(DateTime)
    end_date: datetime = Column(DateTime)
    status: str = Column(Enum(ReservationStatus), default=ReservationStatus.pending)
    
    user = relationship("Users", back_populates="reservations")
    computer_labs = relationship("ComputerLabs", back_populates="reservations")

class QRCode(Base):
    __tablename__ = "qr_codes"
    
    id: int = Column(Integer, primary_key=True, autoincrement=True)
    qr_value: str = Column(String(255))
    issue_date: datetime = Column(DateTime)
    expiry_date: datetime = Column(DateTime)
    status: str = Column(Enum(QRCodeStatus), default=QRCodeStatus.valid)
        
async def create_tables():
    async with engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)
        
async def get_user_db(session: AsyncSession = Depends(get_session)):
    yield SQLAlchemyUserDatabase(session, Users)