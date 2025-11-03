const BACKEND_URL = "http://localhost:8000"; // URL do FastAPI backend

/**
 * Envia os dados estruturados do formulário para o Backend (FastAPI)
 * @param {object} promptData - objeto do tipo StoryPrompt
 */
export async function generateStoryWithAgent(promptData) {
  try {
    // 🔍 Log para depuração
    console.log("📤 Enviando para o backend:", JSON.stringify(promptData, null, 2));

    const response = await fetch(`${BACKEND_URL}/generate_story`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(promptData),
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        throw new Error(`Erro do servidor (${response.status}): ${response.statusText}`);
      }

      console.error("❌ Erro na API do Backend:", errorData);

      // Caso o backend envie vários detalhes, transforma em texto legível
      if (Array.isArray(errorData.detail)) {
        const formatted = errorData.detail
          .map((d) => `${d.loc?.join(".") || "campo"} → ${d.msg}`)
          .join("\n");
        throw new Error(`Erro de validação:\n${formatted}`);
      }

      throw new Error(errorData.detail || `Erro do servidor: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ Resposta do backend:", data);
    return data;
  } catch (error) {
    console.error("🚨 Falha ao gerar história:", error);
    throw error;
  }
}

/**
 * Mapeia o formulário para o modelo esperado pelo backend
 * Retorna um objeto StoryPrompt compatível com FastAPI
 */
export function mapFormToPrompt(formData) {
  return {
    title: formData.title || "Minha História",
    protagonist: formData.protagonistName || "",
    antagonist: formData.antagonistNature || "",
    setting: `${formData.settingLocation || "Lugar indefinido"} (${formData.settingTime || "Tempo desconhecido"})`,
    conflict: formData.conflictStartingPoint || "",
    theme: formData.themeMessage || "",
  };
}
