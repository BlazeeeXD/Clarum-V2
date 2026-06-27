from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.repository import Repository
from app.models.analysis import AnalysisReport
from app.schemas.repository import RepositoryCreate, RepositoryResponse
from app.services.github_service import GitHubService

router = APIRouter(prefix="/repositories", tags=["Repositories"])

@router.post("", response_model=RepositoryResponse, status_code=status.HTTP_201_CREATED)
def create_repository(payload: RepositoryCreate, db: Session = Depends(get_db)):
    # Basic URL structure check
    if "github.com" not in payload.url:
        raise HTTPException(status_code=400, detail="Invalid URL. Only GitHub repositories are supported.")

    repo_name = GitHubService.extract_repo_name(payload.url)
    
    existing_repo = db.query(Repository).filter(Repository.repo_url == payload.url).first()
    if existing_repo:
        return existing_repo

    try:
        GitHubService.clone_repository(payload.url)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    new_repo = Repository(repo_url=payload.url, repo_name=repo_name, status="cloned")
    db.add(new_repo)
    db.commit()
    db.refresh(new_repo)

    new_report = AnalysisReport(repository_id=new_repo.id)
    db.add(new_report)
    db.commit()

    return new_repo

@router.get("", response_model=list[RepositoryResponse])
def list_repositories(db: Session = Depends(get_db)):
    return db.query(Repository).all()