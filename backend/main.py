from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from agent_service.models import StoryPrompt, StoryResponse
from agent_service.metta_logic import enrich_prompt_with_metta

app = FastAPI(title="NAIA Story Generator", version="2.0.0")

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
        enriched_prompt = enrich_prompt_with_metta(prompt)
        return StoryResponse(
            title=f"História: {prompt.title}",
            storyData=f"[Mock] História gerada com base no prompt: {enriched_prompt[:200]}...",
            chapters=["Capítulo 1: Introdução", "Capítulo 2: Conflito", "Capítulo 3: Desfecho"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
