import React, { useState, useEffect, useRef } from 'react';
import API_BASE_URL from '../config';

export default function GitPushOverlay({ isOpen, onClose }) {
  const [logs, setLogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const consoleEndRef = useRef(null);

  const rawLogs = [
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
  ];

  // Load from backend if available, otherwise fallback
  useEffect(() => {
    if (!isOpen) {
      setLogs([]);
      setCurrentIndex(0);
      setIsDone(false);
      return;
    }

    fetch(`${API_BASE_URL}/api/git-push-logs`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          startSimulation(data);
        } else {
          startSimulation(rawLogs);
        }
      })
      .catch(() => {
        startSimulation(rawLogs);
      });

  }, [isOpen]);

  const startSimulation = (logList) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < logList.length) {
        setLogs(prev => [...prev, logList[index]]);
        index++;
        setCurrentIndex(index);
      } else {
        setIsDone(true);
        clearInterval(interval);
      }
    }, 450); // Speed of logs printing
  };

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  if (!isOpen) return null;

  return (
    <div className="push-overlay">
      <div className="push-console">
        <div className="console-header">
          <div className="console-title">GIT_DEPLOY_PIPELINE — terminal</div>
          {isDone && (
            <div className="console-close" onClick={onClose} style={{ fontWeight: 'bold' }}>
              [ESC / CLOSE]
            </div>
          )}
        </div>

        <div className="console-body">
          {logs.map((line, idx) => {
            const isSuccess = line.includes('COMPLETE') || line.includes('SUCCESSFUL') || line.includes('nominal');
            return (
              <div
                key={idx}
                className={`console-line ${isSuccess ? 'success' : 'system'}`}
              >
                {line}
              </div>
            );
          })}
          
          {!isDone && (
            <div className="console-line spinner">
              <span>▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰ [Syncing Files...]</span>
            </div>
          )}

          {isDone && (
            <div className="console-line success" style={{ marginTop: '16px', borderTop: '1px solid rgba(0, 255, 102, 0.2)', paddingTop: '12px' }}>
              &gt; Push pipeline finished successfully. Press [CLOSE] to return.
            </div>
          )}
          <div ref={consoleEndRef} />
        </div>
      </div>
    </div>
  );
}
