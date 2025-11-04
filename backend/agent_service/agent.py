from uagents import Agent, Context
from agent_service.models import StoryPrompt, StoryResponse
from agent_service.metta_logic import enrich_prompt_with_metta
from agent_service.image_service import generate_image  # 👈 Import novo

# Inicializa o agente NAIA
agent = Agent(
    name="naia_agent",
    seed="chave-secreta-naia-hackathon",
    port=8001,
    endpoint=["http://127.0.0.1:8001/submit"]
)

@agent.on_event("startup")
async def startup_info(ctx: Context):
    ctx.logger.info(f"[NAIA] Agent iniciado — endereço: {agent.address}")

@agent.on_message(model=StoryPrompt)
async def process_story_prompt(ctx: Context, sender: str, msg: StoryPrompt):
    ctx.logger.info(f"[NAIA] Requisição recebida: {msg.title}")
    
    # 1️⃣ Enriquecer o prompt via MeTTa
    enriched = enrich_prompt_with_metta(msg)

    # 2️⃣ Mock: gerar resposta simulada com 5 capítulos
    chapters = [
        {"title": "Capítulo 1: O Chamado à Aventura", "content": "O herói começa sua jornada, impulsionado por um acontecimento inesperado."},
        {"title": "Capítulo 2: O Encontro do Destino", "content": "As forças do bem e do mal se cruzam pela primeira vez, revelando fraquezas ocultas."},
        {"title": "Capítulo 3: A Queda na Escuridão", "content": "O protagonista é testado e quase sucumbe à força do antagonista."},
        {"title": "Capítulo 4: A Virada do Herói", "content": "Uma descoberta ou lembrança desperta o verdadeiro poder do protagonista."},
        {"title": "Capítulo 5: O Legado da Vitória", "content": "A batalha final é travada e o herói aprende o verdadeiro significado do tema da história."}
    ]

    # 3️⃣ Geração de imagem para cada capítulo
    for chapter in chapters:
        image_prompt = f"Ilustração do capítulo: {chapter['title']}. {chapter['content']}"
        image_url = generate_image(image_prompt)
        if image_url:
            chapter["image_url"] = image_url
        else:
            chapter["image"] = None  # Falha silenciosa

    # 4️⃣ Montar resposta final
    response = StoryResponse(
        title=f"História: {msg.title}",
        storyData=(
            f"Esta é uma história gerada com base nas regras do MeTTa. "
            f"O protagonista {msg.protagonist} enfrenta o antagonista {msg.antagonist} "
            f"no cenário {msg.setting}. O tema central é '{msg.theme}', "
            f"e o conflito principal gira em torno de '{msg.conflict}'."
        ),
        chapters=chapters
    )

    ctx.logger.info("[NAIA] História + imagens geradas com sucesso!")
    await ctx.send(sender, response)

if __name__ == "__main__":
    agent.run()
