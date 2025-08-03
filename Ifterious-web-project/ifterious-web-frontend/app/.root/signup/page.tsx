'use client';

import { useState } from "react";
import {signUp} from "../../services/sign-up"

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert(`${name},${email},${password}`)

    const payload = {
      name,
      email,
      password,
    };await signUp(payload);

  }

  return (
    <>
      <div className="my-form">
        <fieldset>
          <legend>Sign Up</legend>
          <form onSubmit={handleSubmit}>
            <label>
              Username<br />
              <input type="text" placeholder="Enter your username" value={name} onChange={(e)=> setName(e.target.value)}/><br />
            </label>
            <label>
              Email<br />
              <input type="email" placeholder="Enter your email" value={email} onChange={(e)=> setEmail(e.target.value)} /><br />
            </label>
            <label>
              Password<br />
              <input type="password" placeholder="Enter your password" value={password} onChange={(e)=> setPassword(e.target.value)} /><br />
            </label>
            <button type="submit">Sign Up</button><br />
            <p>Already have an account? <a href="/.root/login">Login</a></p>
          </form>
        </fieldset>
      </div>
    </>
  );
}