import React from "react";
import StoryForm from "../components/StoryForm";
import StoryGenerationOverlay from "../components/StoryGenerationOverlay";
import { generateStoryWithAgent } from "../services/apiService";
import { buildStoryPrompt } from "../utils/buildStoryPrompt";
import { useStory } from "../context/StoryContext";
import { useNavigate } from "react-router";

const CreateHistory = () => {
  const { formData, setFinalStory, isGenerating, setIsGenerating } = useStory();
  const navigate = useNavigate();

  const handleGenerateStory = async () => {
      setIsGenerating(true);
      try {
        // O prompt enviado agora é o objeto de dados do formulário,
        // não mais a string formatada pelo buildStoryPrompt (que pode ser removido ou simplificado).
        const promptData = formData; 

        console.log(promptData);

        // 2. Chama a nova função HTTP
        const responseData = await generateStoryWithAgent(promptData); // Agora recebe um OBJETO JSON
        
        console.log(responseData);

        // 3. O Agente deve retornar JSON limpo. Não precisamos mais limpar ```...```
        const storyText = responseData.storyData; // Campo StoryResponse.storyData
        const title = responseData.title || formData.title || "Minha História";

        // Salva no context
        setFinalStory(storyText, title);

        // Navega para story view
        navigate("/history-view");

      } catch (error) {
        console.error("Error generating the story:", error);
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
