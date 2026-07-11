# AI-First CRM – HCP Interaction Management

AI-First CRM is a Healthcare Professional interaction management application designed for life-sciences field representatives.

The application allows representatives to log and manage HCP interactions using either a structured form or a conversational AI assistant.

## Features

- Structured HCP interaction logging form
- Conversational AI assistant
- Log interactions using natural language
- Edit existing interaction records
- Search HCP interaction history
- Generate AI follow-up suggestions
- Summarize unstructured interaction notes
- Track materials and samples
- Record sentiment and outcomes
- PostgreSQL database integration

## Tech Stack

### Frontend

React.js, Vite, Redux Toolkit, Material UI, Axios and Google Inter Font.

### Backend

Python, FastAPI, SQLAlchemy, PostgreSQL, LangGraph, LangChain and Groq LLM.

## LangGraph AI Agent

The LangGraph agent interprets conversational CRM requests and routes them to the appropriate sales tool.

The five LangGraph tools are:

1. Log Interaction – Extracts interaction details and stores them in the CRM database.
2. Edit Interaction – Modifies an existing logged interaction.
3. Search HCP – Searches and retrieves HCP interaction history.
4. Suggest Follow-up – Recommends practical sales follow-up actions.
5. Summarize Interaction – Converts unstructured notes into a professional CRM summary.

## LLM Integration

The AI assistant uses Groq through LangChain with the llama-3.3-70b-versatile model.

LangGraph manages tool selection, workflow and tool execution.

## Project Structure

The frontend folder contains the React UI, Redux state management, interaction form, AI chat panel and API integration.

The backend folder contains FastAPI routes, LangGraph agents and tools, SQLAlchemy database models, schemas and services.

## Prerequisites

Install Node.js and npm, Python 3, PostgreSQL and Git.

A Groq API key is required for AI assistant functionality.

## How to Run the Backend

1. Navigate to the backend folder.

Command: cd backend

2. Create a virtual environment.

Command: python -m venv .venv

3. Activate the virtual environment on Windows.

Command: .venv\Scripts\activate

4. Install backend dependencies.

Command: pip install -r requirements.txt

5. Create a .env file inside the backend folder.

Add DATABASE_URL with your PostgreSQL database URL.

Add GROQ_API_KEY with your Groq API key.

Add FRONTEND_URL with your frontend local address.

6. Start the FastAPI backend.

Command: python -m uvicorn app.main:app --reload

FastAPI Swagger documentation is available from the backend docs endpoint.

## How to Run the Frontend

1. Open a new terminal.

2. Navigate to the frontend folder.

Command: cd frontend

3. Install dependencies.

Command: npm install

4. Start the Vite development server.

Command: npm run dev

Open the local Vite frontend address displayed in the terminal.

## Example AI Commands

Log an interaction with Dr. Test Kumar. Meeting. Discussed oncology treatment options. Positive sentiment. Requested clinical materials.

Find interactions for Dr. Test Kumar.

Edit interaction 5. Change sentiment to neutral and change the outcome to follow-up meeting required.

Suggest follow-up actions for Dr. Test Kumar.

Summarize the interaction with Dr. Test Kumar.

## Security

Sensitive values such as the PostgreSQL database URL and Groq API key are stored in a .env file.

The .env file is excluded from Git version control. API keys and database credentials must not be committed.

## Author

Priyadharshini R
