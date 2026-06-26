

export default function SystemLogs() {
  const logs = [
    {
      hash: "7f3a1c9",
      message: "feat: implement zero-copy buffer strategy",
      timestamp: "2024-11-20 14:02",
      status: "[SUCCESS]",
      statusClass: "status-success"
    },
    {
      hash: "a12b4e2",
      message: "refactor: async kernel module optimization",
      timestamp: "2024-11-19 09:45",
      status: "[SUCCESS]",
      statusClass: "status-success"
    },
    {
      hash: "99d2f31",
      message: "fix: memory leak in pointer arithmetic",
      timestamp: "2024-11-18 21:30",
      status: "[REVIEW]",
      statusClass: "status-review"
    }
  ];

  return (
    <section id="logs">
      <div className="section-header">
        <span className="section-cmd">tail -n 5 system.log</span>
      </div>

      <div className="system-log-table">
        <div className="table-meta-row">
          <span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            git log --oneline --graph
          </span>
          <span>branch: main</span>
        </div>

        <div className="table-container">
          <table className="log-table">
            <thead>
              <tr>
                <th>HASH</th>
                <th>MESSAGE</th>
                <th>TIMESTAMP</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index}>
                  <td className="hash-cell">{log.hash}</td>
                  <td className="msg-cell">{log.message}</td>
                  <td>{log.timestamp}</td>
                  <td className={`status-cell ${log.statusClass}`}>{log.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
