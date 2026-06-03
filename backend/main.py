import random
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import json
import os
from datetime import datetime

app = FastAPI(
    title="Dev Portfolio API",
    description="Backend services for Renu Alias' developer portfolio",
    version="1.0.4"
)

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this. For local development, allow all.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CONTACT_FILE = os.path.join(os.path.dirname(__file__), "contact_messages.json")

class ContactMessage(BaseModel):
    name: str = Field(..., max_length=100)
    email: str = Field(..., max_length=150)
    message: str = Field(..., max_length=2000)

@app.get("/api/profile")
def get_profile():
    return {
        "name": "Renu_Alias",
        "location": "Kochi",
        "status": "Open_to_Collaborate",
        "primary_stack": "Python, JavaScript, C",
        "role": "System Engineer & Full-Stack Architect",
        "bio": (
            "System Engineer & Full-Stack Architect specialized in building "
            "high-performance distributed systems. Focused on code purity, "
            "architectural integrity, and creating tools that empower other developers."
        )
    }

@app.get("/api/projects")
def get_projects():
    return [
        {
            "id": "00",
            "code": "PROJECT_OMNITHREAD",
            "title": "High-Concurrency Data Engine",
            "description": (
                "A custom runtime built in Rust to handle millions of simultaneous "
                "websocket connections with sub-millisecond latency. Features an ASCII "
                "dashboard for real-time monitoring."
            ),
            "tags": ["Rust", "Tokio", "gRPC"],
            "url": "https://github.com/alexreed/omnithread"
        },
        {
            "id": "01",
            "code": "VIRTUAL_ENV",
            "title": "Terminal-UI Kit",
            "description": (
                "React component library for building developer-focused interfaces "
                "with built-in command palette."
            ),
            "tags": ["React", "TypeScript", "Monospace"],
            "url": "https://github.com/alexreed/terminal-ui"
        }
    ]

@app.get("/api/skills")
def get_skills():
    return {
        "languages": ["Python", "C", "C++", "JavaScript", "Java","Dart"],
        "infrastructure": ["AWS"],
        "databases": ["PostgreSQL", "Redis", "MySQL","SQLite","MongoDB"],
        #"protocols": ["gRPC", "HTTP/3", "WebSocket", "MQTT"]
    }

@app.get("/api/health")
def get_health():
    # Simulate slight fluctuation on real-time server health metrics
    return {
        "backend_perf": random.randint(96, 99),
        "ui_arch": random.randint(84, 87),
        "ops_automation": random.randint(90, 93)
    }

@app.post("/api/contact")
def post_contact(msg: ContactMessage):
    # Save the message to a local json file as a simulation of a database
    messages = []
    if os.path.exists(CONTACT_FILE):
        try:
            with open(CONTACT_FILE, "r") as f:
                messages = json.load(f)
        except Exception:
            messages = []
            
    new_msg = {
        "timestamp": datetime.utcnow().isoformat(),
        "name": msg.name,
        "email": msg.email,
        "message": msg.message
    }
    messages.append(new_msg)
    
    try:
        with open(CONTACT_FILE, "w") as f:
            json.dump(messages, f, indent=4)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to record message: {str(e)}")
        
    return {"status": "SUCCESS", "message": "Message recorded in contact_messages.json."}

@app.get("/api/git-push-logs")
def get_git_push_logs():
    # Return simulated logs for the deployment pipeline trigger
    return [
        "Initializing deployment pipeline for origin/main...",
        "[1/4] Resolving workspace lock and packages...",
        "  -> cargo check --release (success in 1.4s)",
        "  -> npm run lint --workspace=frontend (success in 0.8s)",
        "[2/4] Executing test suite...",
        "  -> Running kernel thread pool tests (12 passed, 0 failed)",
        "  -> Running atomic pointer safety regression suite (passed)",
        "[3/4] Compiling assets & minification...",
        "  -> Building production bundles with vite compiler",
        "  -> Asset sizes optimized, total footprint: 456KB",
        "[4/4] Synchronizing artifacts to edge CDN...",
        "  -> Pushing build: 7f3a1c9",
        "  -> Invalidating Edge CDN caches...",
        "DEPLOYMENT COMPLETE: origin/main is now live!",
        "System performance nominal. Build hash verified: 7f3a1c9."
    ]
