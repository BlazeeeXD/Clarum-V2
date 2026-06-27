import os
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.repository import Repository
from app.models.analysis import AnalysisReport

from app.analyzers.repo_scanner import RepoScanner
from app.analyzers.dependency_extractor import DependencyExtractor
from app.analyzers.graph_builder import GraphBuilder
from app.analyzers.requirement_extractor import RequirementExtractor

from app.agents.architecture_agent import ArchitectureAgent
from app.agents.installation_agent import InstallationAgent

router = APIRouter(tags=["Analysis"])

REPOS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../repos"))

@router.post("/analyze/learn/{repo_id}", status_code=status.HTTP_200_OK)
def analyze_learn(repo_id: int, db: Session = Depends(get_db)):
    repo = db.query(Repository).filter(Repository.id == repo_id).first()
    if not repo:
        raise HTTPException(status_code=404, detail="Repository not registered.")

    report = db.query(AnalysisReport).filter(AnalysisReport.repository_id == repo_id).first()
    if report and report.learn_data:
        return report.learn_data 

    repo_path = os.path.join(REPOS_DIR, repo.repo_name)
    if not os.path.exists(repo_path):
        raise HTTPException(status_code=404, detail="Local repository cache expired or missing.")

    scan_meta = RepoScanner.scan(repo_path)
    if "error" in scan_meta:
        raise HTTPException(status_code=400, detail=scan_meta["error"])

    edges = DependencyExtractor.extract_dependencies(repo_path, scan_meta["files"])
    graph_data = GraphBuilder.build_graph(edges)

    try:
        agent = ArchitectureAgent()
        ai_report = agent.generate_learn_report(
            frameworks=scan_meta["frameworks"],
            languages=scan_meta["languages"],
            files=scan_meta["files"],
            dependency_graph=graph_data
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Architecture Inference Failed: {str(e)}")

    compiled_learn_payload = {
        "project_summary": ai_report.get("project_summary", ""),
        "architecture_summary": ai_report.get("architecture_summary", ""),
        "learning_path": ai_report.get("learning_path", []),
        "dependency_graph": graph_data 
    }

    if not report:
        report = AnalysisReport(repository_id=repo_id)
        db.add(report)
    
    report.learn_data = compiled_learn_payload
    db.commit()

    return compiled_learn_payload


@router.post("/analyze/build/{repo_id}", status_code=status.HTTP_200_OK)
def analyze_build(repo_id: int, db: Session = Depends(get_db)):
    repo = db.query(Repository).filter(Repository.id == repo_id).first()
    if not repo:
        raise HTTPException(status_code=404, detail="Repository not registered.")

    report = db.query(AnalysisReport).filter(AnalysisReport.repository_id == repo_id).first()
    if report and report.build_data:
        return report.build_data 

    repo_path = os.path.join(REPOS_DIR, repo.repo_name)
    if not os.path.exists(repo_path):
        raise HTTPException(status_code=404, detail="Local repository cache expired or missing.")

    scan_meta = RepoScanner.scan(repo_path)
    if "error" in scan_meta:
        raise HTTPException(status_code=400, detail=scan_meta["error"])

    config_contents = RequirementExtractor.extract(repo_path)

    try:
        agent = InstallationAgent()
        ai_build_report = agent.generate_build_report(
            frameworks=scan_meta["frameworks"],
            extracted_requirements=config_contents
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Installation Inference Failed: {str(e)}")

    if not report:
        report = AnalysisReport(repository_id=repo_id)
        db.add(report)

    report.build_data = ai_build_report
    db.commit()

    return ai_build_report


@router.get("/project/{repo_id}", status_code=status.HTTP_200_OK)
def get_project_status(repo_id: int, db: Session = Depends(get_db)):
    repo = db.query(Repository).filter(Repository.id == repo_id).first()
    if not repo:
        raise HTTPException(status_code=404, detail="Project configuration data not found on the server.")

    report = db.query(AnalysisReport).filter(AnalysisReport.repository_id == repo_id).first()
    
    return {
        "id": repo.id,
        "repo_url": repo.repo_url,
        "repo_name": repo.repo_name,
        "status": repo.status,
        "created_at": repo.created_at,
        "learn_data": report.learn_data if report else None,
        "build_data": report.build_data if report else None
    }