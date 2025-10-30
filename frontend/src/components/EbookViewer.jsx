import React, { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";

const splitStoryIntoPages = (storyText, wordsPerPage = 50) => {
  const chapters = storyText.split(/\n(?=Capítulo \d+:)/); 
  const pages = [];

  chapters.forEach((chapter) => {
    const words = chapter.split(" ");
    for (let i = 0; i < words.length; i += wordsPerPage) {
      pages.push(words.slice(i, i + wordsPerPage).join(" "));
    }
  });

  return pages;
};

const EbookViewer = ({ storyText, storyTitle = "My Story" }) => {
  const flipBookRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pages = splitStoryIntoPages(storyText, 50);
  const totalPages = pages.length;

  const pageStyle = "bg-gradient-to-br from-[#d3d3d3] to-[#f5f5f5] text-gray-900";

  // Left volume appears as book opens
  const leftOpacity = currentPage > 0 ? 1 : 0;
  // Right volume disappears as book advances
  const rightOpacity = currentPage < totalPages ? 1 - currentPage / totalPages : 0;

  return (
    <div className="flex justify-center w-full bg-transparent py-10">
      <div className="relative rounded-2xl">
        {/* Left volume effect */}
        <div
          className="absolute -left-2 top-2 w-1.5 h-[96%] bg-gradient-to-b from-gray-400/60 to-gray-600/40 rounded-l-md shadow-md transition-opacity duration-300"
          style={{ opacity: leftOpacity }}
        />
        <div
          className="absolute -left-[6px] top-3 w-[3px] h-[94%] bg-gray-300/60 rounded-md blur-[1px] transition-opacity duration-300"
          style={{ opacity: leftOpacity }}
        />

        {/* Right volume effect */}
        <div
          className="absolute -right-2 top-2 w-1.5 h-[96%] bg-gradient-to-b from-gray-400/60 to-gray-600/40 rounded-r-md shadow-md transition-opacity duration-300"
          style={{ opacity: rightOpacity }}
        />
        <div
          className="absolute -right-[6px] top-3 w-[3px] h-[94%] bg-gray-300/60 rounded-md blur-[1px] transition-opacity duration-300"
          style={{ opacity: rightOpacity }}
        />

        <HTMLFlipBook
          ref={flipBookRef}
          width={450}
          height={650}
          size="stretch"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1536}
          maxShadowOpacity={0.5}
          showCover={true}
          drawShadow={true}
          flippingTime={700}
          usePortrait={false}
          startPage={0}
          className="rounded-xl overflow-hidden mx-auto" // garante centralização
          onFlip={(e) => setCurrentPage(e.data)}
        >
          {/* COVER */}
          <div className="bg-gradient-to-br from-gray-600 to-gray-700 text-white flex items-center justify-center p-10 border border-gray-800 rounded-xl shadow-inner">
            <p className="opacity-90 text-xl font-semibold drop-shadow-md">
              📖 {storyTitle}
            </p>
          </div>

          {/* PAGES */}
          {pages.map((page, idx) => (
            <div
              key={idx}
              className={`relative p-6 flex flex-col items-start justify-start text-lg leading-relaxed font-serif ${pageStyle}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.04] to-transparent pointer-events-none" />
              <div className="absolute inset-0 border border-black/5 rounded-xl pointer-events-none" />
              <p className="whitespace-pre-wrap relative z-10">{page}</p>
            </div>
          ))}

          {/* BACK COVER */}
          <div className="bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center p-10 border border-gray-400 rounded-xl shadow-inner">
            <p className="text-gray-700 italic text-center">
              The End 📖 Thanks for reading!
            </p>
          </div>
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default EbookViewer;
