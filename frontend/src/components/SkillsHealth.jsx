import React from 'react';

export default function SkillsHealth({ skillsData, healthData }) {
  // Fallbacks matching screen.png
  const skills = skillsData || {
    languages: ["Rust", "Go", "C++", "TypeScript", "Python"],
    infrastructure: ["Kubernetes", "Docker", "Terraform", "AWS"],
    databases: ["PostgreSQL", "Redis", "Elasticsearch", "ClickHouse"],
    protocols: ["gRPC", "HTTP/3", "WebSocket", "MQTT"]
  };

  const health = healthData || {
    backend_perf: 98,
    ui_arch: 85,
    ops_automation: 92
  };

  // Convert percentage into ASCII bracket indicator representation
  const renderAsciiBar = (percent) => {
    const totalBars = 24;
    const filledBars = Math.round((percent / 100) * totalBars);
    const emptyBars = totalBars - filledBars;
    const barString = '|'.repeat(filledBars) + '-'.repeat(emptyBars);
    return `[${barString}]`;
  };

  return (
    <section id="skills" className="skills-health-split">
      {/* Left side: Skills json */}
      <div>
        <div className="section-header">
          <span className="section-cmd">cat ./skills.json</span>
        </div>

        <div className="skills-grid">
          <div className="skill-card">
            <div className="skill-title">.languages</div>
            <div className="skill-list">
              {JSON.stringify(skills.languages)}
            </div>
          </div>

          <div className="skill-card">
            <div className="skill-title">.infrastructure</div>
            <div className="skill-list">
              {JSON.stringify(skills.infrastructure)}
            </div>
          </div>

          <div className="skill-card">
            <div className="skill-title">.databases</div>
            <div className="skill-list">
              {JSON.stringify(skills.databases)}
            </div>
          </div>

          <div className="skill-card">
            <div className="skill-title">.protocols</div>
            <div className="skill-list">
              {JSON.stringify(skills.protocols)}
            </div>
          </div>
        </div>
      </div>

      {/* Right side: System Health metrics */}
      <div className="health-monitor">
        <div className="health-header">SYSTEM_HEALTH</div>

        <div className="health-metrics-list">
          {/* BACKEND_PERF */}
          <div className="metric-row">
            <div className="metric-info">
              <span className="metric-label">BACKEND_PERF</span>
              <span className="metric-value">{health.backend_perf}%</span>
            </div>
            <div className="progress-bar-container">
              <div className="progress-fill" style={{ width: `${health.backend_perf}%` }}></div>
            </div>
            <div className="ascii-bar">{renderAsciiBar(health.backend_perf)}</div>
          </div>

          {/* UI_ARCH */}
          <div className="metric-row">
            <div className="metric-info">
              <span className="metric-label">UI_ARCH</span>
              <span className="metric-value">{health.ui_arch}%</span>
            </div>
            <div className="progress-bar-container">
              <div className="progress-fill" style={{ width: `${health.ui_arch}%` }}></div>
            </div>
            <div className="ascii-bar">{renderAsciiBar(health.ui_arch)}</div>
          </div>

          {/* OPS_AUTOMATION */}
          <div className="metric-row">
            <div className="metric-info">
              <span className="metric-label">OPS_AUTOMATION</span>
              <span className="metric-value">{health.ops_automation}%</span>
            </div>
            <div className="progress-bar-container">
              <div className="progress-fill" style={{ width: `${health.ops_automation}%` }}></div>
            </div>
            <div className="ascii-bar">{renderAsciiBar(health.ops_automation)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
