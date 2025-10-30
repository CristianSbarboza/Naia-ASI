import React, { useState } from "react";
import { generateStoryWithAgent } from "../services/apiService"; // ✅ Novo import

const EditWord = ({ storyText, setStoryText }) => {
  const [findWord, setFindWord] = useState("");
  const [replaceWord, setReplaceWord] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReplace = async () => {
    if (!findWord || !replaceWord) return;
    setLoading(true);

    try {
      // Estrutura de dados enviada ao agente
      const promptData = {
        title: "Editar texto",
        protagonist: "Usuário",
        antagonist: "Erro de escrita",
        setting: "Ambiente de edição de história",
        conflict: `Substituir todas as ocorrências de "${findWord}" por "${replaceWord}" no texto.`,
        theme: storyText,
      };

      const response = await generateStoryWithAgent(promptData);

      // O backend retorna JSON com { storyData, chapters, ... }
      const updatedStory = response.storyData || "[sem resposta do agente]";
      setStoryText(updatedStory);
      setFindWord("");
      setReplaceWord("");
    } catch (err) {
      console.error("Erro ao atualizar história:", err);
      alert("Erro ao comunicar com o agente NAIA.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-lg shadow-md w-full max-w-2xl">
      <label>
        Find word:
        <input
          type="text"
          value={findWord}
          onChange={(e) => setFindWord(e.target.value)}
          className="border p-2 rounded w-full mt-1"
          placeholder="Word to be replaced"
        />
      </label>

      <label>
        Replace with:
        <input
          type="text"
          value={replaceWord}
          onChange={(e) => setReplaceWord(e.target.value)}
          className="border p-2 rounded w-full mt-1"
          placeholder="New word"
        />
      </label>

      <button
        onClick={handleReplace}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
      >
        {loading ? "Updating..." : "Apply"}
      </button>
    </div>
  );
};

export default EditWord;
