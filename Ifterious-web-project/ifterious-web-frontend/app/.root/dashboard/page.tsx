'use client';

import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <>
      <div className="my-form">
        <fieldset>
          <legend>Dashboard</legend>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: 'black', marginBottom: '20px' }}>Welcome to Your Dashboard!</h2>
            <div style={{backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
              <p style={{ color: 'black', marginBottom: '10px' }}> You have successfully logged in! </p>
              <p style={{ color: 'black', fontSize: '0.9rem' }}> This is your personal dashboard where you can manage your account. </p>
            </div>
            <button onClick={handleLogout} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer'}}> Logout </button>
          </div>
        </fieldset>
      </div>
    </>
  );
} 