

export default function Projects({ projectsData }) {
  // Fallback defaults matching screen.png
  const projects = projectsData && projectsData.length > 0 ? projectsData : [
    {
      id: "00",
      code: "CODESAGE",
      title: "CodeSage",
      description: "AI-powered code analysis and tutoring platform that helps beginner programmers debug, understand and improve their code through personalized feedback and learning insights.",
      tags: ["AI", "Education"],
      url: "https://github.com/Renu-Alias/CodeSage"
    },
    {
      id: "01",
      code: "SENTINEL",
      title: "Sentinel",
      description: "Real-time automated piracy detection system with dual-mode fingerprinting.",
      tags: ["Automation", "Detection"],
      url: "https://github.com/Renu-Alias/Sentinel"
    },
    {
      id: "02",
      code: "LITECPU16",
      title: "LiteCPU16",
      description: "A minimal embedded single cycle RISC-V processor.",
      tags: ["RISC-V", "Embedded"],
      url: "https://github.com/Renu-Alias/LiteCPU16"
    },
    {
      id: "03",
      code: "HMS",
      title: "HMS",
      description: "Hospital management system.",
      tags: ["Healthcare", "Management"],
      url: "https://github.com/Renu-Alias/HMS"
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
          <div key={index} className="project-card" style={{ transitionDelay: `${index * 0.12}s` }}>
            <div>
              <div className="card-header-row">
                <span className="project-code">[ {project.id}. {project.code} ]</span>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-arrow"
                  onClick={(e) => {
                    if (project.url === '#') {
                      e.preventDefault();
                      alert(`Opening repository simulation for ${project.code}!`);
                    }
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
            </div>

            <div className="card-footer-row">
              <div className="project-tags">
                {project.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="tag">&lt;{tag} /&gt;</span>
                ))}
              </div>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="view-repo-link"
                onClick={(e) => {
                  if (project.url === '#') {
                    e.preventDefault();
                    alert(`Opening repository simulation for ${project.code}!`);
                  }
                }}
              >
                view_repository()
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
