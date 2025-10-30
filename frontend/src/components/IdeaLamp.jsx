// src/components/IdeaLamp.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateStoryWithAgent } from "../services/apiService"; // ✅ novo import
import logo from "../assets/logos/NAIA_logo_curto.png";

const IdeaLamp = ({ currentStepData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setIsLoading(true);

    try {
      // Gera um prompt contextual
      const promptData = {
        title: `Dúvida sobre ${currentStepData?.title || "a história"}`,
        protagonist: "Usuário",
        antagonist: "Incerteza",
        setting: "Ambiente de criação",
        conflict: question,
        theme: "Auxílio criativo",
      };

      const response = await generateStoryWithAgent(promptData);

      // O backend retorna um JSON com { title, storyData, chapters }
      setAnswer(response.storyData || "Sem resposta disponível.");
      setQuestion(""); // limpa o input
    } catch (err) {
      console.error("Erro na NAIA:", err);
      setAnswer("⚠️ Erro ao processar sua pergunta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Botão da logo flutuante */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        animate={{ y: [0, -6, 0], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        whileHover={{ scale: 1.2 }}
        className={`cursor-pointer p-4 rounded-full relative z-10 ${
          isOpen ? "shadow-[0_0_20px_#3b82f6]" : ""
        }`}
      >
        <img src={logo} alt="NAIA" className="w-14 h-14" />
      </motion.button>

      {/* Janela de chat da IA */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="mt-4 w-80 bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl p-4 flex flex-col gap-3 border border-blue-100"
          >
            <h4 className="font-bold text-blue-700 text-lg flex items-center gap-2">
              💡 Ask the NAIA
            </h4>

            {/* Resposta da IA com scroll */}
            {answer && (
              <div className="max-h-40 overflow-y-auto p-2 bg-gray-100 rounded-lg text-gray-800 whitespace-pre-wrap">
                {answer}
              </div>
            )}

            {/* Input da pergunta */}
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleAsk}
              disabled={isLoading}
              className="bg-blue-600 text-white rounded-lg py-2 font-bold hover:bg-blue-700 transition"
            >
              {isLoading ? "Thinking..." : "Ask NAIA"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IdeaLamp;
