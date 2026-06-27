import os

TARGET_CONFIG_FILES = {
    "README.md", "package.json", "requirements.txt", "pyproject.toml",
    "Cargo.toml", "Dockerfile", "Makefile", "setup.py"
}

MAX_TOTAL_CHARS = 40000

class RequirementExtractor:
    @staticmethod
    def extract(repo_path: str) -> dict:
        extracted_data = {}
        current_char_count = 0

        for root, dirs, files in os.walk(repo_path):
            dirs[:] = [d for d in dirs if d not in {"node_modules", ".git", ".venv"}]

            for file in files:
                if file in TARGET_CONFIG_FILES:
                    file_path = os.path.join(root, file)
                    rel_path = os.path.relpath(file_path, repo_path)

                    try:
                        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                            content = f.read()
                    except Exception:
                        continue

                    if current_char_count + len(content) > MAX_TOTAL_CHARS:
                        remaining_budget = MAX_TOTAL_CHARS - current_char_count
                        if remaining_budget > 100:
                            extracted_data[rel_path] = content[:remaining_budget] + "\n\n[... Truncated for Size Optimization ...]"
                        break
                    else:
                        extracted_data[rel_path] = content
                        current_char_count += len(content)

            if current_char_count >= MAX_TOTAL_CHARS:
                break

        return extracted_data