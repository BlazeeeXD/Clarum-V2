import os
import json
from google import genai
from google.genai import types
from app.schemas.report import LearnReport

class ArchitectureAgent:
    def __init__(self):
        self.client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

    def generate_learn_report(self, frameworks: list, languages: dict, files: list, dependency_graph: dict) -> dict:
        prompt = f"""
        You are a senior software architect. Explain this repository to a new developer joining the team.
        Do not output markdown block backticks, just the raw JSON.
        
        Repository Context:
        - Frameworks detected: {frameworks}
        - Languages used: {languages}
        - Key files: {files[:100]}  # Trimmed to top 100 to save context
        - Dependency structure: {str(dependency_graph)[:5000]} # Trimmed edge map
        """

        response = self.client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=LearnReport,
                temperature=0.2, 
            ),
        )
        
        return json.loads(response.text)