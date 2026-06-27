from app.database.db import engine, Base
from app.models.repository import Repository
from app.models.analysis import AnalysisReport

def flush_database():
    print("Flushing database tables...")
    Base.metadata.drop_all(bind=engine)
    print("Recreating clean tables...")
    Base.metadata.create_all(bind=engine)
    print("System flush complete. Ready for clean data.")

if __name__ == "__main__":
    flush_database()