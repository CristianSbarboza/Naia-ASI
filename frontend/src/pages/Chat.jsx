// src/pages/Chat.jsx
import React, { useState } from "react";
import { generateStoryWithAgent } from "../services/apiService"; // 🚀 Novo backend

const Chat = () => {
  const [promptInput, setPromptInput] = useState("");
  const [response, setResponse] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendPrompt = async () => {
    if (!promptInput.trim() || isProcessing) return;

    setIsProcessing(true);
    setResponse("Processando...");

    try {
      // Monta os dados do prompt conforme o backend espera
      const promptData = {
        title: "Chat Livre com NAIA",
        protagonist: "Usuário",
        antagonist: "Dúvida",
        setting: "Ambiente de chat",
        conflict: promptInput,
        theme: "Interação livre com o agente NAIA",
      };

      const res = await generateStoryWithAgent(promptData);
      const resultText = res.storyData || JSON.stringify(res, null, 2);

      setResponse(resultText);
    } catch (error) {
      console.error("Erro ao enviar prompt:", error);
      setResponse("⚠️ Erro ao comunicar com o backend ou agente NAIA.");
    } finally {
      setIsProcessing(false);
      setPromptInput("");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center font-sans">
      <div className="w-full max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-xl">
        <h1 className="text-3xl font-bold text-gray-800">💬 Chat com a NAIA</h1>
        <p className="mt-2 text-sm text-gray-600 italic">
          Converse livremente — o backend envia sua mensagem para o agente NAIA.
        </p>

        {response && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md shadow-sm animate-fade-in">
            <strong className="font-semibold text-gray-700">Resposta:</strong>
            <p className="mt-2 whitespace-pre-wrap text-gray-800">{response}</p>
          </div>
        )}

        <div className="mt-6">
          <textarea
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            placeholder="Digite sua mensagem para o agente NAIA..."
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          />
          <button
            onClick={handleSendPrompt}
            className="mt-3 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 ease-in-out"
            disabled={isProcessing || !promptInput.trim()}
          >
            {isProcessing ? "Processando..." : "Enviar para NAIA"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
