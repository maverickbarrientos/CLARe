from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import Integer
from sqlalchemy.orm import DeclarativeBase, relationship
from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable, SQLAlchemyUserDatabase, mapped_column, Mapped

from database.session import engine, get_session

class Base(DeclarativeBase):
    pass

class Users(SQLAlchemyBaseUserTable[int], Base):
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)

    reservations = relationship("Reservation", back_populates="user")    
    users_information = relationship("UsersInformation", back_populates="user")

async def create_tables():
    async with engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)
        
async def get_user_db(session: AsyncSession = Depends(get_session)):
    yield SQLAlchemyUserDatabase(session, Users)