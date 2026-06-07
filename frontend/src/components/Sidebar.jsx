import React from 'react';

export default function Sidebar({ activeSection, onNavigate, onPushClick, onContactClick, isMinimized, onToggleMinimize }) {
  const fileItems = [
    { id: 'whoami', name: 'index.js', isDir: false, icon: 'JS' },
    { id: 'projects', name: 'projects.py', isDir: false, icon: 'PY' },
    { id: 'certifications', name: 'certifications.md', isDir: false, icon: 'DOC' },
    { id: 'skills', name: 'skills/', isDir: true, icon: 'DIR' },
  ];

  return (
    <aside className={`sidebar ${isMinimized ? 'minimized' : ''}`}>
      <div className="sidebar-header" style={{ display: 'flex', flexDirection: 'column', alignItems: isMinimized ? 'center' : 'flex-start' }}>
        {!isMinimized ? (
          <>
            <h2 className="sidebar-title">SRC_EXPLORER</h2>
            <div className="sidebar-version">v1.0.4-stable</div>
          </>
        ) : (
          <span className="tree-icon" title="Explorer" style={{ color: 'var(--text-primary)', margin: 0, fontSize: '16px' }}>
            📁
          </span>
        )}
      </div>

      <nav className="sidebar-content">
        <ul className="sidebar-tree">
          {fileItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li
                key={item.name}
                className={`tree-item ${isActive ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
                title={isMinimized ? item.name : undefined}
                style={{ justifyContent: isMinimized ? 'center' : 'flex-start', padding: isMinimized ? '12px 0' : '8px 24px' }}
              >
                <span className="tree-icon" style={{ margin: isMinimized ? 0 : '0 10px 0 0' }}>
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
                  {item.icon === 'DOC' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: '#8ecae6' }}>
                      <path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="8" y1="13" x2="16" y2="13" />
                      <line x1="8" y1="17" x2="16" y2="17" />
                    </svg>
                  )}
                </span>
                {!isMinimized && item.name}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-footer" style={{ padding: isMinimized ? '16px 8px' : '20px' }}>
        <button
          className="btn-push"
          onClick={onPushClick}
          title="git push"
          style={{
            padding: isMinimized ? '8px 0' : '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: isMinimized ? '36px' : 'auto'
          }}
        >
          {isMinimized ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          ) : 'git push'}
        </button>

        <div className="sidebar-controls" style={{ flexDirection: isMinimized ? 'column' : 'row', gap: isMinimized ? '12px' : '0', alignItems: 'center', justifyContent: isMinimized ? 'center' : 'center' }}>
          <div className="control-icon" title="Contact" onClick={onContactClick}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-orange)' }}>
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <div className="control-icon" title="Toggle Layout" onClick={onToggleMinimize}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
          </div>
        </div>
      </div>
    </aside>
  );
}
