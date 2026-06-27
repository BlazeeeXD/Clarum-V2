import os
import re

class DependencyExtractor:
    PY_IMPORT_RE = re.compile(r"^\s*import\s+([\w\.]+)")
    PY_FROM_RE = re.compile(r"^\s*from\s+([\w\.]+)\s+import")

    JS_IMPORT_RE = re.compile(r"^\s*import\s+.*?\s+from\s+['\"](.+?)['\"]")
    JS_REQUIRE_RE = re.compile(r"^\s*(?:const|let|var)\s+.*?\s*=\s*require\s*\(\s*['\"](.+?)['\"]\s*\)")

    @classmethod
    def extract_dependencies(cls, repo_path: str, files: list) -> list:
        edges = []
        file_set = set(files)

        for rel_path in files:
            full_path = os.path.join(repo_path, rel_path)
            ext = os.path.splitext(rel_path)[1].lower()

            if ext not in {".py", ".js", ".ts", ".jsx", ".tsx"}:
                continue

            try:
                with open(full_path, "r", encoding="utf-8", errors="ignore") as f:
                    lines = f.readlines()
            except Exception:
                continue

            for line in lines:
                target = None
                
                if ext == ".py":
                    match_imp = cls.PY_IMPORT_RE.match(line)
                    match_from = cls.PY_FROM_RE.match(line)
                    if match_imp:
                        target = match_imp.group(1).replace(".", "/") + ".py"
                    elif match_from:
                        target = match_from.group(1).replace(".", "/") + ".py"

                elif ext in {".js", ".ts", ".jsx", ".tsx"}:
                    match_imp = cls.JS_IMPORT_RE.match(line)
                    match_req = cls.JS_REQUIRE_RE.match(line)
                    raw_target = None
                    if match_imp:
                        raw_target = match_imp.group(1)
                    elif match_req:
                        raw_target = match_req.group(1)

                    if raw_target and not raw_target.startswith("."):
                        continue  
                    
                    if raw_target:
                        base_dir = os.path.dirname(rel_path)
                        normalized = os.path.normpath(os.path.join(base_dir, raw_target)).replace("\\", "/")
                        
                        for potential_ext in [ext, ".ts", ".js", ".tsx", ".jsx"]:
                            test_path = normalized if normalized.endswith(potential_ext) else f"{normalized}{potential_ext}"
                            if test_path in file_set:
                                target = test_path
                                break

                if target and target in file_set and target != rel_path:
                    edges.append({"source": rel_path, "target": target})

        return edges