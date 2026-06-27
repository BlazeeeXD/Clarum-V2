from pydantic import BaseModel, Field
from typing import List, Optional

class LearningStep(BaseModel):
    step: int
    file: str
    reason: str = Field(description="Why the junior developer should read this file.")

class LearnReport(BaseModel):
    project_summary: str = Field(description="A brief, high-level summary of what the project does.")
    architecture_summary: str = Field(description="A breakdown of the major systems and data flow.")
    learning_path: List[LearningStep]

class TroubleshootingTip(BaseModel):
    issue: str = Field(description="A common error like 'Command not recognized' or 'Permission denied'.")
    solution: str = Field(description="How to fix the issue.")

class InstallationStep(BaseModel):
    title: str = Field(description="Name of the step (e.g., 'Install Python').")
    explanation: str = Field(description="What this step does in simple terms.")
    why_necessary: str = Field(description="Why the user needs to do this.")
    command: Optional[str] = Field(description="The exact terminal command to run, if applicable.")
    troubleshooting: List[TroubleshootingTip]

class BuildReport(BaseModel):
    project_name: str
    estimated_time: str = Field(description="e.g., '10 minutes'")
    difficulty: str = Field(description="Beginner, Intermediate, or Advanced")
    supported_os: List[str] = Field(description="List of supported operating systems")
    required_software: List[str] = Field(description="e.g., ['Git', 'Python 3.10+', 'Node.js']")
    steps: List[InstallationStep]