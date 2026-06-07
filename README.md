# Renu Alias - Retro Terminal Portfolio

A high-fidelity, interactive developer portfolio styled as a retro terminal interface. Features a fixed sidebar file explorer, live system diagnostics, simulated git push logs, and a FastAPI backend for dynamic content.

---

## Features

- **Fixed Sidebar Explorer**: File-tree sidebar navigation with section highlighting, toggle minimize, git push simulation, and a contact icon.
- **Interactive Terminal (`whoami`)**: Displays a bio card with photo, `whoami` command output, system load bars, and neofetch-style ASCII art.
- **Live Feed Diagnostics**: Animated performance indicators (RAM, CPU, Uptime, Latency).
- **Projects Section**: Repository-style cards with tags and external links.
- **Certifications**: Certifications and achievements displayed in a grid.
- **Skills JSON Grid**: Tech skills displayed as JSON arrays (languages, frameworks, tools, databases, etc.) with a health-monitor widget.
- **Contact Modal**: SSH-themed contact form that submits via the API.
- **Git Push Overlay**: Simulated deployment pipeline log output.
- **Responsive Layout**: Fixed sidebar on desktop, narrower sidebar on tablets/phones, horizontal-scroll navbar on small screens.

---

## Tech Stack

### Frontend (User Interface)
- **Framework**: React 19 (Vite)
- **Styling**: CSS with HSL variables, monospace retro terminal styling

### Backend (API Services)
- **Framework**: FastAPI (Python)
- **Server**: Uvicorn ASGI
- **Data Persistence**: Local JSON messaging buffer (`contact_messages.json`)

---

## Repository Structure

```
.
├── backend/
│   ├── main.py                  # FastAPI server entry point
│   ├── contact_messages.json    # Local contact submissions storage
│   └── requirements.txt         # Backend Python dependencies
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Terminal.jsx     # whoami card, system load, neofetch
    │   │   ├── Sidebar.jsx      # Fixed file-tree sidebar
    │   │   ├── Projects.jsx     # Project repository cards
    │   │   ├── SkillsHealth.jsx # Skills JSON grid + health monitor
    │   │   ├── Certifications.jsx
    │   │   ├── ContactModal.jsx # SSH-themed contact form
    │   │   ├── GitPushOverlay.jsx # Simulated git push logs
    │   │   └── SystemLogs.jsx   # Live feed diagnostics
    │   ├── App.jsx              # Main layout shell
    │   ├── App.css
    │   ├── config.js            # API base URL config
    │   ├── index.css            # All styling
    │   └── main.jsx             # React entry point
    ├── .env.example             # VITE_API_URL template
    ├── index.html
    └── vite.config.js           # Dev proxy for /api -> localhost:8000
```

---

## Setup & Execution

### 1. Backend Server Setup

```bash
cd backend
# Activate virtual environment
# Windows (PowerShell):
.\.venv\Scripts\Activate.ps1
# Linux/macOS:
source .venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 2. Frontend Server Setup

```bash
cd frontend
npm install
cp .env.example .env  # or set VITE_API_URL in Netlify dashboard
npm run dev
```

### 3. Build for Production

```bash
cd frontend
npm run build
```

---

## API Endpoints

- **`GET /api/profile`** — Returns developer bio, stack, and status metrics
- **`GET /api/projects`** — Fetches open-source project details including GitHub URLs
- **`GET /api/skills`** — Retrieves languages, tools, frameworks, databases
- **`GET /api/git-push-logs`** — Simulated CI/CD deployment output
- **`POST /api/contact`** — Receives contact messages and persists to `contact_messages.json`

---

## Author

**Renu Alias**
- **Location**: Kochi, Kerala, India
- **Status**: Open to Collaborate
