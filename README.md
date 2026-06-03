# 📟 Renu Alias - Retro Terminal Portfolio

A high-fidelity, interactive developer portfolio styled as a retro, hardware-inspired Zsh terminal interface. It features real-time performance indicators, simulated SSH data pipelines, and a command-line interface.

```
   .-.      renu@alias-server
  (o o)     ----------------
  | O |     OS: RustOS x86_64
   \=/      Kernel: 5.14.0-custom-concurrency
  /   \     Uptime: 456 days, 2 hours, 12 mins
 //| |\     Shell: zsh 5.8
// |_| \\   Resolution: 1920x1080 (CRT Mode)
            Terminal: Terminal-UI Kit v1.0.4
            CPU: Threadripper 3990X (128) @ 2.9GHz
            Memory: 48.2GB / 128.0GB
```

---

## 🚀 Features

- **Interactive Zsh Terminal UI**: A custom-built console mimicking a real Linux terminal with standard command parsing, shell history, autoscroll, and a glowing retro CRT filter.
- **Custom Terminal Commands**:
  - `help`: Lists all available commands.
  - `whoami`: Displays profile bio, stack, and active location.
  - `projects`: Lists active software engineering works fetched from the backend.
  - `skills`: Prints the technical skills inventory in a clean `.json` format.
  - `neofetch`: Renders custom system specs and a minimalist ASCII penguin logo.
  - `contact`: Redirects focus to the secure SSH transmission portal.
  - `clear`: Wipes command history.
- **Live Feed System Diagnostics**: Visual dashboard monitoring real-time performance statistics, connection status indicators, and simulated deployment pipeline git logs.
- **FastAPI-Backed REST API**: Robust backend managing dynamic portfolio data endpoints and routing client message payloads to local storage.
- **Secure Handshake Contact Portal**: A retro modal dialogue replicating an SSH terminal connection (`ssh://renu_alias@contact`) to accept, parse, and store client transmissions.

---

## 🛠️ Tech Stack

### Frontend (User Interface)
- **Framework**: React 19 (Vite)
- **Styling**: Modern CSS with HSL variables, glassmorphism overlays, custom keyframe scanline animations, and terminal prompt styling.
- **Components**: Reusable, monospace developer-focused UI widgets.

### Backend (API Services)
- **Framework**: FastAPI (Python)
- **Server**: Uvicorn ASGI
- **Data Persistence**: Local JSON messaging buffer (`contact_messages.json`)

---

## 📂 Repository Structure

```
.
├── backend/
│   ├── .venv/                   # Python virtual environment
│   ├── main.py                  # FastAPI server entry point
│   ├── contact_messages.json    # Local database (simulated contact submissions)
│   └── requirements.txt         # Backend Python dependencies
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Terminal.jsx     # Shell interface component & command parser
    │   │   └── ContactModal.jsx # ssh:// connection message portal modal
    │   ├── App.jsx              # Application shell & performance HUD layout
    │   ├── main.jsx             # React entry point
    │   └── index.css            # Retro neon styling and scanline animation rules
    ├── index.html               # Main HTML document & metadata definition
    └── vite.config.js           # Vite development server & reverse proxy config
```

---

## 💿 Setup & Execution

### 1. Backend Server Setup
Navigate to the `backend` directory and ensure Python 3.8+ is installed.

```bash
cd backend
# Activate the virtual environment
# On Windows (PowerShell):
.\.venv\Scripts\Activate.ps1
# On Linux/macOS:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Launch FastAPI development server (runs on http://localhost:8000)
uvicorn main:app --reload --port 8000
```

### 2. Frontend Server Setup
Navigate to the `frontend` directory, install packages, and boot the Vite development server.

```bash
cd frontend

# Install Node modules
npm install

# Launch Vite server (runs on http://localhost:5173 with proxy configuration)
npm run dev
```

### 3. Build for Production
To build optimize production-ready assets:
```bash
cd frontend
npm run build
```

---

## 📡 API Endpoints

- **`GET /api/profile`**: Returns Renu Alias' current developer bio, stack, and status metrics.
- **`GET /api/projects`**: Fetches details for core open-source projects including GitHub URLs.
- **`GET /api/skills`**: Retrieves lists of programming languages, tools, frameworks, and databases.
- **`GET /api/git-push-logs`**: Simulates deployment step output for CI/CD visualization.
- **`POST /api/contact`**: Receives transmission payload packets and logs them into `contact_messages.json`.

---

## 👤 Author

**Renu Alias**
- **Location**: Kochi, Kerala, India
- **Status**: Open to Collaborate
