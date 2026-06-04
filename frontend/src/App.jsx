import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Terminal from './components/Terminal';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import SkillsHealth from './components/SkillsHealth';
import GitPushOverlay from './components/GitPushOverlay';
import ContactModal from './components/ContactModal';

function App() {
  const [activeSection, setActiveSection] = useState('whoami');
  const [profileData, setProfileData] = useState(null);
  const [projectsData, setProjectsData] = useState([]);
  const [skillsData, setSkillsData] = useState(null);
  
  // Real-time ticking system parameters
  const [currentTime, setCurrentTime] = useState('');
  
  // Modals / Overlay triggers
  const [isPushOpen, setIsPushOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

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
      const certificationsEl = document.getElementById('certifications');
      const skillsEl = document.getElementById('skills');

      if (skillsEl && scrollPos >= skillsEl.offsetTop) {
        setActiveSection('skills');
      } else if (certificationsEl && scrollPos >= certificationsEl.offsetTop) {
        setActiveSection('certifications');
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
    else if (id === 'certifications') targetId = 'certifications';
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
        isMinimized={isSidebarMinimized}
        onToggleMinimize={() => setIsSidebarMinimized(!isSidebarMinimized)}
      />

      {/* Main Terminal and Portfolios Dashboard Content */}
      <div className="main-content">
        {/* Navigation Navbar mimicking retro commands */}
        <header className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <ul className="nav-links">
            <li>
              <span className="nav-link" onClick={() => handleNavigation('whoami')}>~/portfolio/root</span>
            </li>
            <li>
              <span className="nav-link" onClick={() => handleNavigation('projects')}>cd /projects</span>
            </li>
            <li>
              <span className="nav-link" onClick={() => handleNavigation('certifications')}>cat certifications.md</span>
            </li>
            <li>
              <span className="nav-link" onClick={() => handleNavigation('skills')}>ls /skills</span>
            </li>
            <li>
              <span className="nav-link" onClick={() => setIsContactOpen(true)} style={{ color: 'var(--accent-orange)' }}>ssh contact</span>
            </li>
          </ul>
          <div style={{ cursor: 'pointer', padding: '0 20px', transform: 'translateY(3px)' }} title="Contact" onClick={() => setIsContactOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-orange)' }}>
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
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

          {/* Section: Certifications and achievements */}
          <Certifications />

          {/* Section: Skills grid */}
          <SkillsHealth skillsData={skillsData} />
        </main>

        {/* Footer info bars */}
        <footer className="footer">
          <div className="footer-left">
            <span>© 2026 DEV_PORTFOLIO | build: 7f3a1c9</span>
            <span className="footer-time">Local time: {currentTime || "00:00:00"}</span>
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
