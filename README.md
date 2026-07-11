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