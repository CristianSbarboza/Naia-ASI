// translatorService.js
export async function translateText(text, targetLanguage, onProgress) {
  if (!("Translator" in self)) {
    throw new Error("A API Translator não é suportada neste navegador.");
  }

  let sourceLanguage = "pt"; // fallback

  // 🔹 Detecta o idioma usando LanguageDetector se disponível
  if ("LanguageDetector" in self) {
    try {
      const detector = await LanguageDetector.create();
      const result = await detector.detect(text);
      sourceLanguage = result[0]?.language || sourceLanguage;
      console.log("Idioma detectado:", sourceLanguage);
    } catch (err) {
      console.warn("Erro ao detectar idioma, usando fallback:", err);
    }
  } else {
    console.warn("LanguageDetector não disponível, usando fallback para 'pt'");
  }

  // 🔹 Verifica disponibilidade do tradutor
  const status = await Translator.availability({
    sourceLanguage,
    targetLanguage,
  });

  if (status === "downloadable") {
    console.log("Baixando modelo de tradução...");
  }

  // 🔹 Cria o tradutor com monitoramento de progresso
  const translator = await Translator.create({
    sourceLanguage,
    targetLanguage,
    monitor(monitor) {
      monitor.addEventListener("downloadprogress", (e) => {
        const progress = (e.loaded * 100).toFixed(0);
        console.log(`Progresso do modelo: ${progress}%`);
        if (onProgress) onProgress(progress);
      });
    },
  });

  // 🔹 Traduz o texto
  const translatedText = await translator.translate(text);
  return translatedText;
}
