from sqlalchemy import Column, Integer, ForeignKey, JSON, DateTime
from sqlalchemy.sql import func
from app.database.db import Base

class AnalysisReport(Base):
    __tablename__ = "analysis_reports"

    id = Column(Integer, primary_key=True, index=True)
    repository_id = Column(Integer, ForeignKey("repositories.id"), unique=True, nullable=False)
    
    learn_data = Column(JSON, nullable=True)  
    build_data = Column(JSON, nullable=True)  
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())