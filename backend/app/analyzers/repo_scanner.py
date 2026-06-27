import os

MAX_FILES = 500
MAX_SCAN_SIZE_MB = 20

IGNORE_DIRS = {
    "node_modules", ".git", ".venv", "venv", "env", "__pycache__", 
    "dist", "build", "target", ".idea", ".vscode", "eggs", "*.egg-info"
}

IGNORE_EXTENSIONS = {
    ".png", ".jpg", ".jpeg", ".gif", ".ico", ".svg", ".mp4", ".mp3", 
    ".pdf", ".zip", ".tar", ".gz", ".exe", ".dll", ".so", ".pyc"
}

class RepoScanner:
    @staticmethod
    def scan(repo_path: str) -> dict:
        file_count = 0
        total_size_bytes = 0
        languages = {}
        frameworks = set()
        scanned_files = []

        for root, dirs, files in os.walk(repo_path):
            dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]

            for file in files:
                ext = os.path.splitext(file)[1].lower()
                if ext in IGNORE_EXTENSIONS:
                    continue

                file_path = os.path.join(root, file)
                try:
                    file_size = os.path.getsize(file_path)
                except OSError:
                    continue

                file_count += 1
                total_size_bytes += file_size

                if ext:
                    languages[ext] = languages.get(ext, 0) + 1

                rel_path = os.path.relpath(file_path, repo_path).replace("\\", "/")
                scanned_files.append(rel_path)

                if file == "package.json":
                    frameworks.add("Node.js/JavaScript ecosystem")
                elif file == "requirements.txt" or file == "pyproject.toml":
                    frameworks.add("Python ecosystem")
                elif file == "Cargo.toml":
                    frameworks.add("Rust ecosystem")
                elif file == "Dockerfile":
                    frameworks.add("Docker containerization")
                    
                if file_count > MAX_FILES:
                    return {"error": f"Repository exceeds maximum file count limit ({MAX_FILES} files)."}
                if (total_size_bytes / (1024 * 1024)) > MAX_SCAN_SIZE_MB:
                    return {"error": f"Repository exceeds maximum payload capacity limit ({MAX_SCAN_SIZE_MB} MB)."}

        language_map = {
            ".py": "Python", ".js": "JavaScript", ".ts": "TypeScript",
            ".tsx": "TypeScript (React)", ".jsx": "JavaScript (React)",
            ".html": "HTML", ".css": "CSS", ".go": "Go", ".rs": "Rust"
        }
        
        detected_languages = {}
        for ext, count in languages.items():
            name = language_map.get(ext, f"Other ({ext})")
            detected_languages[name] = detected_languages.get(name, 0) + count

        return {
            "file_count": file_count,
            "total_size_mb": round(total_size_bytes / (1024 * 1024), 2),
            "languages": detected_languages,
            "frameworks": list(frameworks),
            "files": scanned_files
        }