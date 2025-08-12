"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../contexts/UserContext";

const loginContainerStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem",
  background: "linear-gradient(135deg, rgba(79,140,255,0.1) 0%, rgba(110,231,183,0.1) 100%)",
};

const loginCardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.95)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: "3rem",
  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  width: "100%",
  maxWidth: "400px",
  border: "1px solid rgba(255,255,255,0.2)",
};

const titleStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: "2rem",
  fontWeight: "700",
  color: "#333",
  marginBottom: "0.5rem",
  fontFamily: "Orbitron, sans-serif",
};

const subtitleStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#666",
  marginBottom: "2rem",
  fontSize: "1rem",
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
};

const inputGroupStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const labelStyle: React.CSSProperties = {
  fontWeight: "600",
  color: "#333",
  fontSize: "0.9rem",
};

const inputStyle: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: "8px",
  border: "2px solid #e1e5e9",
  fontSize: "1rem",
  transition: "all 0.2s",
  background: "#fff",
};

const inputFocusStyle: React.CSSProperties = {
  border: "2px solid #4f8cff",
  boxShadow: "0 0 0 3px rgba(79,140,255,0.1)",
  outline: "none",
};

const loginButtonStyle: React.CSSProperties = {
  background: "linear-gradient(90deg, #4f8cff 0%, #6ee7b7 100%)",
  color: "#fff",
  padding: "14px",
  borderRadius: "8px",
  border: "none",
  fontSize: "1rem",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.2s",
  marginTop: "1rem",
};

const loginButtonHoverStyle: React.CSSProperties = {
  transform: "translateY(-2px)",
  boxShadow: "0 8px 25px rgba(79,140,255,0.3)",
};

const loginButtonDisabledStyle: React.CSSProperties = {
  background: "#ccc",
  cursor: "not-allowed",
  transform: "none",
  boxShadow: "none",
};

const dividerTextStyle: React.CSSProperties = {
  padding: "0 1rem",
  color: "#666",
  fontSize: "0.9rem",
};

const socialButtonsContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  marginTop: "1rem",
};

const googleButtonStyle: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: "8px",
  border: "2px solid #4285f4",
  background: "#fff",
  color: "#4285f4",
  cursor: "pointer",
  transition: "all 0.2s",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: "0.9rem",
  fontWeight: "500",
};

const googleButtonHoverStyle: React.CSSProperties = {
  background: "#4285f4",
  color: "#fff",
  transform: "translateY(-1px)",
  boxShadow: "0 4px 12px rgba(66,133,244,0.3)",
};

const appleButtonStyle: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: "8px",
  border: "2px solid #000",
  background: "#000",
  color: "#fff",
  cursor: "pointer",
  transition: "all 0.2s",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: "0.9rem",
  fontWeight: "500",
};

const appleButtonHoverStyle: React.CSSProperties = {
  background: "#333",
  border: "2px solid #333",
  transform: "translateY(-1px)",
  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
};

const socialIconStyle: React.CSSProperties = {
  width: "20px",
  height: "20px",
  objectFit: "contain",
};

const forgotPasswordStyle: React.CSSProperties = {
  textAlign: "center",
  marginTop: "1rem",
};

const forgotPasswordLinkStyle: React.CSSProperties = {
  color: "#4f8cff",
  textDecoration: "none",
  fontSize: "0.9rem",
  fontWeight: "500",
  transition: "color 0.2s",
};

const forgotPasswordLinkHoverStyle: React.CSSProperties = {
  color: "#6ee7b7",
  textDecoration: "underline",
};

const dividerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  margin: "2rem 0",
  color: "#666",
  fontSize: "0.9rem",
};

const dividerLineStyle: React.CSSProperties = {
  flex: "1",
  height: "1px",
  background: "#e1e5e9",
};

const socialButtonsStyle: React.CSSProperties = {
  display: "flex",
  gap: "1rem",
  justifyContent: "center",
};

const socialButtonStyle: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: "8px",
  border: "2px solid #e1e5e9",
  background: "#fff",
  cursor: "pointer",
  transition: "all 0.2s",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: "0.9rem",
  fontWeight: "500",
};

const socialButtonHoverStyle: React.CSSProperties = {
  border: "2px solid #4f8cff",
  transform: "translateY(-1px)",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const signupLinkStyle: React.CSSProperties = {
  textAlign: "center",
  marginTop: "2rem",
  color: "#666",
  fontSize: "0.9rem",
};

const signupLinkAnchorStyle: React.CSSProperties = {
  color: "#4f8cff",
  textDecoration: "none",
  fontWeight: "600",
  marginLeft: "0.5rem",
};

const checkboxContainerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  marginTop: "0.5rem",
};

const checkboxStyle: React.CSSProperties = {
  width: "16px",
  height: "16px",
  accentColor: "#4f8cff",
};

const checkboxLabelStyle: React.CSSProperties = {
  fontSize: "0.9rem",
  color: "#666",
};

const messageStyle: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: "8px",
  marginBottom: "1rem",
  fontSize: "0.9rem",
  fontWeight: "500",
};

const successMessageStyle: React.CSSProperties = {
  ...messageStyle,
  background: "#d1fae5",
  color: "#065f46",
  border: "1px solid #a7f3d0",
};

const errorMessageStyle: React.CSSProperties = {
  ...messageStyle,
  background: "#fee2e2",
  color: "#991b1b",
  border: "1px solid #fecaca",
};

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID";
const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || "http://localhost:3000/api/auth/google";
const GOOGLE_OAUTH_URL =
  "https://accounts.google.com/o/oauth2/v2/auth" +
  `?client_id=${GOOGLE_CLIENT_ID}` +
  `&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}` +
  `&response_type=code` +
  `&scope=openid%20email%20profile` +
  `&prompt=select_account`;

const APPLE_CLIENT_ID = process.env.NEXT_PUBLIC_APPLE_CLIENT_ID || "YOUR_APPLE_CLIENT_ID";
const APPLE_REDIRECT_URI = process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI || "http://localhost:3000/api/auth/apple";
const APPLE_OAUTH_URL =
  "https://appleid.apple.com/auth/authorize" +
  `?client_id=${APPLE_CLIENT_ID}` +
  `&redirect_uri=${encodeURIComponent(APPLE_REDIRECT_URI)}` +
  `&response_type=code` +
  `&scope=name%20email` +
  `&response_mode=form_post`;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [hovered, setHovered] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear message when user starts typing
    if (message) setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Login successful! Redirecting to home...' });
        
        // Use the context login function
        login(data.user);
        
        // Store user data in localStorage if remember me is checked
        if (formData.rememberMe) {
          localStorage.setItem('user', JSON.stringify(data.user));
        } else {
          sessionStorage.setItem('user', JSON.stringify(data.user));
        }
        
        // Clear form
        setFormData({
          email: "",
          password: "",
          rememberMe: false,
        });
        
        // Redirect to home page after 1.5 seconds
        setTimeout(() => {
          router.push('/home');
        }, 1500);
      } else {
        setMessage({ type: 'error', text: data.error || 'Invalid email or password!' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={loginContainerStyle}>
      <div style={loginCardStyle}>
        <h1 style={titleStyle}>Welcome Back</h1>
        <p style={subtitleStyle}>Sign in to your account</p>
        
        {message && (
          <div style={message.type === 'success' ? successMessageStyle : errorMessageStyle}>
            {message.text}
          </div>
        )}
        
        <form style={formStyle} onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label style={labelStyle} htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>
          
          <div style={inputGroupStyle}>
            <label style={labelStyle} htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>
          
          <div style={checkboxContainerStyle}>
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              style={checkboxStyle}
              disabled={isLoading}
            />
            <label style={checkboxLabelStyle} htmlFor="rememberMe">
              Remember me
            </label>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            style={
              isLoading
                ? { ...loginButtonStyle, ...loginButtonDisabledStyle }
                : hovered === "login"
                ? { ...loginButtonStyle, ...loginButtonHoverStyle }
                : loginButtonStyle
            }
            onMouseEnter={() => !isLoading && setHovered("login")}
            onMouseLeave={() => setHovered(null)}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        
        <div style={forgotPasswordStyle}>
          <Link
            href="/forgot-password"
            style={
              hovered === "forgot"
                ? { ...forgotPasswordLinkStyle, ...forgotPasswordLinkHoverStyle }
                : forgotPasswordLinkStyle
            }
            onMouseEnter={() => setHovered("forgot")}
            onMouseLeave={() => setHovered(null)}
          >
            Forgot your password?
          </Link>
        </div>
        
        <div style={dividerStyle}>
          <div style={dividerLineStyle}></div>
          <span style={{ padding: "0 1rem" }}>or continue with</span>
          <div style={dividerLineStyle}></div>
        </div>
        
        <div style={socialButtonsContainerStyle}>
          <button
            style={
              hovered === "google"
                ? { ...googleButtonStyle, ...googleButtonHoverStyle }
                : googleButtonStyle
            }
            onMouseEnter={() => setHovered("google")}
            onMouseLeave={() => setHovered(null)}
            type="button"
            disabled={isLoading}
            onClick={() => {
              console.log('Google OAuth URL:', GOOGLE_OAUTH_URL);
              console.log('Redirecting to Google OAuth...');
              window.location.href = GOOGLE_OAUTH_URL;
            }}
          >
            <svg style={socialIconStyle} viewBox="0 0 24 24">
              <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
          <button
            style={
              hovered === "apple"
                ? { ...appleButtonStyle, ...appleButtonHoverStyle }
                : appleButtonStyle
            }
            onMouseEnter={() => setHovered("apple")}
            onMouseLeave={() => setHovered(null)}
            type="button"
            disabled={isLoading}
            onClick={() => window.location.href = APPLE_OAUTH_URL}
          >
            <svg style={socialIconStyle} viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Continue with Apple
          </button>
        </div>
        
        <div style={signupLinkStyle}>
          Don't have an account?
          <Link href="/signup" style={signupLinkAnchorStyle}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
} 