const BACKEND_URL = "http://localhost:8000"; // URL do FastAPI

/**
 * Envia os dados estruturados do formulário para o Backend
 * @param {object} promptData - objeto do tipo StoryPrompt
 */
export async function generateStoryWithAgent(promptData) {
  try {
    const response = await fetch(`${BACKEND_URL}/generate_story`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(promptData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro na API do Backend:", errorData);
      throw new Error(errorData.detail || `Erro do servidor: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ Resposta do backend:", data);
    return data;
  } catch (error) {
    console.error("❌ Falha ao gerar história:", error);
    throw error;
  }
}

/**
 * Mapeia o formulário para o modelo esperado pelo backend
 */
export function mapFormToPrompt(formData) {
  return {
    title: formData.title || "Minha História",
    protagonist: formData.protagonistName || "",
    antagonist: formData.antagonistNature || "",
    setting: `${formData.settingLocation} (${formData.settingTime})`,
    conflict: formData.conflictStartingPoint || "",
    theme: formData.themeMessage || "",
  };
}
