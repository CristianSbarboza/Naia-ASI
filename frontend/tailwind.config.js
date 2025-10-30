// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  // Define os arquivos que o Tailwind deve escanear para encontrar as classes (JIT mode)
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {}, // Aqui você pode adicionar cores, fontes e outros temas customizados
  },
  plugins: [],
}