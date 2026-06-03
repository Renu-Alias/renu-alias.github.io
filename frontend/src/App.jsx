import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Terminal from './components/Terminal';
import Projects from './components/Projects';
import SystemLogs from './components/SystemLogs';
import SkillsHealth from './components/SkillsHealth';
import GitPushOverlay from './components/GitPushOverlay';
import ContactModal from './components/ContactModal';

function App() {
  const [activeSection, setActiveSection] = useState('whoami');
  const [profileData, setProfileData] = useState(null);
  const [projectsData, setProjectsData] = useState([]);
  const [skillsData, setSkillsData] = useState(null);
  
  // Real-time ticking system parameters
  const [healthData, setHealthData] = useState({
    backend_perf: 98,
    ui_arch: 85,
    ops_automation: 92
  });
  const [currentTime, setCurrentTime] = useState('');
  
  // Modals / Overlay triggers
  const [isPushOpen, setIsPushOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Fetch initial profile/skills/projects info
  useEffect(() => {
    // 1. Profile info
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => setProfileData(data))
      .catch(err => console.error("Profile API unreachable, using default. Details: ", err));

    // 2. Projects info
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjectsData(data))
      .catch(err => console.error("Projects API unreachable. Details: ", err));

    // 3. Skills info
    fetch('/api/skills')
      .then(res => res.json())
      .then(data => setSkillsData(data))
      .catch(err => console.error("Skills API unreachable. Details: ", err));
  }, []);

  // Poll for fluctuating performance metrics mimicking active cloud server nodes
  useEffect(() => {
    const fetchHealth = () => {
      fetch('/api/health')
        .then(res => res.json())
        .then(data => {
          if (data) setHealthData(data);
        })
        .catch(err => {
          // If backend isn't up yet or network drops, slightly fluctuate locally to stay alive!
          setHealthData(prev => ({
            backend_perf: Math.min(100, Math.max(90, prev.backend_perf + (Math.random() > 0.5 ? 1 : -1))),
            ui_arch: Math.min(100, Math.max(80, prev.ui_arch + (Math.random() > 0.5 ? 1 : -1))),
            ops_automation: Math.min(100, Math.max(85, prev.ops_automation + (Math.random() > 0.5 ? 1 : -1)))
          }));
        });
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 3500);
    return () => clearInterval(interval);
  }, []);

  // Update clock footer every second matching visual timezone ticks
  useEffect(() => {
    const tickTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hrs}:${mins}:${secs}`);
    };

    tickTime();
    const clockInterval = setInterval(tickTime, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  // Scroll spy mechanism to auto-select sidebar file explorer nodes as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const mainEl = document.querySelector('.main-content');
      if (!mainEl) return;

      const scrollPos = mainEl.scrollTop + 180;
      
      const whoamiEl = document.getElementById('whoami-section');
      const projectsEl = document.getElementById('projects');
      const logsEl = document.getElementById('logs');
      const skillsEl = document.getElementById('skills');

      if (skillsEl && scrollPos >= skillsEl.offsetTop) {
        setActiveSection('skills');
      } else if (logsEl && scrollPos >= logsEl.offsetTop) {
        setActiveSection('logs');
      } else if (projectsEl && scrollPos >= projectsEl.offsetTop) {
        setActiveSection('projects');
      } else if (whoamiEl) {
        setActiveSection('whoami');
      }
    };

    const mainEl = document.querySelector('.main-content');
    if (mainEl) {
      mainEl.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (mainEl) mainEl.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Viewport navigation scroll trigger
  const handleNavigation = (id) => {
    setActiveSection(id);
    let targetId = '';
    
    if (id === 'whoami') targetId = 'whoami-section';
    else if (id === 'projects') targetId = 'projects';
    else if (id === 'logs') targetId = 'logs';
    else if (id === 'skills') targetId = 'skills';

    const targetEl = document.getElementById(targetId);
    const mainEl = document.querySelector('.main-content');
    if (targetEl && mainEl) {
      mainEl.scrollTo({
        top: targetEl.offsetTop - 30,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="app-container">
      {/* Visual scanline raster filter */}
      <div className="crt-effect"></div>

      {/* Navigation Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={handleNavigation}
        onPushClick={() => setIsPushOpen(true)}
        onContactClick={() => setIsContactOpen(true)}
      />

      {/* Main Terminal and Portfolios Dashboard Content */}
      <div className="main-content">
        {/* Navigation Navbar mimicking retro commands */}
        <header className="navbar">
          <ul className="nav-links">
            <li>
              <span className="nav-link" onClick={() => handleNavigation('whoami')}>~/portfolio/root</span>
            </li>
            <li>
              <span className="nav-link" onClick={() => handleNavigation('projects')}>cd /projects</span>
            </li>
            <li>
              <span className="nav-link" onClick={() => handleNavigation('skills')}>ls /skills</span>
            </li>
            <li>
              <span className="nav-link" onClick={() => handleNavigation('whoami')}>cat about.md</span>
            </li>
            <li>
              <span className="nav-link" onClick={() => setIsContactOpen(true)} style={{ color: 'var(--accent-orange)' }}>ssh contact</span>
            </li>
          </ul>

          <div className="nav-actions">
            {/* Monitor console SVG toggle icons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ cursor: 'pointer' }}>
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ cursor: 'pointer' }}>
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
          </div>
        </header>

        {/* Dashboard workspace grids */}
        <main className="workspace">
          {/* Section: Terminal zsh Window */}
          <div id="whoami-section">
            <Terminal
              profileData={profileData}
              onNavigate={handleNavigation}
              onContactClick={() => setIsContactOpen(true)}
            />
          </div>

          {/* Section: Project repository cards list */}
          <Projects projectsData={projectsData} />

          {/* Section: Activity Git Logs */}
          <SystemLogs />

          {/* Section: Skills grid & System Health monitor */}
          <SkillsHealth skillsData={skillsData} healthData={healthData} />
        </main>

        {/* Footer info bars */}
        <footer className="footer">
          <div className="footer-left">
            <span>© 2024 DEV_PORTFOLIO | build: 7f3a1c9</span>
            <span className="footer-time">Local time: {currentTime || "00:00:00"}</span>
          </div>

          <div className="footer-right">
            <span className="footer-link" onClick={() => handleNavigation('logs')}>commit history</span>
            <span className="footer-link" onClick={() => handleNavigation('skills')}>system_status</span>
            <a
              href="http://localhost:8000/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
              onClick={(e) => {
                // If backend is not accessible on localhost (no port 8000 running in front), prevent error
                fetch('http://localhost:8000/docs', { mode: 'no-cors' })
                  .catch(() => {
                    e.preventDefault();
                    alert("FastAPI backend documentation is only accessible when the Python server is running on localhost:8000. Open the docs link once main.py is launched.");
                  });
              }}
            >
              api_docs
            </a>
          </div>
        </footer>
      </div>

      {/* Simulated git push logs console overlay */}
      <GitPushOverlay
        isOpen={isPushOpen}
        onClose={() => setIsPushOpen(false)}
      />

      {/* Interactive security contact SSH shell modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}

export default App;
