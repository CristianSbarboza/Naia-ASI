import os
import httpx
from dotenv import load_dotenv

load_dotenv()
ASIONE_API_KEY = os.getenv("ASIONE_API_KEY")
BASE_URL = "https://api.asi1.ai/v1/chat/completions"

async def generate_story_from_asi(prompt_text: str) -> str:
    """Envia o prompt enriquecido para ASI:One e retorna a história em texto."""
    if not ASIONE_API_KEY:
        raise ValueError("Chave ASI:One não encontrada. Configure no arquivo .env")

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {ASIONE_API_KEY}"
    }
    payload = {
        "model": "asi1-mini",
        "messages": [
            {"role": "user", "content": prompt_text}
        ]
    }

    async with httpx.AsyncClient(timeout=30) as client:
        response = await client.post(BASE_URL, headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()

        # Retorna o conteúdo principal da primeira escolha
        story_content = data.get("choices", [{}])[0].get("message", {}).get("content", "")
        if not story_content:
            raise ValueError("ASI:One retornou resposta vazia")
        return story_content
