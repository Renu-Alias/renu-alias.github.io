import { useState, useEffect, useRef } from 'react';
import profilePhoto from '../assets/me.jpeg';

const GITHUB_URL = 'https://github.com/Renu-Alias';
const LINKEDIN_URL = 'https://linkedin.com/in/renu-alias-0022a2329/';

export default function Terminal({ profileData, onContactClick }) {
  const [history, setHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const terminalScrollRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll only within the terminal shell, not the whole page
  useEffect(() => {
    const scrollEl = terminalScrollRef.current;
    if (scrollEl) {
      scrollEl.scrollTop = scrollEl.scrollHeight;
    }
  }, [history]);

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = inputValue.trim();
      if (!cmd) return;

      const newHistory = [...history, { type: 'input', text: `➜ ~/portfolio ${cmd}` }];
      const cmdLower = cmd.toLowerCase();

      let reply;
      if (cmdLower === 'help') {
        reply = `Available commands:
  whoami    - Display engineer profile summary
  projects  - List active software engineering works
  skills    - Print technical skills inventory (.json format)
  contact   - Launch secure communication form
  neofetch  - Render system information and logo
  clear     - Wipe shell logs`;
      } else if (cmdLower === 'clear') {
        setHistory([]);
        setInputValue('');
        return;
      } else if (cmdLower === 'whoami') {
        reply = `[NAME]: Renu_Alias
[LOCATION]: Kochi, Kerala, India
[STATUS]: Open_to_Collaborate
[PRIMARY_STACK]: Python, JavaScript, C, Java
[GITHUB]: ${GITHUB_URL}
[LINKEDIN]: ${LINKEDIN_URL}

BIO: AI Automation Engineer and Full-Stack Architect with expertise in designing and building high-performance systems.

[EDUCATION]:
  - Bachelor of Technology (B.Tech) in Computer Science & Engineering
    2024 – 2028
    APJ Abdul Kalam Technological University (KTU)
  - Higher Secondary Education (Science Stream – PCM)
    2022 – 2024
    Central Board of Secondary Education (CBSE)
    Physics • Chemistry • Mathematics`;
      } else if (cmdLower === 'projects') {
        reply = `00. [CODESAGE] -> CodeSage
    AI-powered code analysis and tutoring platform for beginner programmers.
    Repo: https://github.com/Renu-Alias/CodeSage
    
 01. [SENTINEL] -> Sentinel
    Real-time automated piracy detection system with dual-mode fingerprinting.
    Repo: https://github.com/Renu-Alias/Sentinel
    
 02. [LITECPU16] -> LiteCPU16
    A minimal embedded single cycle RISC-V processor.
    Repo: https://github.com/Renu-Alias/LiteCPU16

 03. [HMS] -> HMS
    Hospital management system.
    Repo: https://github.com/Renu-Alias/HMS`;
      } else if (cmdLower === 'skills') {
        reply = `{
  "languages": ["Python", "C", "C++", "JavaScript", "Java","Dart"],
  "frameworks": ["Flutter","Node.js","Express.js"],
  "tools_&_design":["Linux","Git","GitHub","Canva","Figma"],
  "infrastructure": ["AWS","Claude"],
  "databases": ["PostgreSQL", "SQL*Plus", "MySQL","MongoDB"],
  "soft_skills": ["leadership", "collaboration", "adaptability", "problem-solving"]
}`;
      } else if (cmdLower === 'contact') {
        reply = `Redirecting shell to secure messaging module...`;
        setTimeout(() => {
          onContactClick();
        }, 800);
      } else if (cmdLower === 'neofetch') {
        reply = `   .-.      renu@alias-server
  (o o)     ----------------
  | O |     OS: RustOS x86_64
   \\=/      Kernel: 5.14.0-custom-concurrency
  /   \\     Uptime: 456 days, 2 hours, 12 mins
 //| |\\\\    Shell: zsh 5.8
// |_| \\\\   Resolution: 1920x1080 (CRT Mode)
            Terminal: Terminal-UI Kit v1.0.4
            CPU: Threadripper 3990X (128) @ 2.9GHz
            Memory: 48.2GB / 128.0GB`;
      } else {
        reply = `zsh: command not found: ${cmd}. Type 'help' for available commands.`;
      }

      setHistory([...newHistory, { type: 'output', text: reply }]);
      setInputValue('');
    }
  };

  return (
    <div className="terminal-window" onClick={handleTerminalClick}>
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <div className="terminal-title">zsh — 80x24</div>
      </div>

      <div className="terminal-body">
        {/* Live Feed Silhouette Avatar */}
        <div className="terminal-feed-col">
          <div className="live-feed-box">
            <button
              className="feed-photo-btn"
              type="button"
              aria-label="View profile picture"
              onClick={(event) => {
                event.stopPropagation();
                setIsPhotoOpen(true);
              }}
            >
              <img className="feed-photo-img" src={profilePhoto} alt="Renu Alias profile" />
            </button>
          </div>
          <div className="live-feed-label">LIVE_FEED</div>
        </div>

        {/* Console logs and Command Prompt */}
        <div className="terminal-content-col">
          <div className="term-prompt-line">
            <span className="term-arrow">➜</span>
            <span className="term-path">~/portfolio</span>
            <span className="term-cmd">whoami</span>
          </div>

          <p className="term-bio">
            {profileData?.bio || "AI Automation Engineer and Full-Stack Architect with expertise in designing and building high-performance systems."}
          </p>

          <div className="term-grid">
            <div className="term-grid-item">
              <span className="term-label">[NAME]:</span> <span className="term-val">{profileData?.name || "Renu_Alias"}</span>
            </div>
            <div className="term-grid-item">
              <span className="term-label">[LOCATION]:</span> <span className="term-val">{profileData?.location || "Kochi, Kerala, India"}</span>
            </div>
            <div className="term-grid-item">
              <span className="term-label">[STATUS]:</span> <span className="term-val" style={{ color: 'var(--accent-green)' }}>{profileData?.status || "Open_to_Collaborate"}</span>
            </div>
            <div className="term-grid-item">
              <span className="term-label">[PRIMARY_STACK]:</span> <span className="term-val">{Array.isArray(profileData?.primary_stack) ? profileData.primary_stack.join(", ") : (profileData?.primary_stack || "Python, JavaScript, C, Java")}</span>
            </div>
            <div className="term-grid-item">
              <span className="term-label">[GITHUB]:</span>{' '}
              <a
                className="term-val term-link"
                href={profileData?.github || GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
              >
                Renu-Alias
              </a>
            </div>
            <div className="term-grid-item">
              <span className="term-label">[LINKEDIN]:</span>{' '}
              <a
                className="term-val term-link"
                href={profileData?.linkedin || LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
              >
                renu-alias
              </a>
            </div>
          </div>

          {profileData?.education ? (
            <div style={{ marginTop: '16px' }}>
              <span className="term-label">[EDUCATION]:</span>
              <div style={{ marginLeft: '12px', marginTop: '6px', fontSize: '15px', lineHeight: '1.5' }}>
                {profileData.education.map((edu, idx) => (
                  <div key={idx} style={{ marginBottom: '12px' }}>
                    <div>• {edu.title}</div>
                    <div style={{ marginLeft: '12px', color: 'var(--text-muted)' }}>{edu.period}</div>
                    <div style={{ marginLeft: '12px', color: 'var(--text-muted)' }}>{edu.institution}</div>
                    {edu.details && (
                      <div style={{ marginLeft: '12px', color: 'var(--text-muted)' }}>{edu.details}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ marginTop: '16px' }}>
              <span className="term-label">[EDUCATION]:</span>
              <div style={{ marginLeft: '12px', marginTop: '6px', fontSize: '15px', lineHeight: '1.5' }}>
                <div style={{ marginBottom: '12px' }}>
                  <div>• Bachelor of Technology (B.Tech) in Computer Science & Engineering</div>
                  <div style={{ marginLeft: '12px', color: 'var(--text-muted)' }}>2024 – 2028</div>
                  <div style={{ marginLeft: '12px', color: 'var(--text-muted)' }}>APJ Abdul Kalam Technological University (KTU)</div>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <div>• Higher Secondary Education (Science Stream – PCM)</div>
                  <div style={{ marginLeft: '12px', color: 'var(--text-muted)' }}>2022 – 2024</div>
                  <div style={{ marginLeft: '12px', color: 'var(--text-muted)' }}>Central Board of Secondary Education (CBSE)</div>
                  <div style={{ marginLeft: '12px', color: 'var(--text-muted)' }}>Physics • Chemistry • Mathematics</div>
                </div>
              </div>
            </div>
          )}

          <div className="terminal-shell-scroll" ref={terminalScrollRef}>
            {/* Terminal History */}
            <div className="terminal-history">
              {history.map((log, idx) => (
                <div
                  key={idx}
                  className={log.type === 'input' ? 'term-prompt-line' : 'term-output-line'}
                  style={log.type === 'input' ? { marginTop: '8px' } : {}}
                >
                  {log.type === 'input' ? (
                    <>
                      <span className="term-arrow">➜</span>
                      <span className="term-path">~/portfolio</span>
                      <span className="term-cmd">{log.text.replace('➜ ~/portfolio ', '')}</span>
                    </>
                  ) : (
                    <pre style={{ fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>{log.text}</pre>
                  )}
                </div>
              ))}
            </div>

            {/* Dynamic input cursor line */}
            <div className="cursor-line">
              <span className="term-arrow">➜</span>
              <span className="term-path">~/portfolio</span>
              <input
                ref={inputRef}
                type="text"
                className="term-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                placeholder="type 'help' for commands..."
              />
              <span className="term-cursor" style={{ display: inputValue ? 'none' : 'inline-block' }}></span>
            </div>
          </div>
        </div>
      </div>

      {isPhotoOpen && (
        <div
          className="photo-viewer-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Profile picture viewer"
          onClick={(event) => {
            event.stopPropagation();
            setIsPhotoOpen(false);
          }}
        >
          <button
            className="photo-viewer-close"
            type="button"
            aria-label="Close profile picture viewer"
            onClick={(event) => {
              event.stopPropagation();
              setIsPhotoOpen(false);
            }}
          >
            ×
          </button>
          <img
            className="photo-viewer-image"
            src={profilePhoto}
            alt="Renu Alias profile enlarged"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
