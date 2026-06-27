from pydantic import BaseModel, HttpUrl
from datetime import datetime
from typing import Optional

class RepositoryCreate(BaseModel):
    url: str

class RepositoryResponse(BaseModel):
    id: int
    repo_url: str
    repo_name: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True