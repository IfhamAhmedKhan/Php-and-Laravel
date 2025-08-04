'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProfile } from '../../services/profile';

interface User {
  name: string;
  email: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const router = useRouter();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await getProfile();
      setUser(response.user);
    } catch (err: any) {
      setError(err.message);
      if (err.message.includes('token') || err.message.includes('unauthorized')) {
        router.push('/.root/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear cookies by setting them to expire
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/');
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Ifterious Web</h2>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-header">
          <h1>Welcome to Ifterious Web</h1>
        </div>

        <div className="content-body">
          {activeTab === 'dashboard' && (
            <div className="dashboard-content">
              <h2>Dashboard</h2>
              <p>Welcome back! This is your main dashboard.</p>
              <div className="dashboard-stats">
                <div className="stat-card">
                  <h3>Account Status</h3>
                  <p>Active</p>
                </div>
                <div className="stat-card">
                  <h3>Member Since</h3>
                  <p>Today</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="profile-content">
              <h2>Profile Information</h2>
              {user && (
                <div className="profile-details">
                  <div className="profile-field">
                    <label>Name:</label>
                    <span>{user.name}</span>
                  </div>
                  <div className="profile-field">
                    <label>Email:</label>
                    <span>{user.email}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 