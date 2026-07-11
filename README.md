# AI-First CRM – HCP Interaction Management

An AI-first Customer Relationship Management application for life-sciences field representatives to log and manage Healthcare Professional (HCP) interactions using a structured form and conversational AI assistant.

## Features

- Log HCP interactions using a structured form
- Conversational AI assistant for CRM operations
- Search HCP interactions
- Edit existing interactions
- AI-generated follow-up suggestions
- Professional interaction summarization
- Materials and samples tracking
- Sentiment and outcome recording
- PostgreSQL database integration
- Responsive Material UI interface

## AI Assistant Capabilities

The LangGraph-powered AI assistant supports:

1. Log Interaction
2. Edit Interaction
3. Search HCP
4. Suggest Follow-up
5. Summarize Interaction

## Tech Stack

### Frontend

- React.js
- Vite
- Redux Toolkit
- Material UI
- Axios

### Backend

- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- LangGraph
- LangChain
- Groq LLM

## Project Structure

```text
ai-first-crm/
├── frontend/
│   └── src/
│       ├── api/
│       ├── features/
│       │   └── interactions/
│       └── redux/
│           └── slices/
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

Before running the project, ensure the following are installed:

- Node.js and npm
- Python 3
- PostgreSQL database
- Git

A Groq API key is required for the conversational AI features.

## Backend Setup

1. Navigate to the backend folder:

```bash
cd backend
```

2. Create a Python virtual environment:

```bash
python -m venv .venv
```

3. Activate the virtual environment on Windows:

```bash
.venv\Scripts\activate
```

4. Install backend dependencies:

```bash
pip install -r requirements.txt
```

5. Create a `.env` file inside the `backend` folder:

```env
APP_NAME=AI First CRM API
API_VERSION=1.0.0
HOST=127.0.0.1
PORT=8000
FRONTEND_URL=http://localhost:5173
DATABASE_URL=your_postgresql_database_url
GROQ_API_KEY=your_groq_api_key
```

6. Start the FastAPI backend:

```bash
python -m uvicorn app.main:app --reload
```

The backend runs on `http://127.0.0.1:8000`.

FastAPI Swagger documentation is available at `http://127.0.0.1:8000/docs`.

## Frontend Setup

1. Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
```

2. Install frontend dependencies:

```bash
npm install
```

3. Start the Vite development server:

```bash
npm run dev
```

The frontend runs on `http://localhost:5173`.

## LangGraph AI Tools

The conversational AI assistant supports five CRM tools:

1. **Log Interaction** — Extracts interaction information from natural language and stores it in the CRM database.
2. **Edit Interaction** — Updates an existing HCP interaction.
3. **Search HCP** — Searches and retrieves HCP interaction history.
4. **Suggest Follow-up** — Generates practical follow-up recommendations based on interaction context.
5. **Summarize Interaction** — Converts unstructured field notes into a concise professional CRM summary.

## LLM Integration

The AI assistant uses Groq through LangChain with the `llama-3.3-70b-versatile` model.

LangGraph manages the agent workflow and tool execution for conversational CRM operations.

## Example AI Commands

```text
Log an interaction with Dr. Test Kumar. Meeting. Discussed oncology treatment options. Positive sentiment. Requested clinical materials.

Find interactions for Dr. Test Kumar.

Edit interaction 5. Change sentiment to neutral and change outcome to follow-up meeting required.

Suggest follow-up actions for Dr. Test Kumar.

Summarize: Met Dr. Test Kumar, discussed oncology treatment, positive interest, and requested clinical materials.
```

## Security

Sensitive configuration values such as the PostgreSQL database URL and Groq API key are stored using environment variables in a `.env` file.

The `.env` file is excluded from Git version control and API keys are not committed to the repository.

## Author

**Priyadharshini R**