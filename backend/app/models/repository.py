from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.database.db import Base

class Repository(Base):
    __tablename__ = "repositories"

    id = Column(Integer, primary_key=True, index=True)
    repo_url = Column(String, nullable=False)
    repo_name = Column(String, nullable=False)
    status = Column(String, default="cloned")  
    created_at = Column(DateTime(timezone=True), server_default=func.now())