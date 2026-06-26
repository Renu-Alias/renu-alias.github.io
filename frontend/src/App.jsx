import { useState, useEffect, useRef, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Terminal from './components/Terminal';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import SkillsHealth from './components/SkillsHealth';
import GitPushOverlay from './components/GitPushOverlay';
import ContactModal from './components/ContactModal';
import CinematicLoader from './components/CinematicLoader';
import API_BASE_URL from './config';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [activeSection, setActiveSection] = useState('whoami');
  const [profileData, setProfileData] = useState(null);
  const [projectsData, setProjectsData] = useState([]);
  const [skillsData, setSkillsData] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [isPushOpen, setIsPushOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const cursorRef = useRef(null);
  const cursorOuterRef = useRef(null);
  const rafRef = useRef(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  // Fetch initial profile/skills/projects info
  useEffect(() => {
    // 1. Profile info
    fetch(`${API_BASE_URL}/api/profile`)
      .then(res => res.json())
      .then(data => setProfileData(data))
      .catch(err => console.error("Profile API unreachable, using default. Details: ", err));

    // 2. Projects info
    fetch(`${API_BASE_URL}/api/projects`)
      .then(res => res.json())
      .then(data => setProjectsData(data))
      .catch(err => console.error("Projects API unreachable. Details: ", err));

    // 3. Skills info
    fetch(`${API_BASE_URL}/api/skills`)
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

  // Clock split-flap tick animation
  const prevSecsRef = useRef(null);
  const secsRef = useRef(null);
  useEffect(() => {
    if (!currentTime) return;
    const secs = currentTime.slice(-2);
    if (prevSecsRef.current !== null && prevSecsRef.current !== secs) {
      const el = secsRef.current;
      if (el) {
        el.classList.remove('tick');
        void el.offsetWidth;
        el.classList.add('tick');
        setTimeout(() => el.classList.remove('tick'), 150);
      }
    }
    prevSecsRef.current = secs;
  }, [currentTime]);

  // Scroll spy mechanism to auto-select sidebar file explorer nodes as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      
      const whoamiEl = document.getElementById('whoami-section');
      const projectsEl = document.getElementById('projects');
      const certificationsEl = document.getElementById('certifications');
      const achievementsEl = document.getElementById('achievements');
      const skillsEl = document.getElementById('skills');

      if (skillsEl && scrollPos >= skillsEl.offsetTop) {
        setActiveSection('skills');
      } else if (achievementsEl && scrollPos >= achievementsEl.offsetTop) {
        setActiveSection('achievements');
      } else if (certificationsEl && scrollPos >= certificationsEl.offsetTop) {
        setActiveSection('certifications');
      } else if (projectsEl && scrollPos >= projectsEl.offsetTop) {
        setActiveSection('projects');
      } else if (whoamiEl) {
        setActiveSection('whoami');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Viewport navigation scroll trigger
  const handleNavigation = (id) => {
    setActiveSection(id);
    let targetId = '';
    
    if (id === 'whoami') targetId = 'whoami-section';
    else if (id === 'projects') targetId = 'projects';
    else if (id === 'certifications') targetId = 'certifications';
    else if (id === 'achievements') targetId = 'achievements';
    else if (id === 'skills') targetId = 'skills';

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      window.scrollTo({
        top: targetEl.getBoundingClientRect().top + window.scrollY - 20,
        behavior: 'smooth'
      });
    }
  };

  const handleLoaderComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Custom cursor tracking with lerp
  useEffect(() => {
    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    const animateCursor = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.12;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.12;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) translate(-50%, -50%)`;
      }
      if (cursorOuterRef.current) {
        cursorOuterRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animateCursor);

    // Hover detection
    const handleHover = (e) => {
      const target = e.target;
      const isHoverable = target.closest('a, button, .tree-item, .project-card, .ssh-contact, .btn-push, input, textarea, .control-icon');
      if (isHoverable) {
        cursorOuterRef.current?.classList.add('hovering');
      } else {
        cursorOuterRef.current?.classList.remove('hovering');
      }
    };

    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleHover);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // Terminal entrance
      const terminalWin = document.querySelector('.terminal-window');
      const terminalHeader = document.querySelector('.terminal-header');
      const feedLabel = document.querySelector('.live-feed-label');
      const feedPhoto = document.querySelector('.feed-photo-img');

      if (terminalWin) {
        gsap.to(terminalWin, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'expo.out',
          delay: 0.2
        });
      }
      if (terminalHeader) {
        gsap.to(terminalHeader, {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          delay: 0
        });
      }
      if (feedLabel) {
        gsap.to(feedLabel, {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          delay: 0.6,
          onComplete: () => {
            feedLabel.classList.add('pulse');
          }
        });
      }
      if (feedPhoto) {
        gsap.fromTo(feedPhoto,
          { clipPath: 'inset(0 0 100% 0)' },
          { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'expo.out', delay: 0.4 }
        );
      }

      // Projects scroll trigger
      gsap.utils.toArray('.section-cmd').forEach(cmd => {
        gsap.fromTo(cmd,
          { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
          {
            clipPath: 'inset(0 0% 0 0)',
            opacity: 1,
            duration: 0.6,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cmd,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // Project cards stagger
      gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'expo.out',
            delay: i * 0.12,
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // Certification cards alternating sides
      gsap.utils.toArray('.cert-card').forEach((card, i) => {
        const xDir = i % 2 === 0 ? -40 : 40;
        gsap.fromTo(card,
          { opacity: 0, x: xDir },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'expo.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // Achievement bullets
      gsap.utils.toArray('.achievements-list li').forEach((li, i) => {
        gsap.fromTo(li,
          { opacity: 0, x: -16 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: 'expo.out',
            delay: i * 0.08,
            scrollTrigger: {
              trigger: li,
              start: 'top 92%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // Skills cards
      gsap.utils.toArray('.skill-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, scaleY: 0.92 },
          {
            opacity: 1,
            scaleY: 1,
            duration: 0.5,
            ease: 'expo.out',
            delay: i * 0.08,
            transformOrigin: 'top',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }, this);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <div className="app-container">
      {!isLoaded && <CinematicLoader onComplete={handleLoaderComplete} />}

      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor" style={{ display: isLoaded ? 'block' : 'none' }} />
      <div ref={cursorOuterRef} className="custom-cursor-outer" style={{ display: isLoaded ? 'block' : 'none' }} />

      {/* Scroll Progress */}
      <div
        className={`scroll-progress${isSidebarMinimized ? ' minimized' : ''}`}
        style={{ height: `${scrollProgress}vh` }}
      />

      <div className="grain-overlay" />
      <div className="vignette" />

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
        {/* Dashboard workspace grids */}
        <main className="workspace">
          {/* Section: Terminal zsh Window */}
          <div id="whoami-section">
            <Terminal
              profileData={profileData}
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
            <span className="footer-time">
              Local time: {currentTime ? currentTime.slice(0, 5) : '00:00'}<span ref={secsRef} className="clock-flip">{currentTime ? currentTime.slice(5) : ':00'}</span>
            </span>
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
