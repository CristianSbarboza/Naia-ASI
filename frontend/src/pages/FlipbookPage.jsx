import React from "react";
import { useNavigate } from "react-router";
import EbookViewer from "../components/EbookViewer";
import { useStory } from "../context/StoryContext";

const FlipbookPage = () => {
  const navigate = useNavigate();
  const { storyData, storyTitle } = useStory();

  if (!storyData) {
    return (
      <div className="p-6">
        <p>Nenhuma história encontrada.</p>
        <button onClick={() => navigate(-1)}>Voltar</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col justify-center items-center mt-6">
      <div className="flex justify-center">
        <EbookViewer storyText={storyData} storyTitle={storyTitle} />
      </div>
      <div className="text-center">
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
