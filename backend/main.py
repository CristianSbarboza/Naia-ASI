from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from agent_service.models import StoryPrompt, StoryResponse
from agent_service.metta_logic import enrich_prompt_with_metta
from agent_service.asi_client import generate_story_from_asi
import os
from dotenv import load_dotenv

# Carrega variáveis de ambiente
load_dotenv()

app = FastAPI(title="NAIA Story Generator", version="2.1.0")

origins = ["http://localhost:5173", "http://127.0.0.1:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate_story", response_model=StoryResponse)
async def generate_story(prompt: StoryPrompt):
    try:
        # Enriquecer prompt com MeTTa
        enriched_prompt = enrich_prompt_with_metta(prompt)

        # Gerar história com ASI:One
        story_text = await generate_story_from_asi(enriched_prompt)

        # Retorna JSON compatível com frontend
        return StoryResponse(
            title=f"História: {prompt.title}",
            storyData=story_text,
            chapters=[]  # ASI:One deve gerar capítulos já detalhados no JSON
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro do servidor: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
