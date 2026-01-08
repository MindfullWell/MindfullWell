import './MentalHealthScore.css';

function MentalHealthScore() {
  const currentScore = 76;
  const previousScore = 68;
  const difference = currentScore - previousScore;
  const isImproving = difference > 0;

  return (
    <div className="card mental-health-score">
      <h3 className="card-title">Mental Health Score</h3>
      <p className="card-subtitle">Overall wellness</p>
      
      <div className="score-display">
        <div className="score-circle">
          <svg viewBox="0 0 100 100" className="score-svg">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="url(#scoreGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${currentScore * 2.51} 251`}
              transform="rotate(-90 50 50)"
              className="score-progress"
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0c6fe7" />
                <stop offset="100%" stopColor="#8bb4e8" />
              </linearGradient>
            </defs>
          </svg>
          <div className="score-number">{currentScore}</div>
        </div>
        
        <div className="score-info">
          <div className={`score-change ${isImproving ? 'improving' : 'declining'}`}>
            <span className="change-icon">{isImproving ? '↑' : '↓'}</span>
            <span className="change-value">{Math.abs(difference)} points</span>
          </div>
          <p className="score-description">
            {isImproving ? 'Great progress!' : 'Keep going!'} from last week
          </p>
        </div>
      </div>
    </div>
  );
}

export default MentalHealthScore;
