import { useNavigate } from 'react-router-dom';
import './SecondaryPages.css';

function Help() {
  const navigate = useNavigate();

  return (
    <div className="page secondary-page fade-in">
      <header className="page-header">
        <button className="back-button interactive" onClick={() => navigate('/')}>
          <span className="back-icon">←</span>
          <span className="back-text">Back</span>
        </button>
        <h1 className="page-title">Ask for Help</h1>
      </header>
      
      <main className="page-main">
        <section className="dark-content card">
          <h2 className="section-heading">We're Here to Support You</h2>
          <p className="content-text">
            If you're experiencing difficulties or need someone to talk to, you're not alone. 
            We have resources and support available 24/7.
          </p>
          
          <div className="help-section">
            <h3 className="group-title">Crisis Support</h3>
            <p className="content-text">
              If you're in crisis or need immediate support, please reach out to a mental health 
              professional or crisis hotline in your area.
            </p>
          </div>
          
          <div className="help-section">
            <h3 className="group-title">Talk to Someone</h3>
            <p className="content-text">
              Connect with our wellness advisors who can provide guidance, resources, and a 
              compassionate ear when you need it most.
            </p>
          </div>
          
          <div className="help-section">
            <h3 className="group-title">FAQ & Resources</h3>
            <p className="content-text">
              Browse our library of helpful articles, guided exercises, and frequently asked 
              questions about mental wellness and brainwave monitoring.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Help;
