from typing import List
from hyperon import MeTTa, S, E, V, OperationObject
from .models import StoryPrompt

# --- Base de Conhecimento MeTTa ---
METTA_KB = """
(is-weak-to vampiro prata)
(is-weak-to vampiro luz-solar)
(is-weak-to lobisomem prata)
(is-weak-to dragao magia-congelante)
(is-weak-to feiticeiro coragem)
(is-weak-to sombra luz)

(is-location vampiro Transilvania)
(is-location lobisomem Highlands)
(is-location dragao Montanhas-Geladas)
(is-location feiticeiro Torre-Arcana)
"""

metta_runner = None

def initialize_metta_runner() -> MeTTa | None:
    global metta_runner
    if metta_runner is None:
        try:
            metta_runner = MeTTa()
            metta_runner.run(METTA_KB)
            print("✅ MeTTa inicializado e KB carregado.")
        except Exception as e:
            print(f"⚠️ Erro ao inicializar MeTTa: {e}")
            metta_runner = None
    return metta_runner

def get_antagonist_weaknesses(metta: MeTTa, antagonist_name: str) -> List[str]:
    if not metta:
        return []

    antagonist_symbol = S(antagonist_name.lower().replace(" ", "-"))
    pattern = E(S('is-weak-to'), antagonist_symbol, V('weakness'))
    bindings = metta.space().query(pattern)

    weaknesses = []
    if bindings:
        for binding in bindings:
            weakness_atom = binding.get('weakness')
            if weakness_atom and not isinstance(weakness_atom.get_object(), OperationObject):
                weaknesses.append(weakness_atom.get_name())
    return weaknesses

def enrich_prompt_with_metta(prompt: StoryPrompt) -> str:
    """Gera prompt enriquecido para ASI:One, já pedindo 5 capítulos de ~100 palavras cada"""
    metta = initialize_metta_runner()
    weaknesses = get_antagonist_weaknesses(metta, prompt.antagonist)

    enriched_prompt = f"""
Você é um agente narrativo que deve gerar uma história criativa em 5 capítulos, cada capítulo com aproximadamente 200 palavras.
Base da história:
Título: {prompt.title}
Protagonista: {prompt.protagonist}
Antagonista: {prompt.antagonist}
Cenário: {prompt.setting}
Conflito: {prompt.conflict}
Tema central: {prompt.theme}
"""

    if weaknesses:
        enriched_prompt += f"\n🔹 Informação simbólica (MeTTa): o antagonista é fraco contra {', '.join(weaknesses)}. Use isso como ponto de virada narrativo."
    else:
        enriched_prompt += "\n⚙️ Nenhuma fraqueza conhecida foi encontrada no MeTTa. Crie livremente."

    enriched_prompt += """
A resposta deve ser JSON no formato:
{
  "title": "Título da história",
  "storyData": "Texto completo da história",
  "chapters": [
      {"title": "Capítulo 1", "content": "Escreva ~100 palavras"},
      {"title": "Capítulo 2", "content": "Escreva ~100 palavras"},
      {"title": "Capítulo 3", "content": "Escreva ~100 palavras"},
      {"title": "Capítulo 4", "content": "Escreva ~100 palavras"},
      {"title": "Capítulo 5", "content": "Escreva ~100 palavras"}
  ]
}
"""
    return enriched_prompt
