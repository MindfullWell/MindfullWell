import { useNavigate } from 'react-router-dom';
import './Analysis.css';

const calmingVideos = [
  { id: 1, title: 'Guided Breathing', videoId: 'inpok4MKVLM' },
  { id: 2, title: 'Nature Sounds', videoId: 'eKFTSSKCzWA' },
  { id: 3, title: 'Gentle Meditation', videoId: 'ZToicYcHIOU' },
  { id: 4, title: 'Sleep Stories', videoId: '1ZYbU82GVz4' }, // Updated working ID
  { id: 5, title: 'Mindful Walk', videoId: 'ElQdUqDpxT4' },
];

function Analysis() {
  const navigate = useNavigate();

  return (
    <div className="page analysis fade-in">
      <header className="analysis-header">
        <button className="back-button interactive" onClick={() => navigate('/')}>
          <span className="back-icon">←</span>
          <span className="back-text">Back</span>
        </button>
        <h1 className="analysis-title">Your Brainwave Analysis</h1>
      </header>
      
      <main className="analysis-main stagger-children">
        <section className="analysis-content card">
          <p className="analysis-text">
            Your brainwave patterns show healthy activity with balanced alpha and beta waves. 
            This indicates a calm, focused state of mind. The gentle fluctuations are completely 
            normal and suggest your brain is functioning well.
          </p>
          <p className="analysis-text">
            We noticed some slight variations in your theta waves, which might indicate 
            you've been processing a lot of information recently. This is not a cause for 
            concern – it's simply your brain doing its job!
          </p>
          <p className="analysis-text supportive">
            Remember: These patterns are unique to you, and small variations are part of 
            what makes your brain special. Keep taking care of yourself.
          </p>
        </section>
        
        <section className="videos-section">
          <h2 className="videos-title">Ways to get you back on track</h2>
          <div className="videos-scroll">
            {calmingVideos.map((video) => (
              <div key={video.id} className="youtube-video-card">
                <div className="video-frame-wrapper">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h3 className="video-title">{video.title}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Analysis;
