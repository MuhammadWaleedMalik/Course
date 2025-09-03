import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLinkClick = () => {
    setIsNavOpen(false);
  };

  const handleLogin = () => {
    // Simulate successful login
    localStorage.setItem('authToken', 'dummy-token');
    setIsLoggedIn(true);
    setIsNavOpen(false);
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setIsNavOpen(false);
  };

  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isNavOpen]);

  return (
    <div className="header-container">
      <div className="header-bar">
        <div className="left-section">
          <div className="logo-container">
            <img src="/path/to/logo.png" alt="Website Name" className="logo" />
            <span className="website-name">Course Craft</span>
          </div>
        </div>

        {!isNavOpen && (
          <>
            <div className="center-nav-links">
              <ul>
                <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
                <li><Link to="/about" onClick={handleLinkClick}>About Us</Link></li>
                <li><Link to="/blog" onClick={handleLinkClick}>Blogs</Link></li>
                <li><Link to="/alumni" onClick={handleLinkClick}>Alumnis</Link></li>
              </ul>
            </div>
            <div className="header-auth-buttons">
              {isLoggedIn ? (
                <Link to="/" onClick={handleLogout} className="auth-button">Logout</Link>
              ) : (
                <>
                  <Link to="/login" onClick={handleLogin} className="auth-button">Sign In</Link>
                  <Link to="/signup" onClick={handleLogin} className="auth-button">Sign Up</Link>
                </>
              )}
            </div>
          </>
        )}

        <input 
          id="page-nav-toggle" 
          className="main-navigation-toggle" 
          type="checkbox" 
          checked={isNavOpen}
          onChange={toggleNav}
        />
        <label htmlFor="page-nav-toggle" className="menu-toggle-label">
          <svg className="icon--menu-toggle" viewBox="0 0 60 30">
            <g className="icon-group">
              <g className="icon--menu">
                <path d="M 6 0 L 54 0" />
                <path d="M 6 15 L 54 15" />
                <path d="M 6 30 L 54 30" />
              </g>
              <g className="icon--close">
                <path d="M 15 0 L 45 30" />
                <path d="M 15 30 L 45 0" />
              </g>
            </g>
          </svg>
        </label>
      </div>

      <nav className={`main-navigation ${isNavOpen ? 'nav-open' : ''}`}>
        <ul>
          <li><Link to="/home" onClick={handleLinkClick}>Home</Link></li>
          <li><Link to="/about" onClick={handleLinkClick}>About Us</Link></li>
          <li><Link to="/blog" onClick={handleLinkClick}>Blogs</Link></li>
          <li><Link to="/alumni" onClick={handleLinkClick}>Alumnis</Link></li>
        </ul>

        <div className="nav-social-links">
          <a href="https://www.linkedin.com/in/muhammad-ali-abbas-khan-417852306/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://www.instagram.com/aliabbaskhan07/?hl=en" target="_blank" rel="noopener noreferrer">Instagram</a>
      
        </div>

        <div className="nav-auth-buttons">
          {isLoggedIn ? (
            <Link to="/home" onClick={handleLogout} className="auth-button">Logout</Link>
          ) : (
            <>
              <Link to="/login" onClick={handleLogin} className="auth-button">Sign In</Link>
              <Link to="/signup" onClick={handleLogin} className="auth-button">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;