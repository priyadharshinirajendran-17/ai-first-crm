# AI-First CRM -- HCP Interaction Management

AI-First CRM is a Healthcare Professional (HCP) interaction management
application designed for life-sciences field representatives. The
application supports both a structured form and a conversational AI
assistant for logging and managing HCP interactions.

## Features

-   Structured HCP interaction logging form
-   Conversational AI assistant
-   Log and edit HCP interactions
-   Search HCP interaction history
-   AI-generated follow-up suggestions
-   Professional interaction summarization
-   Materials and samples tracking
-   Sentiment and outcome recording
-   PostgreSQL database integration

## Tech Stack

### Frontend

-   React.js
-   Vite
-   Redux Toolkit
-   Material UI
-   Axios
-   Google Inter Font

### Backend

-   Python
-   FastAPI
-   SQLAlchemy
-   PostgreSQL
-   LangGraph
-   LangChain
-   Groq LLM

## LangGraph AI Agent and Tools

The LangGraph agent manages conversational HCP interaction workflows. It
interprets natural-language requests and routes them to CRM tools.

1.  **Log Interaction** -- Extracts interaction details from natural
    language and stores them in the CRM database.
2.  **Edit Interaction** -- Modifies an existing logged interaction.
3.  **Search HCP** -- Searches and retrieves HCP interaction history.
4.  **Suggest Follow-up** -- Recommends practical sales follow-up
    actions based on interaction context.
5.  **Summarize Interaction** -- Converts unstructured field notes into
    a concise professional CRM summary.

## LLM Integration

The AI assistant uses Groq through LangChain with the
`llama-3.3-70b-versatile` model. LangGraph manages agent workflow and
tool execution.

## Project Structure

``` text
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
└── README.md
```

## Prerequisites

Install Node.js and npm, Python 3, PostgreSQL, and Git. A Groq API key
is required for conversational AI functionality.

## Backend Setup

1.  Navigate to the backend folder:

``` bash
cd backend
```

2.  Create and activate a virtual environment on Windows:

``` bash
python -m venv .venv
.venv\Scripts\activate
```

3.  Install dependencies:

``` bash
pip install -r requirements.txt
```

4.  Create a `.env` file inside the `backend` folder:

``` env
APP_NAME=AI First CRM API
API_VERSION=1.0.0
HOST=127.0.0.1
PORT=8000
FRONTEND_URL=http://localhost:5173
DATABASE_URL=your_postgresql_database_url
GROQ_API_KEY=your_groq_api_key
```

5.  Start the backend:

``` bash
python -m uvicorn app.main:app --reload
```

The backend runs on `http://127.0.0.1:8000`. Swagger documentation is
available at `http://127.0.0.1:8000/docs`.

## Frontend Setup

1.  Navigate to the frontend folder:

``` bash
cd frontend
```

2.  Install dependencies and start Vite:

``` bash
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

## Example AI Commands

``` text
Log an interaction with Dr. Test Kumar. Meeting. Discussed oncology treatment options. Positive sentiment. Requested clinical materials.

Find interactions for Dr. Test Kumar.

Edit interaction 5. Change sentiment to neutral and change the outcome to follow-up meeting required.

Suggest follow-up actions for Dr. Test Kumar.

Summarize: Met Dr. Test Kumar, discussed oncology treatment, positive interest, and requested clinical materials.
```

## Security

Sensitive values such as the PostgreSQL database URL and Groq API key
are stored in a `.env` file. The `.env` file is excluded from Git
version control and credentials must not be committed.

## Author

**Priyadharshini R**
