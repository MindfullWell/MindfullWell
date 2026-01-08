import { useNavigate } from 'react-router-dom';
import './BrainwaveGraph.css';

function BrainwaveGraph() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/analysis');
  };

  return (
    <div className="brainwave-container card interactive" onClick={handleClick}>
      <div className="brainwave-label">Brainwave Activity</div>
      <svg 
        className="brainwave-svg" 
        viewBox="0 0 400 200" 
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background gradient */}
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-wave-3)" stopOpacity="0.8" />
            <stop offset="50%" stopColor="var(--color-wave-4)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--color-wave-3)" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-wave-4)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="var(--color-active-light)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--color-wave-4)" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        {/* Wave 1 - Primary (bottom layer, slowest) */}
        <path
          className="wave wave-1"
          d="M0,100 Q25,60 50,100 T100,100 T150,100 T200,100 T250,100 T300,100 T350,100 T400,100"
          stroke="url(#waveGradient1)"
          strokeWidth="2.5"
          fill="none"
        />
        
        {/* Wave 2 - Secondary */}
        <path
          className="wave wave-2"
          d="M0,100 Q30,70 60,100 T120,100 T180,100 T240,100 T300,100 T360,100 T400,100"
          stroke="url(#waveGradient2)"
          strokeWidth="2.5"
          fill="none"
        />
        
        {/* Wave 3 - Tertiary (top layer, fastest) */}
        <path
          className="wave wave-3"
          d="M0,100 Q20,80 40,100 T80,100 T120,100 T160,100 T200,100 T240,100 T280,100 T320,100 T360,100 T400,100"
          stroke="url(#waveGradient3)"
          strokeWidth="2"
          fill="none"
        />
        
        {/* Glow effect on center */}
        <circle
          className="wave-glow"
          cx="200"
          cy="100"
          r="60"
          fill="none"
        />
      </svg>
      <div className="brainwave-hint">Tap to view analysis</div>
    </div>
  );
}

export default BrainwaveGraph;
