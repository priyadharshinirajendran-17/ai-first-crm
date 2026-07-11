# AI-First CRM – HCP Interaction Management

AI-First CRM is a Healthcare Professional (HCP) interaction management application designed for life-sciences field representatives.

The application allows users to log and manage HCP interactions through a structured form and a conversational AI assistant.

## Features

- Structured HCP interaction form
- Conversational AI assistant
- Log HCP interactions using natural language
- Edit existing interactions
- Search HCP interaction history
- Generate AI follow-up suggestions
- Summarize unstructured interaction notes
- Track materials and samples
- Record sentiment and outcomes
- PostgreSQL database integration

## Tech Stack

Frontend: React.js, Vite, Redux Toolkit, Material UI, Axios and Google Inter Font.

Backend: Python, FastAPI, SQLAlchemy, PostgreSQL, LangGraph, LangChain and Groq LLM.

## LangGraph AI Agent

The LangGraph agent manages conversational HCP interaction workflows.

It interprets natural-language requests and routes the request to the appropriate CRM tool.

The five LangGraph tools are:

1. Log Interaction - Extracts interaction details and stores them in the CRM database.
2. Edit Interaction - Modifies an existing logged interaction.
3. Search HCP - Searches and retrieves HCP interaction history.
4. Suggest Follow-up - Recommends practical sales follow-up actions.
5. Summarize Interaction - Converts unstructured notes into a professional CRM summary.

## LLM Integration

The AI assistant uses Groq through LangChain with the llama-3.3-70b-versatile model.

LangGraph manages agent workflow, tool selection and tool execution.

## Project Structure

The project contains two main applications.

Frontend contains the React UI, interaction form, AI chat panel, Redux state management and API integration.

Backend contains FastAPI routes, LangGraph agents and tools, SQLAlchemy database models, schemas and services.

## Prerequisites

Install Node.js and npm, Python 3, PostgreSQL and Git.

A Groq API key is required for conversational AI functionality.

## How to Run the Backend

Open a terminal and navigate to the backend folder.

Command: cd backend

Create a virtual environment.

Command: python -m venv .venv

Activate the virtual environment on Windows.

Command: .venv\Scripts\activate

Install backend dependencies.

Command: pip install -r requirements.txt

Create a .env file inside the backend folder.

Add the following environment variables:

APP_NAME=AI First CRM API

API_VERSION=1.0.0

HOST=127.0.0.1

PORT=8000

FRONTEND_URL=http://localhost:5173

DATABASE_URL=your_postgresql_database_url

GROQ_API_KEY=your_groq_api_key

Start the FastAPI backend.

Command: python -m uvicorn app.main:app --reload

The backend runs locally on http://127.0.0.1:8000

Swagger API documentation is available at http://127.0.0.1:8000/docs

## How to Run the Frontend

Open a new terminal and navigate to the frontend folder.

Command: cd frontend

Install frontend dependencies.

Command: npm install

Start the Vite development server.

Command: npm run dev

The frontend runs locally on http://localhost:5173

## Example AI Commands

Log an interaction with Dr. Test Kumar. Meeting. Discussed oncology treatment options. Positive sentiment. Requested clinical materials.

Find interactions for Dr. Test Kumar.

Edit interaction 5. Change sentiment to neutral and change the outcome to follow-up meeting required.

Suggest follow-up actions for Dr. Test Kumar.

Summarize the interaction with Dr. Test Kumar.

## Security

Sensitive values such as the PostgreSQL database URL and Groq API key are stored in a .env file.

The .env file is excluded from Git version control. API keys and database credentials must not be committed to the repository.

## Author

Priyadharshini R