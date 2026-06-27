import os
import re
from git import Repo

REPOS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../repos"))

class GitHubService:
    @staticmethod
    def extract_repo_name(url: str) -> str:
        match = re.search(r"github\.com/[\w\-]+/(?P<name>[\w\-]+)", url)
        if match:
            return match.group("name")
        return "unknown-repo"

    @classmethod
    def clone_repository(cls, url: str) -> str:
        if not os.path.exists(REPOS_DIR):
            os.makedirs(REPOS_DIR)
            
        repo_name = cls.extract_repo_name(url)
        target_path = os.path.join(REPOS_DIR, repo_name)

        if os.path.exists(target_path) and os.path.isdir(os.path.join(target_path, ".git")):
            return target_path
            
        try:
            Repo.clone_from(url, target_path, depth=1)
            return target_path
        except Exception as e:
            raise RuntimeError(f"Failed to clone repository: {str(e)}")