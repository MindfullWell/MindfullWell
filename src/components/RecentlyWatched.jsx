import React from 'react';
import './RecentlyWatched.css';

const recentVideos = [
  { id: 1, title: 'Guided Breathing', videoId: 'inpok4MKVLM', progress: '85%' },
  { id: 2, title: 'Nature Sounds', videoId: 'eKFTSSKCzWA', progress: '30%' },
  { id: 3, title: 'Sleep Stories', videoId: '1ZYbU82GVz4', progress: '15%' },
];

function RecentlyWatched() {
  return (
    <div className="recently-watched-container">
      <div className="section-header">
        <h2 className="section-title">Recently Watched</h2>
        <button className="view-all-btn interactive">View All</button>
      </div>
      
      <div className="recent-videos-grid">
        {recentVideos.map((video) => (
          <div key={video.id} className="recent-video-card interactive">
             <div className="video-thumbnail-wrapper">
               {/* Using the YouTube thumbnail image directly for better performance than loading full iframes */}
               <img 
                 src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`} 
                 alt={video.title} 
                 className="video-thumbnail"
               />
               <div className="play-overlay">
                 <span className="play-icon">▶</span>
               </div>
               <div className="progress-bar-container">
                 <div className="progress-bar" style={{ width: video.progress }}></div>
               </div>
             </div>
             <h3 className="recent-video-title">{video.title}</h3>
             <p className="continue-text">Continue watching</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentlyWatched;
