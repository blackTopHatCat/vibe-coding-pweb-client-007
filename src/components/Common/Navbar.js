import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">🎯 Tic-Tac-Toe</Link>
      </div>
      
      <div className="navbar-menu">
        {isAuthenticated ? (
          <>
            <Link to="/game" className="navbar-item">Game</Link>
            <Link to="/profile" className="navbar-item">Profile</Link>
            <div className="navbar-user">
              <span>Welcome, {user?.username}</span>
              {user?.profilePicture && (
                <img 
                  src={`${process.env.REACT_APP_UPLOADS_URL}${user.profilePicture}`} 
                  alt="Profile" 
                  className="profile-pic-small"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-item">Login</Link>
            <Link to="/register" className="navbar-item">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
