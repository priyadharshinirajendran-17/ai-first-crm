# AI-First CRM – HCP Interaction Management

AI-First CRM is a Healthcare Professional (HCP) interaction management application designed for life-sciences field representatives.

The application allows users to log and manage HCP interactions using either a structured form or a conversational AI assistant.

## Features

- Structured HCP interaction logging form
- Conversational AI assistant
- Log HCP interactions using natural language
- Edit existing interaction records
- Search HCP interaction history
- Generate AI follow-up suggestions
- Summarize unstructured interaction notes
- Track materials shared and samples distributed
- Record HCP sentiment and outcomes
- PostgreSQL database integration

## Tech Stack

### Frontend

- React.js
- Vite
- Redux Toolkit
- Material UI
- Axios
- Google Inter Font

### Backend

- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- LangGraph
- LangChain
- Groq LLM

## LangGraph AI Agent

The LangGraph agent manages conversational HCP interaction workflows.

It interprets the field representative's natural-language request and uses the appropriate CRM tool to perform an action.

The agent supports five sales-related tools:

1. **Log Interaction** – Extracts interaction details from natural language and stores the interaction in the CRM database.
2. **Edit Interaction** – Modifies an existing logged interaction.
3. **Search HCP** – Searches and retrieves HCP interaction history.
4. **Suggest Follow-up** – Recommends practical follow-up actions based on interaction context.
5. **Summarize Interaction** – Converts unstructured field notes into a concise professional CRM summary.

## LLM Integration

The conversational AI assistant uses Groq through LangChain.

The application uses the `llama-3.3-70b-versatile` model for natural-language understanding, tool selection, and CRM response generation.

LangGraph manages the agent workflow and tool execution.

## Project Structure

```text
ai-first-crm/
├── frontend/
│   └── src/
│       ├── api/
│       ├── features/
│       │   └── interactions/
│       │       └── components/
│       │           ├── AIChatPanel.jsx
│       │           ├── InteractionForm.jsx
│       │           └── InteractionPage.jsx
│       └── redux/
│           └── slices/
│               └── interactionSlice.js
│
├── backend/
│   ├── app/
│   │   ├── agents/
│   │   ├── api/
│   │   ├── core/
│   │   ├── database/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   └── requirements.txt
│
└── README.md
```

## Prerequisites

Before running the project, install:

- Node.js and npm
- Python 3
- PostgreSQL
- Git

A Groq API key is required for AI assistant functionality.

## Backend Setup

### 1. Navigate to the backend folder

```bash
cd backend
```

### 2. Create a virtual environment

```bash
python -m venv .venv
```

### 3. Activate the virtual environment on Windows

```bash
.venv\Scripts\activate
```

### 4. Install backend dependencies

```bash
pip install -r requirements.txt
```

### 5. Create a `.env` file inside the backend folder

```env
APP_NAME=AI First CRM API
API_VERSION=1.0.0
HOST=127.0.0.1
PORT=8000
FRONTEND_URL=http://localhost:5173
DATABASE_URL=your_postgresql_database_url
GROQ_API_KEY=your_groq_api_key
```

### 6. Start the FastAPI backend

```bash
python -m uvicorn app.main:app --reload
```

The backend runs locally on `http://127.0.0.1:8000`.

FastAPI Swagger API documentation is available at `http://127.0.0.1:8000/docs`.

## Frontend Setup

### 1. Navigate to the frontend folder

```bash
cd frontend
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Start the Vite development server

```bash
npm run dev
```

The frontend runs locally on `http://localhost:5173`.

## Example AI Commands

```text
Log an interaction with Dr. Test Kumar. Meeting. Discussed oncology treatment options. Positive sentiment. Requested clinical materials.

Find interactions for Dr. Test Kumar.

Edit interaction 5. Change sentiment to neutral and change the outcome to follow-up meeting required.

Suggest follow-up actions for Dr. Test Kumar.

Summarize: Met Dr. Test Kumar, discussed oncology treatment, positive interest, and requested clinical materials.
```

## Security

Sensitive configuration values such as the PostgreSQL database URL and Groq API key are stored in environment variables using a `.env` file.

The `.env` file is excluded from Git version control. API keys and database credentials must not be committed to the repository.

## Author

**Priyadharshini R**