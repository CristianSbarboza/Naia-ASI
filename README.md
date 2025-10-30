# 🧠 NAIA  
### *The Story Oracle – Where ideas become stories.*

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![AI](https://img.shields.io/badge/AI-Gemini_Nano-blue?style=for-the-badge)
![Chrome](https://img.shields.io/badge/Chrome_OnDevice_AI-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)

---

## 🌟 Overview 

**NAIA** is an experimental platform built for the **Chrome Hackathon**, turning the browser into a **creative writing environment powered by local AI**.  
It uses **Gemini Nano (via `prompt API`)** to generate, edit, and translate stories **entirely offline**, maintaining privacy and creativity.

> “The NAIA framework offers a dashboard for the beginning of story creation — like an oracle of imagination.”

---

## 🎯 Inspiration 

Inspired by **Content Marketing** and the idea of making creative writing **accessible, interactive, and intelligent**.  
Born from the vision of **on-device AI agents** that help writers, educators, and creators build unique narratives without cloud dependency.

---

## 🪄 What it does 

NAIA turns ideas into fully structured stories, divided into chapters with protagonists, conflicts, and themes.

✨ **Core Features:**
- 🧠 Story generation from custom prompts  
- ✏️ Smart text editing (word replacement)  
- 🌍 AI-powered translation (translator API)  
- 📖 Story history viewer  
- 🖋️ Ready for comic & book creation  

---

## 🏗️ How we built it 

🔹 **Frontend:** React + Tailwind CSS  
🔹 **AI Engine:** `prompt API` (Google Gemini Nano, On-Device)  
🔹 **Prompt Logic:** Structured JSON format for consistent story generation  
🔹 **Dashboard:** Modular interface with story creation, editing, and translation contexts  
🔹 **Session Handling:** Custom session manager for Gemini Nano (`ready`, `downloadable`, `unavailable` states)

> Inspired by **Google Storybook** and **Google Books** for user experience and flow.

---

## ⚙️ Challenges we ran into

🚧 Integration with the **experimental Chrome on-device AI API (`prompt API`)** required:
- Managing model state and GPU/VRAM availability  
- Handling async session creation and error states  
- Ensuring valid JSON returns for story parsing  
- Adapting the system for multilingual support  

---

## 🏆 Accomplishments that we're proud of

💎 We successfully aligned **idea, technology, and market**, proving it’s possible to build a **fully local story generator with AI**.  
NAIA became a proof-of-concept of **creative AI running natively inside the browser** — private, fast, and interactive.

---

## 📚 What we learned 

💭 Every dream requires resilience — especially when building with experimental technology.  
We learned:
- How to manage prompt-driven creative flows  
- How to work with on-device AI models  
- The importance of narrative consistency and user experience  

---

## 🚀 What's next for NAIA 

📘 Next goals:
- ✍️ Add **manual editing tools** for rewriting specific parts of the story  
- 🧹 Implement **automatic grammar and spelling correction** powered by API Proofreader  
- 🔁 Improve **prompt consistency** for more coherent multi-chapter stories  
- 🗣️ Enable **real-time translation and text-to-speech narration**  
- 💾 Allow **saving and exporting stories** in multiple formats (EPUB, TXT)

> The next evolution of NAIA focuses on becoming a **creative writing assistant**, helping users refine, correct, and perfect their narratives while staying fully offline.

---

## 💻 Team 

👤 **[Cristian Santos]** — Full Stack Developer & software engineer
👤 **[Alex Leandro Freitas (freitasALVF)]** — project manager

---

## 🏁 Keywords

`AI` · `Gemini Nano` · `Chrome Hackathon` · `On-device Intelligence` · `Storytelling` · `React` · `Tailwind` · `Creative Tools`

---

chrome://flags

#prompt-api-for-gemini-nano

#optimization-guide-on-device-model

#translation-api

#language-detection-api

---

## 🧩 Installation

```bash
# Clone this repository
git clone https://github.com/ALVF-Consultoria/Naia.git

# Navigate into the project folder
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

---

# 🧠 NAIA

### *O Oráculo das Histórias – Onde ideias viram narrativas.*

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)
![AI](https://img.shields.io/badge/AI-Gemini_Nano-blue?style=for-the-badge)
![Chrome](https://img.shields.io/badge/Chrome_OnDevice_AI-4285F4?style=for-the-badge\&logo=googlechrome\&logoColor=white)

---

## 🌟 Visão Geral

**NAIA** é uma plataforma experimental criada para o **Hackathon do Chrome**, transformando o navegador em um **ambiente de escrita criativa impulsionado por IA local**.
Ela utiliza o **Gemini Nano (via `prompt API`)** para gerar, editar e traduzir histórias **totalmente offline**, preservando a privacidade e incentivando a criatividade.

> “O framework NAIA oferece um painel para o início da criação de histórias — como um oráculo da imaginação.”

---

## 🎯 Inspiração

Inspirado no **Marketing de Conteúdo** e na ideia de tornar a escrita criativa **acessível, interativa e inteligente**.
Nasceu da visão de **agentes de IA locais** que auxiliam escritores, educadores e criadores a desenvolver narrativas únicas sem depender da nuvem.

---

## 🪄 O que o NAIA faz

O NAIA transforma ideias em histórias completas e estruturadas, divididas em capítulos com protagonistas, conflitos e temas.

✨ **Principais Funcionalidades:**

* 🧠 Geração de histórias a partir de prompts personalizados
* ✏️ Edição inteligente de texto (substituição de palavras)
* 🌍 Tradução com IA (via Translator API)
* 📖 Visualizador de histórico de histórias
* 🖋️ Preparado para criação de livros e quadrinhos

---

## 🏗️ Como foi construído

🔹 **Frontend:** React + Tailwind CSS
🔹 **Mecanismo de IA:** `prompt API` (Google Gemini Nano, On-Device)
🔹 **Lógica de Prompt:** Formato JSON estruturado para geração consistente de histórias
🔹 **Dashboard:** Interface modular com criação, edição e tradução de histórias
🔹 **Gerenciamento de Sessão:** Sistema customizado para o Gemini Nano (`ready`, `downloadable`, `unavailable`)

> Inspirado nas experiências do **Google Storybook** e **Google Books** em termos de UX e fluxo criativo.

---

## ⚙️ Desafios Enfrentados

🚧 A integração com a **API experimental de IA local do Chrome (`prompt API`)** exigiu:

* Gerenciar estado do modelo e disponibilidade de GPU/VRAM
* Lidar com criação assíncrona de sessões e erros
* Garantir respostas JSON válidas para análise das histórias
* Adaptar o sistema para **suporte multilíngue**

---

## 🏆 Conquistas

💎 Conseguimos alinhar **ideia, tecnologia e mercado**, provando que é possível construir um **gerador de histórias com IA totalmente local**.
O NAIA tornou-se uma prova de conceito de **IA criativa rodando nativamente no navegador** — privada, rápida e interativa.

---

## 📚 O que aprendemos

💭 Todo sonho exige resiliência — especialmente quando se trabalha com tecnologia experimental.
Aprendemos:

* A estruturar fluxos criativos baseados em prompts
* A trabalhar com modelos de IA embarcados no dispositivo
* A importância da consistência narrativa e da experiência do usuário

---

## 🚀 Próximos Passos para o NAIA

📘 Próximos objetivos:

* ✍️ Adicionar **ferramentas de edição manual** para reescrever partes específicas da história
* 🧹 Implementar **correção automática de gramática e ortografia** (API Proofreader)
* 🔁 Melhorar a **consistência dos prompts** em histórias com múltiplos capítulos
* 🗣️ Habilitar **tradução em tempo real e narração por voz (TTS)**
* 💾 Permitir **salvar e exportar histórias** em vários formatos (EPUB, TXT)

> A próxima evolução do NAIA é se tornar um **assistente de escrita criativa**, ajudando usuários a refinar, corrigir e aperfeiçoar suas narrativas — tudo isso **offline**.

---

## 💻 Equipe

👤 **[Cristian Santos]** — Desenvolvedor Full Stack & Engenheiro de Software
👤 **[Alex Leandro Freitas (freitasALVF)]** — Gerente de Projeto

---

## 🏁 Palavras-chave

`IA` · `Gemini Nano` · `Chrome Hackathon` · `Inteligência Local` · `Storytelling` · `React` · `Tailwind` · `Ferramentas Criativas`

---

chrome://flags

#prompt-api-for-gemini-nano

#optimization-guide-on-device-model

#translation-api

#language-detection-api

---

## 🧩 Instalação

```bash
# Clone este repositório
git clone https://github.com/ALVF-Consultoria/Naia.git

# Acesse a pasta do projeto
cd frontend

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

