# agent_service/image_service.py
import os
import requests
from dotenv import load_dotenv

load_dotenv()

ASI_API_KEY = os.getenv("ASIONE_API_KEY")
ASI_ENDPOINT = "https://api.asi1.ai/v1/image/generate"

def generate_image(prompt: str, size: str = "512x512", model: str = "asi1-mini") -> str:
    """Gera imagem a partir de um prompt textual usando ASI:One."""
    if not ASI_API_KEY:
        raise ValueError("⚠️ API key da ASI:One não encontrada. Defina ASI_ONE_API_KEY no .env")

    payload = {
        "prompt": prompt,
        "size": size,
        "model": model
    }
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {ASI_API_KEY}"
    }

    try:
        response = requests.post(ASI_ENDPOINT, json=payload, headers=headers, timeout=60)
        data = response.json()

        if response.status_code == 200 and data.get("status") == 1:
            image_url = data["images"][0]["url"]
            return image_url  # Base64 da imagem
        else:
            print("⚠️ Falha ao gerar imagem:", data)
            return None
    except Exception as e:
        print(f"❌ Erro ao conectar à ASI:One: {e}")
        return None
