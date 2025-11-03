import React, { useMemo } from "react";
import { useNavigate } from "react-router";
import EbookViewer from "../components/EbookViewer";
import { useStory } from "../context/StoryContext";

const FlipbookPage = () => {
  const navigate = useNavigate();
  const { storyData, storyTitle } = useStory();

  // ✅ Parse seguro do JSON do backend
  const parsedStory = useMemo(() => {
    if (!storyData) return null;
    try {
      const cleaned = storyData.replace(/```json|```/g, "").trim();
      return JSON.parse(cleaned);
    } catch (err) {
      console.error("Erro ao parsear storyData no Flipbook:", err);
      return null;
    }
  }, [storyData]);

  if (!parsedStory) {
    return (
      <div className="p-6">
        <p>Nenhuma história encontrada.</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Voltar
        </button>
      </div>
    );
  }

  // ✅ Transformar capítulos em uma string única para o EbookViewer
  const storyTextForFlipbook = parsedStory.chapters
    .map((chapter) => `${chapter.title}\n\n${chapter.content}`)
    .join("\n\n");

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col justify-center items-center mt-6">
      <div className="flex justify-center w-full max-w-3xl">
        <EbookViewer storyText={storyTextForFlipbook} storyTitle={storyTitle} />
      </div>
      <div className="text-center mt-6">
        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition"
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default FlipbookPage;
