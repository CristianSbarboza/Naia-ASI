import React from "react";

const SaveStoryButton = ({ storyText, title = "Minha História" }) => {
  const handleSaveStory = () => {
    if (!storyText || storyText.trim().length === 0) {
      alert("Nenhuma história para salvar!");
      return;
    }

    const savedStories = JSON.parse(localStorage.getItem("stories")) || [];

    const newStory = {
      id: Date.now(),
      title,
      text: storyText,
      createdAt: new Date().toLocaleString(),
    };

    const updatedStories = [newStory, ...savedStories];
    localStorage.setItem("stories", JSON.stringify(updatedStories));

  };

  return (
    <button
      onClick={handleSaveStory}
      className="p-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-300 shadow-lg"
    >
      💾 Salvar
    </button>
  );
};

export default SaveStoryButton;
