import os
import shutil
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.database.init_db import init_models
from app.api import repositories, analysis

load_dotenv()

init_models()

app = FastAPI(title="Clarum V2 Engine", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect workspace routers
app.include_router(repositories.router)
app.include_router(analysis.router)

@app.post("/cleanup", status_code=status.HTTP_200_OK, tags=["Housekeeping"])
def cleanup_local_cache():
    """
    On-demand project workspace sanitation loop.
    Clears all temporary checkout artifacts safely out of the local cache directory.
    """
    repos_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../repos"))
    if os.path.exists(repos_dir):
        for filename in os.listdir(repos_dir):
            file_path = os.path.join(repos_dir, filename)
            try:
                if os.path.isdir(file_path):
                    shutil.rmtree(file_path)
                else:
                    os.unlink(file_path)
            except Exception as e:
                return {"status": "partial_cleanup", "detail": f"Error purging {filename}: {str(e)}"}
    return {"status": "success", "detail": "All cached local repositories have been removed."}

@app.get("/")
def read_root():
    return {"status": "Clarum V2 Engine is operational"}