# 🌦 Weather Agent

An AI-powered conversational weather agent that provides current weather information and forecasts through a web-based chat interface.

The application combines **FastAPI, LangGraph, Gemini, MongoDB, React/Vite, and browser-based speech recognition** to provide a conversational weather assistant with persistent conversations.

## 🚀 Live Demo

**Frontend:**  
https://weather-agent-ui.onrender.com/

**Backend API:**  
https://weather-agent-wt9u.onrender.com/

**API Documentation:**  
https://weather-agent-wt9u.onrender.com/docs

---

## ✨ Features

- 🌤️ Conversational weather assistant
- 📍 Current weather and forecast information
- 🤖 Gemini-powered AI responses
- 🧠 LangGraph-based agent workflow
- 💾 Persistent conversation state using MongoDB
- 🧵 Thread-based conversations
- 📝 Markdown-rendered AI responses
- 🎤 Voice input using the browser Speech Recognition API
- 🇮🇳 English and Telugu voice input
- ⌨️ Traditional text input
- 🔄 Automatic GitHub → Render deployments
- 🌐 REST API built with FastAPI
- 📱 Responsive React frontend

---

## 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │     React / Vite     │
                    │    Static Frontend   │
                    └──────────┬───────────┘
                               │
                    Text / Voice Input
                               │
                               ▼
                    ┌──────────────────────┐
                    │      FastAPI         │
                    │      Backend         │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      LangGraph       │
                    │    Weather Agent     │
                    └──────────┬───────────┘
                               │
                    ┌──────────┴───────────┐
                    │                      │
                    ▼                      ▼
              ┌───────────┐         ┌────────────┐
              │  Gemini   │         │ OpenWeather│
              │    LLM    │         │    API     │
              └───────────┘         └────────────┘
                    │
                    ▼
              ┌─────────────┐
              │  MongoDB    │
              │ Checkpointer│
              └─────────────┘
```

---

## 🎤 Voice Input

The frontend supports voice input using the browser's built-in Speech Recognition API.

```text
🎤 Microphone
      ↓
Browser Speech Recognition
      ↓
Text
      ↓
Chat Input
      ↓
FastAPI /chat
      ↓
LangGraph
```

Supported languages:

- English (`en-IN`)
- Telugu (`te-IN`)

The recognized speech is inserted into the chat input, allowing the user to review or edit it before sending.

> Voice recognition availability depends on browser support. Chromium-based browsers such as Google Chrome are recommended.

---

## 🧵 Conversation Management

Each conversation uses a `thread_id`.

The first request creates a thread ID on the backend.

The frontend stores the returned `thread_id` in browser local storage and sends it with subsequent requests.

```text
First request
    ↓
Backend generates thread_id
    ↓
Frontend stores thread_id
    ↓
Future requests reuse same thread_id
    ↓
MongoDB checkpoint
    ↓
Conversation continues
```

The agent limits the conversation history passed to the model while preserving the persistent checkpoint history.

---

## 🛠️ Tech Stack

### Backend

- Python
- FastAPI
- Uvicorn
- LangGraph
- LangChain
- Gemini
- OpenWeather API
- MongoDB Atlas
- PyMongo

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- Axios
- React Markdown
- Remark GFM
- Browser Speech Recognition API

### Database

- MongoDB Atlas
- LangGraph MongoDB Checkpointer

### Deployment

- GitHub
- Render

---

## 📁 Project Structure

```text
weather_agent/
│
├── app/
│   ├── config.py
│   ├── main.py
│   │
│   ├── database/
│   │   ├── mongodb.py
│   │   └── checkpoint.py
│   │
│   ├── graph/
│   │   ├── graph.py
│   │   ├── llm.py
│   │   └── tools.py
│   │
│   ├── routes/
│   │   └── chat.py
│   │
│   └── schemas/
│       └── chat.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatContainer.jsx
│   │   │   ├── ChatInput.jsx
│   │   │   ├── ChatMessage.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── render.yaml
├── requirements.txt
└── README.md
```

---

## ⚙️ Requirements

### Backend

- Python 3.11+
- pip
- MongoDB Atlas account
- Gemini API key
- OpenWeather API key

### Frontend

- Node.js
- npm

---

## 🔑 Environment Variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
OPEN_WEATHER_API_KEY=your_openweather_api_key
MONGODB_URI=your_mongodb_connection_string
```

Do **not** commit `.env` to GitHub.

The `.gitignore` should contain:

```gitignore
.env
.venv/
__pycache__/
frontend/node_modules/
frontend/dist/
```

---

## 💻 Local Development

### 1. Clone the repository

```bash
git clone https://github.com/mcsr14724/weather_agent.git
cd weather_agent
```

### 2. Create a Python virtual environment

```bash
python -m venv .venv
```

### Windows PowerShell

```powershell
.\.venv\Scripts\Activate.ps1
```

### macOS / Linux

```bash
source .venv/bin/activate
```

### 3. Install backend dependencies

```bash
pip install -r requirements.txt
```

### 4. Start the FastAPI backend

```bash
uvicorn app.main:app --reload
```

Backend:

```text
http://localhost:8000
```

API documentation:

```text
http://localhost:8000/docs
```

---

## 🎨 Start the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🔌 API

### Chat

```http
POST /chat
```

Example request:

```json
{
  "message": "What is the weather in Karalapadu?"
}
```

For an existing conversation:

```json
{
  "message": "What about tomorrow?",
  "thread_id": "existing-thread-id"
}
```

Example response:

```json
{
  "response": "## Current Weather\n\nThe weather in Karalapadu is...",
  "thread_id": "generated-thread-id"
}
```

---

## 🧠 Agent Workflow

The application uses LangGraph to manage the conversational agent.

The general workflow is:

```text
User Message
     ↓
LangGraph
     ↓
LLM
     ↓
Weather Tool (when required)
     ↓
Weather Data
     ↓
LLM
     ↓
Formatted Response
     ↓
Frontend
```

The agent can use weather information to answer questions about current conditions and forecasts.

---

## 💾 Persistent Memory

MongoDB is used with the LangGraph MongoDB checkpointer.

This allows conversations to persist between requests using the `thread_id`.

```text
User
 ↓
thread_id
 ↓
LangGraph
 ↓
MongoDB Checkpointer
 ↓
Conversation State
```

The application keeps the persistent checkpoint history while limiting the amount of previous conversation sent to the LLM to help control context size.

---

## 📝 Markdown Responses

AI responses are rendered using:

- `react-markdown`
- `remark-gfm`

This allows responses containing:

- **Bold text**
- *Italic text*
- Headings
- Bullet lists
- Numbered lists
- Code blocks
- Tables
- Links

to be displayed properly in the chat interface.

---

## ☁️ Deployment

The application is deployed using Render.

### Backend

The FastAPI backend is deployed as a Render Web Service.

Start command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Required environment variables:

```text
GEMINI_API_KEY
OPEN_WEATHER_API_KEY
MONGODB_URI
```

### Frontend

The React application is deployed as a Render Static Site.

Build command:

```bash
npm install
npm run build
```

Publish directory:

```text
dist
```

The frontend uses:

```text
VITE_API_URL
```

to communicate with the deployed backend.

---

## 🔄 Continuous Deployment

The project is connected to GitHub and Render.

After pushing changes:

```bash
git add .
git commit -m "Your change"
git push origin main
```

Render automatically deploys the updated service when Auto Deploy is enabled.

---

## 🧪 Testing

Run backend tests:

```bash
pytest
```

Run the frontend locally:

```bash
cd frontend
npm run dev
```

---

## 📌 Future Improvements

Potential improvements include:

- 🔊 Text-to-speech responses
- ⚡ Streaming AI responses
- 🌦️ Rich weather cards
- 📊 Weather charts
- 📍 Browser geolocation
- 🗑️ New conversation button
- 📜 Conversation history UI
- 📱 Improved mobile interface
- 🔐 Authentication and user accounts
- 🌐 Additional language support

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch:

```bash
git checkout -b feature/your-feature
```

3. Make your changes.
4. Commit:

```bash
git commit -m "Add your feature"
```

5. Push:

```bash
git push origin feature/your-feature
```

6. Open a pull request.

---

## 👨‍💻 Maintainer

**mcsr14724**

GitHub:

https://github.com/mcsr14724/weather_agent

---

## 🌐 Live Application

https://weather-agent-ui.onrender.com/
