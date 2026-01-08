import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Settings.css';

// Predefined avatar options
const AVATAR_OPTIONS = ['😊', '🧘', '🌸', '🌙', '☀️', '🌈', '🦋', '🌿'];

function Settings() {
  const navigate = useNavigate();
  const { userProfile, updateProfile, changePassword } = useAuth();
  
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [selectedAvatar, setSelectedAvatar] = useState(
    userProfile.profilePicture && !userProfile.profilePicture.startsWith('data:') 
      ? userProfile.profilePicture 
      : null
  );
  const [uploadedImage, setUploadedImage] = useState(
    userProfile.profilePicture && userProfile.profilePicture.startsWith('data:')
      ? userProfile.profilePicture
      : null
  );
  const [imagePreview, setImagePreview] = useState(uploadedImage);
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [message, setMessage] = useState({ type: '', text: '' });
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Image must be smaller than 2MB' });
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please upload an image file' });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setUploadedImage(base64String);
      setImagePreview(base64String);
      setSelectedAvatar(null); // Deselect emoji if image is uploaded
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarSelect = (emoji) => {
    setSelectedAvatar(emoji);
    setUploadedImage(null);
    setImagePreview(null);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setMessage({ type: 'error', text: 'Name cannot be empty' });
      return;
    }

    // Use uploaded image if available, otherwise use selected emoji, otherwise null
    const profilePicture = uploadedImage || selectedAvatar;

    updateProfile({
      name: name.trim(),
      email: email.trim(),
      profilePicture: profilePicture
    });

    setMessage({ type: 'success', text: 'Profile updated successfully!' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordMessage({ type: '', text: '' });

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'All fields are required' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    const result = changePassword(currentPassword, newPassword);
    setPasswordMessage({ 
      type: result.success ? 'success' : 'error', 
      text: result.message 
    });

    if (result.success) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordMessage({ type: '', text: '' }), 3000);
    }
  };

  return (
    <div className="page secondary-page fade-in">
      <header className="page-header">
        <button className="back-button interactive" onClick={() => navigate('/')}>
          <span className="back-icon">←</span>
          <span className="back-text">Back</span>
        </button>
        <h1 className="page-title">Settings</h1>
      </header>
      
      <main className="page-main settings-main">
        {/* Profile Settings */}
        <section className="settings-card card">
          <h2 className="settings-section-title">Profile Settings</h2>
          
          <form onSubmit={handleProfileSubmit} className="settings-form">
            {/* Current Profile Picture Display */}
            <div className="form-group">
              <label className="form-label">Current Profile Picture</label>
              <div className="current-profile-display">
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile" className="profile-preview-large" />
                ) : selectedAvatar ? (
                  <div className="profile-preview-emoji">{selectedAvatar}</div>
                ) : (
                  <div className="profile-preview-initials">
                    {name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            {/* Upload Image */}
            <div className="form-group">
              <label htmlFor="imageUpload" className="form-label">Upload Profile Picture</label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input"
              />
              <p className="form-hint">Recommended: Square image, max 2MB</p>
            </div>

            {/* OR Divider */}
            <div className="or-divider">
              <span>OR</span>
            </div>

            {/* Avatar Selection */}
            <div className="form-group">
              <label className="form-label">Choose Emoji Avatar</label>
              <div className="avatar-selection">
                {AVATAR_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className={`avatar-option ${selectedAvatar === emoji && !uploadedImage ? 'avatar-option--selected' : ''}`}
                    onClick={() => handleAvatarSelect(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
                <button
                  type="button"
                  className={`avatar-option ${selectedAvatar === null && !uploadedImage ? 'avatar-option--selected' : ''}`}
                  onClick={() => handleAvatarSelect(null)}
                  title="Use initials"
                >
                  <span className="avatar-initials-preview">
                    {name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                  </span>
                </button>
              </div>
            </div>

            {/* Name */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                id="name"
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            {message.text && (
              <div className={`message message--${message.type}`}>
                {message.text}
              </div>
            )}

            <button type="submit" className="submit-button">
              Save Profile
            </button>
          </form>
        </section>

        {/* Security Settings */}
        <section className="settings-card card">
          <h2 className="settings-section-title">Security</h2>
          
          <form onSubmit={handlePasswordSubmit} className="settings-form">
            {/* Current Password */}
            <div className="form-group">
              <label htmlFor="currentPassword" className="form-label">Current Password</label>
              <input
                id="currentPassword"
                type="password"
                className="form-input"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
              />
            </div>

            {/* New Password */}
            <div className="form-group">
              <label htmlFor="newPassword" className="form-label">New Password</label>
              <input
                id="newPassword"
                type="password"
                className="form-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
              <input
                id="confirmPassword"
                type="password"
                className="form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>

            {passwordMessage.text && (
              <div className={`message message--${passwordMessage.type}`}>
                {passwordMessage.text}
              </div>
            )}

            <button type="submit" className="submit-button">
              Change Password
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Settings;
