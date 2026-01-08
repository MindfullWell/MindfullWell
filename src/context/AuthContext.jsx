import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Default user profile
const DEFAULT_PROFILE = {
  name: 'Maitreya',
  email: '  ',
  profilePicture: null
};

const DEFAULT_PASSWORD = 'peace2024';

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const [userProfile, setUserProfile] = useState(() => {
    const stored = localStorage.getItem('userProfile');
    return stored ? JSON.parse(stored) : DEFAULT_PROFILE;
  });

  const [userPassword, setUserPassword] = useState(() => {
    return localStorage.getItem('userPassword') || DEFAULT_PASSWORD;
  });

  const login = (email, password) => {
    if (email === userProfile.email && password === userPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  const updateProfile = (profileData) => {
    const updatedProfile = { ...userProfile, ...profileData };
    setUserProfile(updatedProfile);
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
  };

  const changePassword = (oldPassword, newPassword) => {
    if (oldPassword !== userPassword) {
      return { success: false, message: 'Current password is incorrect' };
    }
    
    if (newPassword.length < 6) {
      return { success: false, message: 'New password must be at least 6 characters' };
    }

    setUserPassword(newPassword);
    localStorage.setItem('userPassword', newPassword);
    return { success: true, message: 'Password changed successfully' };
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        userProfile,
        login, 
        logout,
        updateProfile,
        changePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
