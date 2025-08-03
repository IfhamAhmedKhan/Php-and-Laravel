'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../services/login";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        email,
        password,
      };
      
      const response = await login(payload);
      
      if (response.success) {
        // Redirect to dashboard on successful login
        router.push('/.root/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="my-form">
        <fieldset>
          <legend>Login</legend>
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ 
                color: 'red', 
                backgroundColor: '#ffe6e6', 
                padding: '10px', 
                borderRadius: '4px', 
                marginBottom: '15px',
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}
            
            <label>
              Email<br />
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required
              /><br />
            </label>
            
            <label>
              Password<br />
              <input 
                type="password" 
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                required
              /><br />
            </label>
            
            <p><a href="#">Forgot password?</a></p>
            
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button><br />
            
            <p>Don't have an account? <a href="/.root/signup">Sign up</a></p>
          </form>
        </fieldset>
      </div>
    </>
  );
} 