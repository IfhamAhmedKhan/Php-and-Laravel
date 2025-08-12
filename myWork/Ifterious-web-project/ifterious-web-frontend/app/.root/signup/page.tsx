'use client';

import { useState } from "react";
import {signUp} from "../../services/sign-up"
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const payload = {
      name,
      email,
      password,
    };

    try {
      const response = await signUp(payload);
      
      if (response.success) {
        // Show success message instead of redirecting
        setSuccess('Account created successfully! You can now login.');
        // Clear form
        setName('');
        setEmail('');
        setPassword('');
      } else {
        setError(response.message || 'Signup failed');
      }
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="my-form">
        <fieldset>
          <legend>Sign Up</legend>
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{color: 'red', backgroundColor: '#ffe6e6', padding: '10px', borderRadius: '4px', marginBottom: '15px', textAlign: 'center' }}>
                {error}
              </div>
            )}
            {success && (
              <div style={{color: 'green', backgroundColor: '#e6ffe6', padding: '10px', borderRadius: '4px', marginBottom: '15px', textAlign: 'center', border: '1px solid #4CAF50' }}>
                {success}
              </div>
            )}
            <label>Username<br />
              <input type="text" placeholder="Enter your username" value={name} onChange={(e)=> setName(e.target.value)} required minLength={4} maxLength={15}/><br />
            </label>
            <label>Email<br />
              <input type="email" placeholder="Enter your email" value={email} onChange={(e)=> setEmail(e.target.value)} required/><br />
            </label>
            <label>Password<br />
              <input type="password" placeholder="Enter your password" value={password} onChange={(e)=> setPassword(e.target.value)} required minLength={6} maxLength={20}/><br />
            </label>
            <button type="submit" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button><br />
            <p>Already have an account? <Link href="/.root/login">Login</Link></p>
          </form>
        </fieldset>
      </div>
    </>
  );
}