import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import StoryCard from "../components/StoryCard";
import { useStory } from "../context/StoryContext";
import { jsPDF } from "jspdf";
import TranslateModal from "../components/TranslateModal";
import TranslationOverlay from "../components/TranslationOverlay";
import { translateText } from "../services/translatorService";

const StoriesPage = () => {
  const navigate = useNavigate();
  const { setFinalStory } = useStory();
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [showTranslateModal, setShowTranslateModal] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationProgress, setTranslationProgress] = useState(0);

  useEffect(() => {
    const savedStories = JSON.parse(localStorage.getItem("stories")) || [];
    setStories(savedStories);
  }, []);

  const handleDeleteStory = (id) => {
    if (window.confirm("Are you sure you want to delete this story?")) {
      const updated = stories.filter((story) => story.id !== id);
      setStories(updated);
      localStorage.setItem("stories", JSON.stringify(updated));
    }
  };

  const handleOpenFlipbook = (story) => {
    setFinalStory(story.text, story.title);
    navigate("/flipbook");
  };

  const handleViewStory = (story) => {
    setFinalStory(story.text, story.title);
    navigate("/history-view");
  };

  const handleDownloadPDF = (story) => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const margin = 50;
    const pageWidth = doc.internal.pageSize.getWidth() - margin * 2;
    const pageHeight = doc.internal.pageSize.getHeight();
    const lineHeight = 18;

    doc.setFont("times", "bold");
    doc.setFontSize(22);
    doc.text(story.title || "Untitled Story", pageWidth / 2 + margin, 70, { align: "center" });

    doc.setFont("times", "normal");
    doc.setFontSize(12);

    const paragraphs = story.text.split(/\n\s*\n/);
    let y = 110;

    paragraphs.forEach((paragraph) => {
      const lines = doc.splitTextToSize(paragraph.trim(), pageWidth);
      lines.forEach((line) => {
        if (y + lineHeight > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
        doc.text(line, margin, y);
        y += lineHeight;
      });
      y += lineHeight;
    });

    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Page ${i} of ${totalPages}`, pageWidth / 2 + margin, pageHeight - 30, { align: "center" });
    }

    doc.save(`${story.title?.replace(/\s+/g, "_") || "story"}.pdf`);
  };

  const openTranslateModal = (story) => {
    setSelectedStory(story);
    setShowTranslateModal(true);
  };

  const handleTranslateStory = async (language) => {
    setShowTranslateModal(false);
    if (!selectedStory) return;

    setIsTranslating(true);
    setTranslationProgress(0);

    try {
      // 1️⃣ Translate title
      const translatedTitle = await translateText(selectedStory.title, language);

      // 2️⃣ Split into paragraphs and translate each
      const paragraphs = selectedStory.text.split(/\n\s*\n/);
      const translatedParagraphs = [];

      for (let i = 0; i < paragraphs.length; i++) {
        const translatedPara = await translateText(paragraphs[i], language, (prog) => {
          const overallProgress = Math.floor(((i + prog / 100) / paragraphs.length) * 100);
          setTranslationProgress(overallProgress);
        });
        translatedParagraphs.push(translatedPara);
      }

      const translatedText = translatedParagraphs.join("\n\n");

      const newStory = {
        id: Date.now(),
        title: translatedTitle || `${selectedStory.title} (${language.toUpperCase()})`,
        text: translatedText,
      };

      const updatedStories = [...stories, newStory];
      setStories(updatedStories);
      localStorage.setItem("stories", JSON.stringify(updatedStories));
    } catch (error) {
      console.error("Error translating the story:", error);
    } finally {
      setIsTranslating(false);
      setTranslationProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-28 px-6 pb-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-indigo-700 mb-10 drop-shadow-sm">
        📚 My Stories
      </h1>

      {stories.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center h-[60vh]">
          <p className="text-gray-500 text-lg mb-4">No stories created yet.</p>
          <button
            onClick={() => navigate("/create-history")}
            className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-md"
          >
            ✍️ Create New Story
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              onOpenFlipbook={handleOpenFlipbook}
              onViewStory={handleViewStory}
              onDownloadPDF={() => handleDownloadPDF(story)}
              onDelete={handleDeleteStory}
              onTranslate={() => openTranslateModal(story)}
            />
          ))}
        </div>
      )}

      {/* Language selection modal */}
      <TranslateModal
        isOpen={showTranslateModal}
        onClose={() => setShowTranslateModal(false)}
        onTranslate={handleTranslateStory}
        isTranslating={isTranslating}
        progress={translationProgress}
      />

      {/* Progress overlay */}
      <TranslationOverlay visible={isTranslating} progress={translationProgress} />
    </div>
  );
};

export default StoriesPage;
