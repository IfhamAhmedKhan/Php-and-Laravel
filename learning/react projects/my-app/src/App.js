import React, { useState } from 'react';
import './App.css';

function App() {
  const [navbarOpen, setNavbarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleNavbarToggle = () => {
    setNavbarOpen((prev) => !prev);
  };

  const handleProfileToggle = () => {
    setProfileOpen((prev) => !prev);
  };

  const handleProfileClose = () => {
    setProfileOpen(false);
  };

  return (
    <div className="App">
      {navbarOpen && (
        <nav className="App-navbar">
          <button className="navbar-toggle" onClick={handleNavbarToggle} title="Close Navbar">&times;</button>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </nav>
      )}
      {!navbarOpen && (
        <button className="navbar-toggle-open" onClick={handleNavbarToggle} title="Open Navbar">&#9776;</button>
      )}
      <header className="App-header">
        <div className="profile-container">
          <button className="profile-btn" onClick={handleProfileToggle} title="Profile">
            <span role="img" aria-label="profile">👤</span>
          </button>
          {profileOpen && (
            <div className="profile-dropdown" onMouseLeave={handleProfileClose}>
              <ul>
                <li>My Profile</li>
                <li>Settings</li>
                <li>Notifications</li>
                <li>Help</li>
                <li>Logout</li>
              </ul>
            </div>
          )}
        </div>
        <h1>Welcome to My New React App!</h1>
        <p>This is a simple React application created to demonstrate a basic layout with a navigation bar and an introduction section. Explore the options above to learn more!</p>
        <div className="button-row">
          <button className="main-btn">Button 1</button>
          <button className="main-btn">Button 2</button>
          <button className="main-btn">Button 3</button>
          <button className="main-btn">Button 4</button>
        </div>
        <div className="slider-placeholder">
          {/* Slider will go here */}
        </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
