import { useNavigate } from 'react-router-dom';
import './SecondaryPages.css';

function ReportError() {
  const navigate = useNavigate();

  return (
    <div className="page secondary-page fade-in">
      <header className="page-header">
        <button className="back-button interactive" onClick={() => navigate('/')}>
          <span className="back-icon">←</span>
          <span className="back-text">Back</span>
        </button>
        <h1 className="page-title">Report an Issue</h1>
      </header>
      
      <main className="page-main">
        <section className="dark-content card">
          <h2 className="section-heading">Help Us Improve</h2>
          <p className="content-text">
            We're constantly working to improve your experience. If you've encountered a technical 
            issue or have feedback about something that isn't working as expected, we want to hear from you.
          </p>
          
          <div className="error-section">
            <h3 className="group-title">Technical Issues</h3>
            <p className="content-text">
              Report bugs, crashes, or unexpected behavior in the app. Include details about what 
              you were doing when the issue occurred.
            </p>
          </div>
          
          <div className="error-section">
            <h3 className="group-title">Data Concerns</h3>
            <p className="content-text">
              If you notice any inconsistencies in your brainwave data or analysis results, 
              let us know so we can investigate.
            </p>
          </div>
          
          <div className="error-section">
            <h3 className="group-title">Suggestions</h3>
            <p className="content-text">
              Have an idea for how we can make the app better? We welcome your feedback and 
              suggestions for new features or improvements.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ReportError;
