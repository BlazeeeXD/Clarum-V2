import os
import json
from google import genai
from google.genai import types
from app.schemas.report import BuildReport

class InstallationAgent:
    def __init__(self):
        self.client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

    def generate_build_report(self, frameworks: list, extracted_requirements: dict) -> dict:
        prompt = f"""
        You are a patient, expert onboarding engineer. Your goal is to help a non-technical user successfully install and run this software.
        Never assume the user knows anything. Explain what every tool is, why it is needed, and exactly what to click or type.
        Provide OS-aware instructions where necessary (Windows, macOS, Linux).
        Do not output markdown block backticks, just the raw JSON.
        
        Repository Context:
        - Frameworks detected: {frameworks}
        
        Configuration Files & Documentation:
        {json.dumps(extracted_requirements, indent=2)}
        """

        response = self.client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=BuildReport,
                temperature=0.1, 
            ),
        )
        
        return json.loads(response.text)