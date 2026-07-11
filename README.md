# AI-First CRM - HCP Interaction Management

AI-first CRM for life-sciences field representatives to log and manage Healthcare Professional (HCP) interactions through a structured form or conversational AI.

## Features

- Structured HCP interaction form
- Conversational AI assistant
- Log and edit interactions
- Search HCP interaction history
- AI follow-up suggestions
- Interaction summarization
- PostgreSQL persistence

## Tech Stack

**Frontend:** React, Vite, Redux Toolkit, Material UI, Axios, Google Inter Font.

**Backend:** Python, FastAPI, SQLAlchemy, PostgreSQL, LangGraph, LangChain, Groq LLM.

## LangGraph Agent Tools

The LangGraph agent interprets natural-language CRM requests and routes them to five sales tools:

1. **Log Interaction** - extracts details and stores the interaction.
2. **Edit Interaction** - modifies an existing interaction.
3. **Search HCP** - retrieves HCP interaction history.
4. **Suggest Follow-up** - recommends practical sales follow-up actions.
5. **Summarize Interaction** - converts field notes into a professional CRM summary.

The AI assistant uses Groq with `llama-3.3-70b-versatile`. LangGraph manages tool selection and execution.

## Project Structure

- `frontend/` - React UI, Redux state, form, chat panel, and API integration.
- `backend/` - FastAPI routes, LangGraph agent/tools, database models, schemas, and services.

## Prerequisites

Install Node.js and npm, Python 3, PostgreSQL, and Git. Create a Groq API key.

## Run the Backend

1. Open a terminal and run:

    cd backend
    python -m venv .venv
    .venv\Scripts\activate
    pip install -r requirements.txt

2. Create `backend/.env` with:

    APP_NAME=AI First CRM API
    API_VERSION=1.0.0
    HOST=127.0.0.1
    PORT=8000
    FRONTEND_URL=http://localhost:5173
    DATABASE_URL=your_postgresql_database_url
    GROQ_API_KEY=your_groq_api_key

3. Start FastAPI:

    python -m uvicorn app.main:app --reload

Backend: `http://127.0.0.1:8000`  
Swagger: `http://127.0.0.1:8000/docs`

## Run the Frontend

Open a new terminal and run:

    cd frontend
    npm install
    npm run dev

Frontend: `http://localhost:5173`

## Example AI Commands

- Log an interaction with Dr. Test Kumar. Meeting. Discussed oncology treatment options. Positive sentiment. Requested clinical materials.
- Find interactions for Dr. Test Kumar.
- Edit interaction 5. Change sentiment to neutral and the outcome to follow-up meeting required.
- Suggest folow-up actions for Dr. Test Kumar.
- Summarize the interaction with Dr. Test Kumar.

## Security

Store `DATABASE_URL` and `GROQ_API_KEY` in `backend/.env`. The `.env` file is excluded from Git and credentials must not be committed.

## Author

Priyadharshini R
