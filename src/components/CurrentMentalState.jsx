import './CurrentMentalState.css';

function CurrentMentalState() {
  const metrics = [
    { label: 'Mood', value: 'Good', color: '#10b981' },
    { label: 'Stress', value: 'Low', color: '#3b82f6' },
    { label: 'Energy', value: 'High', color: '#f59e0b' },
    { label: 'Focus', value: 'Sharp', color: '#8b5cf6' },
  ];

  const currentScore = 82;

  return (
    <div className="current-mental-state">
      <h3 className="section-title" style={{color: '#93c5fd'}}>Current Mental State</h3>
      <p className="state-subtitle">Real-time wellness metrics</p>

      <div className="score-badge">
        <div className="score-ring">
          <svg viewBox="0 0 120 120" className="ring-svg">
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="10"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="url(#stateGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${currentScore * 3.14} 314`}
              transform="rotate(-90 60 60)"
              className="score-ring-progress"
            />
            <defs>
              <linearGradient id="stateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="score-value">{currentScore}</div>
        </div>
        <p className="score-label">Overall Score</p>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-item">
            <div className="metric-info">
              <span className="metric-label">{metric.label}</span>
              <span className="metric-value" style={{color: metric.color}}>{metric.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CurrentMentalState;
