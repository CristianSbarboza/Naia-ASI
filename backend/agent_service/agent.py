from uagents import Agent, Context
from agent_service.models import StoryPrompt, StoryResponse
from agent_service.metta_logic import enrich_prompt_with_metta

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
    
    # Enriquecer o prompt via MeTTa (SingularityNET)
    enriched = enrich_prompt_with_metta(msg)

    # Mock: Geração simulada (em vez de LLM real)
    response = StoryResponse(
        title=f"História: {msg.title}",
        storyData=f"Baseando-se nas regras do MeTTa, o antagonista '{msg.antagonist}' possui fraquezas exploradas na história.",
        chapters=[
            "Capítulo 1: O Despertar do Conflito",
            "Capítulo 2: O Encontro das Forças",
            "Capítulo 3: A Queda do Antagonista"
        ]
    )
    ctx.logger.info("[NAIA] História gerada com sucesso!")
    await ctx.send(sender, response)

if __name__ == "__main__":
    agent.run()
