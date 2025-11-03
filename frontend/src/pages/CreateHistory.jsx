import React from "react";
import StoryForm from "../components/StoryForm";
import StoryGenerationOverlay from "../components/StoryGenerationOverlay";
import { generateStoryWithAgent, mapFormToPrompt } from "../services/apiService";
import { useStory } from "../context/StoryContext";
import { useNavigate } from "react-router";

const CreateHistory = () => {
  const { formData, setFinalStory, isGenerating, setIsGenerating } = useStory();
  const navigate = useNavigate();

  const handleGenerateStory = async (formDataFromForm) => {
    setIsGenerating(true);
    try {
      // Mapear o formulário para o formato esperado pelo backend
      const promptData = mapFormToPrompt(formDataFromForm);

      console.log("📤 Sending to backend:", promptData);

      const responseData = await generateStoryWithAgent(promptData);

      console.log("✅ Backend response:", responseData);

      const storyText = responseData.storyData;
      const title = responseData.title || formData.title || "Minha História";

      // Salva no context
      setFinalStory(storyText, title);

      // Navega para story view
      navigate("/history-view");
    } catch (error) {
      console.error("🚨 Error generating the story:", error);
      alert(`Erro ao gerar a história: ${error.message}. Verifique se o Backend e o Agente estão ativos.`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-8 relative">
      <StoryForm onSubmit={handleGenerateStory} />
      <StoryGenerationOverlay visible={isGenerating} />
    </div>
  );
};

export default CreateHistory;
