import React from 'react';

export default function Projects({ projectsData }) {
  // Fallback defaults matching screen.png
  const projects = projectsData && projectsData.length > 0 ? projectsData : [
    {
      id: "00",
      code: "PROJECT_OMNITHREAD",
      title: "High-Concurrency Data Engine",
      description: "A custom runtime built in Rust to handle millions of simultaneous websocket connections with sub-millisecond latency. Features an ASCII dashboard for real-time monitoring.",
      tags: ["Rust", "Tokio", "gRPC"],
      url: "#"
    },
    {
      id: "01",
      code: "VIRTUAL_ENV",
      title: "Terminal-UI Kit",
      description: "React component library for building developer-focused interfaces with built-in command palette.",
      tags: ["React", "TypeScript", "Monospace"],
      url: "#"
    }
  ];

  return (
    <section id="projects">
      <div className="section-header">
        <span className="section-cmd">ls -la ./recent_projects</span>
        <span className="section-comment">{projects.length} items found</span>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <div>
              <div className="card-header-row">
                <span className="project-code">[ {project.id}. {project.code} ]</span>
                <span className="card-arrow">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
            </div>

            <div className="card-footer-row">
              {project.id === "00" ? (
                <div className="project-tags">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="tag">&lt;{tag} /&gt;</span>
                  ))}
                </div>
              ) : (
                <>
                  <div></div> {/* Spacing spacer */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-repo-link"
                    onClick={(e) => {
                      if (project.url === '#') {
                        e.preventDefault();
                        alert(`Opening Terminal-UI repository connection simulation!`);
                      }
                    }}
                  >
                    view_repository()
                  </a>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
