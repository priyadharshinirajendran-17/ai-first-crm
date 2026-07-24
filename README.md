# 🏥 AI-First CRM

An AI-powered Healthcare Customer Relationship Management (CRM) application that enables healthcare representatives to manage Healthcare Professional (HCP) interactions through both structured forms and a conversational AI assistant.

Built using **React, FastAPI, LangGraph, Groq LLM, and PostgreSQL**, the application demonstrates how AI agents can automate CRM workflows by understanding natural language and executing real application actions.

---

## ✨ Features

- 🤖 AI-powered conversational CRM assistant
- 📝 Log HCP interactions using structured forms
- 🔍 Search interactions using natural language
- ✏️ Edit existing interactions through AI
- 📋 AI-generated interaction summaries
- 📅 AI-powered follow-up recommendations
- 💾 PostgreSQL database integration
- ⚡ FastAPI backend with REST APIs
- 🎯 Redux Toolkit for state management
- 📱 Responsive React user interface

---

## 🛠 Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | React.js, Redux Toolkit, Material UI |
| Backend | FastAPI, Python |
| AI Framework | LangGraph |
| LLM | Groq Llama 3.3 70B |
| Database | PostgreSQL (Neon) |
| ORM | SQLAlchemy |
| API Testing | Swagger UI |
| Deployment | Vercel (Frontend), Render (Backend) |

---

# 🏗 System Architecture

```text
                React Frontend
                       │
                Redux Toolkit
                       │
              REST API Requests
                       │
                 FastAPI Backend
                       │
                 LangGraph Agent
                       │
      ┌─────────────────────────────────┐
      │                                 │
 Log Interaction Tool           Edit Interaction Tool
 Search Interaction Tool        Follow-up Tool
 Summarization Tool
      │
      ▼
      Groq LLM
      │
      ▼
 PostgreSQL Database
```

---

# 🤖 AI Agent Workflow

The application uses **LangGraph** to orchestrate an AI agent capable of understanding user requests and selecting the appropriate CRM tool.

### Available AI Tools

- Log HCP Interaction
- Edit Existing Interaction
- Search HCP Interactions
- Generate Follow-up Recommendations
- Summarize Interaction Notes

Instead of relying on keyword matching, the AI agent interprets natural language requests and determines which tool should be executed to fulfill the user's intent.

---

# 📂 Project Structure

```text
AI-First-CRM
│
├── backend
│   ├── app
│   │   ├── agents
│   │   ├── api
│   │   ├── database
│   │   ├── models
│   │   ├── schemas
│   │   ├── services
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── frontend
│   ├── src
│   │   ├── app
│   │   ├── features
│   │   ├── components
│   │   ├── services
│   │   └── pages
│   │
│   └── package.json
│
└── README.md
```

---

# 📸 Screenshots

## Dashboard

> *(Add screenshot)*

---

## HCP Interaction Form

> *(Add screenshot)*

---

## AI Chat Assistant

> *(Add screenshot)*

---

## AI Generated Summary

> *(Add screenshot)*

---

## Swagger API

> *(Add screenshot)*

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/<your-username>/ai-first-crm.git

cd ai-first-crm
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

source venv/bin/activate
```

Windows

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run backend

```bash
uvicorn app.main:app --reload
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# ⚙ Environment Variables

Backend

```env
DATABASE_URL=

GROQ_API_KEY=
```

Frontend

```env
VITE_API_URL=http://localhost:8000
```

---

# 📡 API Documentation

Once the backend is running:

```
http://localhost:8000/docs
```

Swagger UI provides interactive documentation for all available endpoints.

---

# 🎯 Future Improvements

- User Authentication & Authorization
- Role-Based Access Control
- Email Notifications
- Calendar Integration
- Analytics Dashboard
- Semantic Search using Vector Database
- Multi-user Support
- Docker Deployment
- CI/CD Pipeline

---

# 👩‍💻 Author

**Priyadharshini Rajendran**

- GitHub: https://github.com/priyadharshinirajendran-17
- LinkedIn: *(Add your LinkedIn URL)*
- Portfolio: https://mern-portfolio-wheat-omega.vercel.app

---

# 📄 License

This project is developed for educational and portfolio purposes.
