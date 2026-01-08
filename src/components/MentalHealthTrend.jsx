import { useState, useMemo } from 'react';
import './MentalHealthTrend.css';

const MOCK_DATA = {
  '7d': [
    { label: 'Mon', value: 65 },
    { label: 'Tue', value: 68 },
    { label: 'Wed', value: 72 },
    { label: 'Thu', value: 70 },
    { label: 'Fri', value: 75 },
    { label: 'Sat', value: 78 },
    { label: 'Sun', value: 82 },
  ],
  '30d': [
    { label: 'W1', value: 60 },
    { label: 'W2', value: 65 },
    { label: 'W3', value: 72 },
    { label: 'W4', value: 82 },
  ]
};

function MentalHealthTrend() {
  const [timeframe, setTimeframe] = useState('7d');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const data = MOCK_DATA[timeframe];
  const maxValue = 100;
  const width = 100; // SVG coordinate space
  const height = 50;
  
  // Calculate SVG points
  const points = useMemo(() => {
    return data.map((d, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - (d.value / maxValue) * height;
      return { x, y, ...d };
    });
  }, [data]);

  // Create SVG path for the line
  const linePath = useMemo(() => {
    if (points.length === 0) return '';
    
    // Simple straight lines for robustness, or could do curves
    // Let's do a smooth curve (Catmull-Rom or simple cubic bezier approximation)
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      
      // Control points for smooth curve
      const cp1x = current.x + (next.x - current.x) * 0.5;
      const cp1y = current.y;
      const cp2x = current.x + (next.x - current.x) * 0.5;
      const cp2y = next.y;
      
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
    }
    
    return path;
  }, [points]);

  // Create SVG path for the gradient area (fill below line)
  const areaPath = useMemo(() => {
    if (points.length === 0) return '';
    return `${linePath} L ${width} ${height} L 0 ${height} Z`;
  }, [linePath, width, height]);

  return (
    <div className="mental-health-trend">
      <div className="trend-header">
        <div>
           <h3 className="section-title" style={{color: '#93c5fd',fontSize: '15px'}}>Mental Health Trend</h3>
           <p className="trend-subtitle">Score over time</p>
        </div>
        <div className="timeframe-toggle">
          <button 
            className={`toggle-btn ${timeframe === '7d' ? 'active' : ''}`}
            onClick={() => setTimeframe('7d')}
          >
            7 Days
          </button>
          <button 
            className={`toggle-btn ${timeframe === '30d' ? 'active' : ''}`}
            onClick={() => setTimeframe('30d')}
          >
            30 Days
          </button>
        </div>
      </div>

      <div className="trend-graph-container">
        <svg viewBox="0 -10 100 70" preserveAspectRatio="none" className="trend-svg">
          <defs>
            <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0c6fe7" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0c6fe7" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="#60a5fa" />
               <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          <line x1="0" y1="0" x2="100" y2="0" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeDasharray="2" />
          <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeDasharray="2" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeDasharray="2" />

          {/* Area Fill */}
          <path d={areaPath} fill="url(#trendGradient)" className="trend-area" />
          
          {/* Line */}
          <path d={linePath} fill="none" stroke="url(#lineGradient)" strokeWidth="2" strokeLinecap="round" className="trend-line" />
          
          {/* Data Points */}
          {points.map((point, i) => (
            <g key={i} className="point-group">
               <circle 
                 cx={point.x} 
                 cy={point.y} 
                 r="2" 
                 fill="#fff"
                 stroke="#0c6fe7" 
                 strokeWidth="1"
                 className="data-point-circle"
               />
               {/* Label on Hover Area (invisible hit target) */}
               <rect 
                  x={point.x - 5} 
                  y={-10} 
                  width="10" 
                  height="70" 
                  fill="transparent" 
                  onMouseEnter={() => setHoveredPoint(point)} // Simple hover for now
                  onMouseLeave={() => setHoveredPoint(null)}
                  style={{cursor: 'pointer'}}
               />
            </g>
          ))}
        </svg>

        {/* X-Axis Labels */}
        <div className="x-axis-labels">
          {data.map((d, i) => (
            <span key={i} className="axis-label">{d.label}</span>
          ))}
        </div>
        
        {/* Tooltip Overlay */}
        {hoveredPoint && (
           <div 
             className="trend-tooltip" 
             style={{ 
               left: `${(hoveredPoint.x)}%`, 
               top: `${(hoveredPoint.y / 50) * 100}%` 
             }}
           >
              <div className="tooltip-value">{hoveredPoint.value}</div>
           </div>
        )}
      </div>
    </div>
  );
}

export default MentalHealthTrend;
