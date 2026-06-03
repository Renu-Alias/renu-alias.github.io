import React from 'react';

export default function Sidebar({ activeSection, onNavigate, onPushClick, onContactClick }) {
  const fileItems = [
    { id: 'whoami', name: 'index.js', isDir: false, icon: 'JS' },
    { id: 'projects', name: 'projects.py', isDir: false, icon: 'PY' },
    { id: 'logs', name: 'activity.log', isDir: false, icon: 'LOG' },
    { id: 'skills', name: 'skills/', isDir: true, icon: 'DIR' },
    { id: 'whoami', name: 'README.md', isDir: false, icon: 'MD' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">SRC_EXPLORER</h2>
        <div className="sidebar-version">v1.0.4-stable</div>
      </div>

      <nav className="sidebar-content">
        <ul className="sidebar-tree">
          {fileItems.map((item, index) => {
            const isActive = activeSection === item.id;
            return (
              <li
                key={index}
                className={`tree-item ${isActive ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                <span className="tree-icon">
                  {item.icon === 'JS' && (
                    <span style={{ color: '#f7df1e', fontWeight: 'bold', fontSize: '11px' }}>JS</span>
                  )}
                  {item.icon === 'PY' && (
                    <span style={{ color: '#3572A5', fontWeight: 'bold', fontSize: '11px' }}>PY</span>
                  )}
                  {item.icon === 'LOG' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: '#00ff66' }}>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  )}
                  {item.icon === 'DIR' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: '#ff9e3b' }}>
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    </svg>
                  )}
                  {item.icon === 'MD' && (
                    <span style={{ color: '#8b949e', fontWeight: 'bold', fontSize: '11px' }}>MD</span>
                  )}
                </span>
                {item.name}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="btn-push" onClick={onPushClick}>
          git push
        </button>

        <div className="sidebar-controls">
          <div className="control-icon" title="Settings" onClick={onContactClick}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </div>

          <div className="control-icon" title="Toggle Layout" onClick={() => onNavigate('whoami')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
          </div>
        </div>
      </div>
    </aside>
  );
}
