import { useState } from "react";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Handle closing sidebar when clicking overlay
  const handleOverlayClick = () => setSidebarOpen(false);

  return (
    <div className="App" style={{ position: 'relative' }}>
      {/* Sidebar overlay for small screens */}
      {sidebarOpen && (
        <div
          onClick={handleOverlayClick}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.3)',
            zIndex: 99,
          }}
          aria-label="Sidebar overlay"
        />
      )}
      {/* Sidebar */}
      <nav
        className="App-navbar"
        style={{
          position: 'fixed',
          top: 0,
          left: sidebarOpen ? 0 : '-240px',
          zIndex: 100,
          height: '100vh',
          width: 220,
          transition: 'left 0.3s cubic-bezier(.4,0,.2,1)',
          boxShadow: sidebarOpen ? '2px 0 16px rgba(0,0,0,0.15)' : 'none',
        }}
        aria-label="Sidebar navigation"
      >
        {/* Close button always visible on small screens */}
        <button
          className="navbar-toggle"
          style={{ display: 'block' }}
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          &times;
        </button>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </nav>
      {/* Sidebar open (hamburger) button always visible on small screens */}
      <button
        className="navbar-toggle-open"
        style={{
          display: sidebarOpen ? 'none' : 'block',
          position: 'fixed',
          top: '1.5rem',
          left: '1.5rem',
          zIndex: 101,
        }}
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        &#9776;
      </button>
      {/* Main Content */}
      <header className="App-header" style={{ marginLeft: 220, transition: 'margin-left 0.3s cubic-bezier(.4,0,.2,1)' }}>
        <div className="profile-container">
          <button
            className="profile-btn"
            onClick={() => setProfileOpen((open) => !open)}
            aria-label="Profile menu"
          >
            <span role="img" aria-label="profile">👤</span>
          </button>
          {profileOpen && (
            <div className="profile-dropdown">
              <ul>
                <li>Profile</li>
                <li>Settings</li>
                <li>Logout</li>
              </ul>
            </div>
          )}
        </div>
        <h1>Welcome to My New React App!</h1>
        <p style={{ maxWidth: 900, margin: '0 auto', fontSize: '1.7rem', marginBottom: 32 }}>
          This is a simple React application created to demonstrate a basic layout with a navigation bar and an introduction section. Explore the options above to learn more!
        </p>
        <div className="button-row">
          <button className="main-btn">Button 1</button>
          <button className="main-btn">Button 2</button>
          <button className="main-btn">Button 3</button>
          <button className="main-btn">Button 4</button>
        </div>
        <div className="slider-placeholder">
          {/* Placeholder for slider or content */}
        </div>
      </header>
      {/* Responsive adjustment: remove sidebar margin on small screens */}
      <style jsx>{`
        @media (max-width: 900px) {
          .App-header {
            margin-left: 0 !important;
          }
          .App-navbar {
            left: ${sidebarOpen ? '0' : '-240px'} !important;
            width: 220px !important;
            min-height: 100vh !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: flex-start !important;
            padding: 2rem 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
