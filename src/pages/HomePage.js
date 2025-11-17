import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/App.css';

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Welcome to Tic-Tac-Toe</h1>
        <p>The classic game with modern features</p>
        
        {isAuthenticated ? (
          <div className="auth-buttons">
            <p>Welcome back, {user?.username}!</p>
            <Link to="/game" className="cta-button">
              Play Game
            </Link>
            <Link to="/profile" className="secondary-button">
              View Profile
            </Link>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/register" className="cta-button">
              Get Started
            </Link>
            <Link to="/login" className="secondary-button">
              Sign In
            </Link>
          </div>
        )}
      </div>

      <div className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🎮 Play Tic-Tac-Toe</h3>
            <p>Enjoy the classic game with smooth gameplay</p>
          </div>
          <div className="feature-card">
            <h3>👤 User Profiles</h3>
            <p>Create your account and customize your profile</p>
          </div>
          <div className="feature-card">
            <h3>📱 Responsive Design</h3>
            <p>Play on any device - desktop, tablet, or mobile</p>
          </div>
          <div className="feature-card">
            <h3>🔄 Game History</h3>
            <p>Review your moves and learn from your games</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
