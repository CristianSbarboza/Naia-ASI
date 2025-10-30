from pydantic import BaseModel, Field
from typing import List

class StoryPrompt(BaseModel):
    title: str = Field(default="Minha História")
    protagonist: str
    antagonist: str
    setting: str
    conflict: str
    theme: str

class StoryResponse(BaseModel):
    title: str
    storyData: str = Field(description="Texto completo da história gerada.")
    chapters: List[str] = Field(description="Lista de capítulos da história.")
