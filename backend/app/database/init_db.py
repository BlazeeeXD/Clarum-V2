from app.database.db import Base, engine
from app.models.repository import Repository
from app.models.analysis import AnalysisReport

def init_models():
    Base.metadata.create_all(bind=engine)