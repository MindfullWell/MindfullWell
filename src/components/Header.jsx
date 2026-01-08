import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Header.css';

function Header() {
  const { userProfile } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  
  // Generate mock past analysis dates (last 7 days)
  const pastDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date;
  });

  const today = selectedDate || new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsDropdownOpen(false);
  };

  // Get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Check if profile picture is a base64 image
  const isBase64Image = userProfile.profilePicture && userProfile.profilePicture.startsWith('data:');

  return (
    <header className="header">
      <div className="header-content">
        <div className="profile-photo">
          <div className="profile-avatar">
            {isBase64Image ? (
              <img 
                src={userProfile.profilePicture} 
                alt="Profile" 
                className="avatar-image"
              />
            ) : userProfile.profilePicture ? (
              <span className="avatar-emoji">{userProfile.profilePicture}</span>
            ) : (
              <span className="avatar-initials">{getInitials(userProfile.name)}</span>
            )}
          </div>
        </div>
        <div className="greeting-container">
          <h1 className="greeting">Hi {userProfile.name}!</h1>
          <p className="date">{formattedDate}</p>
          <div className="date-dropdown-container">
            <button 
              className="previous-dates-button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              See previous dates
              <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span>
            </button>
            {isDropdownOpen && (
              <div className="dates-dropdown">
                {pastDates.map((date, index) => {
                  const isToday = index === 0 && !selectedDate;
                  const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
                  const dateStr = date.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  });
                  
                  return (
                    <button
                      key={index}
                      className={`dropdown-item ${isSelected || isToday ? 'selected' : ''}`}
                      onClick={() => handleDateSelect(date)}
                    >
                      {dateStr}
                      {index === 0 && ' (Today)'}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
