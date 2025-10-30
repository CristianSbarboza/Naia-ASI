![tag:innovationlab](https://img.shields.io/badge/innovationlab-3D8BD3)
![tag:hackathon](https://img.shields.io/badge/hackathon-5F43F1)

more information and documentation
https://github.com/ALVF01/NAIA/blob/main/README.md

# 🧠 Naia

StoryForge is an interactive web application that allows users to create and generate stories using an AI agent.  
Through a step-by-step form, users define the main narrative elements (protagonist, antagonist, setting, conflict, and theme).  
At the end of the process, the system generates a complete story based on the provided details.

---

## 🚀 Project Structure

- **Frontend (React + TailwindCSS)**  
  Modern, responsive interface for creating stories with visual feedback, icons, and step progress indicators.

- **Backend (FastAPI)**  
  API responsible for receiving structured story data, processing requests, and generating the final story (through an AI agent or LLM).

---

## ⚙️ Key Features

- Multi-step form with **5 stages**:  
  Protagonist → Antagonist & Conflict → Setting → Plot & Climax → Theme & Message  
- **React Context API** for global story state management  
- **FastAPI integration** for dynamic story generation  
- Clean, intuitive **wizard-style design** with interactive icons  
- Ready for **LLM or Agent integrations** (e.g., SingularityNET,  Metta)

---

## 🧩 Running the Project

### 🔹 Frontend
```bash
cd frontend
npm install
npm run dev

cd backend
pip install -r requirements.txt
uvicorn main:app --reload




