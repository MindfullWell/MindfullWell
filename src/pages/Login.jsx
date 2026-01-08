import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const success = login(email, password);
    if (!success) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-page">
      {/* Left Panel - Form */}
      <div className="login-form-panel">
        <div className="form-content">
          <div className="login-header">
            <h1 className="app-title">MindfulWell</h1>
            <h2 className="login-heading">Sign in</h2>
          </div>
          
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                id="email"
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            <button type="submit" className="login-button">
              Sign In
            </button>
          </form>
          
          <p className="login-footer-text">
            Taking care of your mental health, one step at a time
          </p>
        </div>
      </div>

      {/* Right Panel - Branding */}
      <div className="login-brand-panel">
        <div className="brand-content">
          <div className="brand-logo">
            <svg width="120" height="120" viewBox="0 0 200 200" fill="none">
              {/* Simple brainwave icon */}
              <path
                d="M20,100 Q40,60 60,100 T100,100 T140,100 T180,100"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M20,100 Q35,80 50,100 T80,100 T110,100 T140,100 T170,100"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M20,100 Q30,90 40,100 T60,100 T80,100 T100,100 T120,100 T140,100 T160,100"
                stroke="rgba(255,255,255,0.7)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
          
          <h2 className="brand-title">Welcome to Your Wellness Journey</h2>
          <p className="brand-description">
            Our mental health dashboard helps you track your emotional well-being 
            with beautiful, calming visualizations and supportive insights.
          </p>
          
          <div className="brand-card">
            <h3 className="card-title">Start your journey today</h3>
            <p className="card-text">
              Join thousands who have found peace and clarity through mindful tracking 
              and personalized wellness recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
