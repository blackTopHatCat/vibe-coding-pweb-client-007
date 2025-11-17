import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userAPI } from '../../services/api';
import LoadingSpinner from '../Common/LoadingSpinner';
import '../../styles/Profile.css';

const ProfileSettings = () => {
  const { user, updateUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [profileForm, setProfileForm] = useState({
    username: user?.username || '',
    profilePicture: null
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileChange = (e) => {
    if (e.target.name === 'profilePicture') {
      setProfileForm({
        ...profileForm,
        profilePicture: e.target.files[0]
      });
    } else {
      setProfileForm({
        ...profileForm,
        [e.target.name]: e.target.value
      });
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const formData = new FormData();
      if (profileForm.username !== user.username) {
        formData.append('username', profileForm.username);
      }
      if (profileForm.profilePicture) {
        formData.append('profilePicture', profileForm.profilePicture);
      }

      const response = await userAPI.updateProfile(formData);
      updateUser(response.data.data.user);
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setProfileForm({
        ...profileForm,
        profilePicture: null
      });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update profile' 
      });
    }
    
    setLoading(false);
  };

  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      setLoading(false);
      return;
    }

    try {
      await userAPI.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to change password' 
      });
    }
    
    setLoading(false);
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await userAPI.deleteAccount();
        logout();
      } catch (error) {
        setMessage({ 
          type: 'error', 
          text: error.response?.data?.message || 'Failed to delete account' 
        });
      }
    }
  };

  const profilePictureUrl = user?.profilePicture 
    ? `${process.env.REACT_APP_UPLOADS_URL}${user.profilePicture}`
    : '/default-avatar.png';

  return (
    <div className="profile-settings">
      <h2>Profile Settings</h2>
      
      <div className="profile-header">
        <div className="profile-avatar">
          <img 
            src={profilePictureUrl} 
            alt="Profile" 
            onError={(e) => {
              e.target.src = '/default-avatar.png';
            }}
          />
        </div>
        <div className="profile-info">
          <h3>{user?.username}</h3>
          <p>Member since {new Date(user?.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="settings-tabs">
        <button 
          className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Edit Profile
        </button>
        <button 
          className={`tab ${activeTab === 'password' ? 'active' : ''}`}
          onClick={() => setActiveTab('password')}
        >
          Change Password
        </button>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      {activeTab === 'profile' && (
        <form onSubmit={handleProfileUpdate} className="settings-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={profileForm.username}
              onChange={handleProfileChange}
              required
              minLength="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="profilePicture">Profile Picture</label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleProfileChange}
            />
            <small>Supported formats: JPEG, PNG, GIF. Max size: 5MB</small>
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? <LoadingSpinner size="small" /> : 'Update Profile'}
          </button>
        </form>
      )}

      {activeTab === 'password' && (
        <form onSubmit={handlePasswordChangeSubmit} className="settings-form">
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              required
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              required
              minLength="6"
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? <LoadingSpinner size="small" /> : 'Change Password'}
          </button>
        </form>
      )}

      <div className="danger-zone">
        <h3>Danger Zone</h3>
        <p>Once you delete your account, there is no going back. Please be certain.</p>
        <button 
          onClick={handleDeleteAccount}
          className="delete-btn"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
