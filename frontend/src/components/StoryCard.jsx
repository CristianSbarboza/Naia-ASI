import React from "react";

const StoryCard = ({
  story,
  onOpenFlipbook,
  onViewStory,
  onDownloadPDF,
  onDelete,
  onTranslate,
}) => {
  const handleUploadToGoogleBooks = () => {
    if (onDownloadPDF) {
      onDownloadPDF(story);
    }
    window.open("https://play.google.com/books/publish", "_blank");
  };

  // 🔧 Função que limpa e resume o conteúdo da história
  const getStoryPreview = (text) => {
    if (!text) return "Nenhum conteúdo disponível.";

    let parsed;
    // 1️⃣ Se vier como string JSON, tenta converter
    try {
      const cleaned = text.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = null;
    }

    // 2️⃣ Se o parse der certo → extrai conteúdo legível
    if (parsed) {
      const intro =
        parsed.introduction?.content ||
        parsed.introduction ||
        "";
      const chapters = parsed.chapters
        ? parsed.chapters
            .slice(0, 2)
            .map(
              (ch, i) =>
                `📖 ${ch.title || `Capítulo ${i + 1}`}: ${ch.content.slice(
                  0,
                  80
                )}...`
            )
            .join("\n")
        : "";

      return (
        ` ${intro.slice(0, 150)}\n` +
        (chapters ? `\n${chapters}` : "")
      ).trim();
    }

    // 3️⃣ Se não for JSON → mostra só um resumo do texto comum
    return text.slice(0, 250) + (text.length > 250 ? "..." : "");
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md flex flex-col justify-between border border-gray-200 hover:shadow-lg transition-all duration-300">
      <h2 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-1">
        {story.title || "Untitled"}
      </h2>

      {/* ✅ Prévia limpa, sem marcas JSON */}
      <pre className="text-gray-700 text-sm mb-4 line-clamp-5 whitespace-pre-wrap">
        {getStoryPreview(story.text)}
      </pre>

      <div className="grid grid-cols-2 gap-3 mt-auto">
        <button
          onClick={() => onOpenFlipbook(story)}
          className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow transition-colors duration-200"
        >
          📖 Flipbook
        </button>

        <button
          onClick={() => onViewStory && onViewStory(story)}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow transition-colors duration-200"
        >
          👁️ View
        </button>

        <button
          onClick={() => onDownloadPDF(story)}
          className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 shadow transition-colors duration-200"
        >
          ⬇️ PDF
        </button>

        <button
          onClick={() => onTranslate && onTranslate(story)}
          className="px-4 py-2 text-sm bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 shadow transition-colors duration-200"
        >
          🌍 Translate
        </button>

        <button
          onClick={handleUploadToGoogleBooks}
          className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow transition-colors duration-200 col-span-2"
        >
          📚 Upload to Google Books
        </button>

        <button
          onClick={() => onDelete(story.id)}
          className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 shadow transition-colors duration-200 col-span-2"
        >
          🗑️ Delete
        </button>
      </div>

      <p className="text-[11px] text-gray-400 mt-3 text-right">
        {story.createdAt}
      </p>
    </div>
  );
};

export default StoryCard;
