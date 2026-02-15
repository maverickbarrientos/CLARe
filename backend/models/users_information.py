from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from database.base import Base

class UsersInformation(Base):
    __tablename__ = "users_information"
    
    id: int = Column(Integer, primary_key=True, autoincrement=True)
    user_id: int = Column(ForeignKey("user.id", ondelete="CASCADE", onupdate="CASCADE"), unique=True)
    first_name: str = Column(String(255))
    last_name: str = Column(String(255))
    department: str = Column(String(255))
    
    user = relationship("Users", back_populates="users_information")
    