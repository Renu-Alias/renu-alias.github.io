import random
import logging
import smtplib
import json
import os
from email.message import EmailMessage
from pathlib import Path
from datetime import datetime

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

load_dotenv(Path(__file__).parent / ".env")

AUTHOR_EMAIL = os.getenv("AUTHOR_EMAIL", "renualiasmeleth@gmail.com")

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


def _build_email_message(msg: ContactMessage) -> EmailMessage:
    receiver = os.getenv("RECEIVER_EMAIL", AUTHOR_EMAIL)
    smtp_user = os.getenv("SMTP_USER", AUTHOR_EMAIL)

    email_msg = EmailMessage()
    email_msg["Subject"] = f"Portfolio contact from {msg.name}"
    email_msg["From"] = smtp_user
    email_msg["To"] = receiver
    email_msg["Reply-To"] = msg.email
    email_msg.set_content(
        f"Name: {msg.name}\n"
        f"Email: {msg.email}\n"
        f"Message:\n{msg.message}\n\n"
        f"Timestamp: {datetime.utcnow().isoformat()} UTC"
    )
    return email_msg


def send_via_smtp(msg: ContactMessage) -> bool:
    smtp_password = os.getenv("SMTP_PASSWORD")
    if not smtp_password:
        return False

    smtp_user = os.getenv("SMTP_USER", AUTHOR_EMAIL)
    email_msg = _build_email_message(msg)

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, timeout=20) as server:
            server.login(smtp_user, smtp_password)
            server.send_message(email_msg)
        return True
    except Exception as ssl_err:
        logging.warning("SMTP SSL failed, trying STARTTLS: %s", ssl_err)

    with smtplib.SMTP(os.getenv("SMTP_SERVER", "smtp.gmail.com"), int(os.getenv("SMTP_PORT", "587")), timeout=20) as server:
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.send_message(email_msg)
    return True


def send_contact_email(msg: ContactMessage) -> bool:
    """Send via Gmail SMTP when SMTP_PASSWORD is set in backend/.env."""
    if not os.getenv("SMTP_PASSWORD"):
        return False
    try:
        return send_via_smtp(msg)
    except Exception as smtp_err:
        logging.error("SMTP delivery failed: %s", smtp_err)
        return False


@app.get("/api/contact/info")
def get_contact_info():
    return {"author_email": AUTHOR_EMAIL}


@app.get("/api/profile")
def get_profile():
    return {
        "name": "Renu_Alias",
        "location": "Kochi, Kerala, India",
        "status": "Open_to_Collaborate",
        "primary_stack": "Python, JavaScript, C",
        "github": "https://github.com/Renu-Alias",
        "linkedin": "https://linkedin.com/in/renu-alias-0022a2329/",
        "role": "System Engineer & Full-Stack Architect",
        "bio": (
            "AI Automation Engineer and Full-Stack Architect with expertise in "
            "designing and building high-performance systems."
        ),
        "education": [
            {
                "title": "Bachelor of Technology (B.Tech) in Computer Science & Engineering",
                "period": "2024 – 2028",
                "institution": "APJ Abdul Kalam Technological University (KTU)",
                "details": None
            },
            {
                "title": "Higher Secondary Education (Science Stream – PCM)",
                "period": "2022 – 2024",
                "institution": "Central Board of Secondary Education (CBSE)",
                "details": "Physics • Chemistry • Mathematics"
            }
        ]
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
            "url": "https://github.com/renualias/omnithread"
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
            "url": "https://github.com/renualias/terminal-ui"
        },
        {
            "id": "02",
            "code": "EDGE_DEPLOY",
            "title": "Edge CI/CD Observability",
            "description": (
                "A cross-platform deployment dashboard that automates staging and "
                "production rollouts while surfacing real-time telemetry."
            ),
            "tags": ["Docker", "Kubernetes", "CI/CD"],
            "url": "https://github.com/renualias/edge-deploy"
        }
    ]

@app.get("/api/skills")
def get_skills():
    return {
        "languages": ["Python", "C", "C++", "JavaScript", "Java","Dart"],
        "frameworks": ["Flutter","Node.js","Express.js"],
        "tools_&_design":["Linux","Git","GitHub","Canva","Figma"],
        "infrastructure": ["AWS","Claude"],
        "databases": ["PostgreSQL", "SQL*Plus", "MySQL","MongoDB"],
        "soft_skills": ["leadership", "collaboration", "adaptability", "problem-solving"]
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

    email_sent = send_contact_email(msg)

    return {
        "status": "SUCCESS",
        "email_sent": email_sent,
        "author_email": AUTHOR_EMAIL,
        "message": (
            f"Your message was delivered to {AUTHOR_EMAIL}."
            if email_sent
            else "Message saved. Completing email delivery…"
        ),
    }

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
