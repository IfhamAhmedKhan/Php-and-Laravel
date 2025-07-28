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
        
        <div style={socialButtonsStyle}>
          <button
            style={
              hovered === "google"
                ? { ...socialButtonStyle, ...socialButtonHoverStyle }
                : socialButtonStyle
            }
            onMouseEnter={() => setHovered("google")}
            onMouseLeave={() => setHovered(null)}
            type="button"
            disabled={isLoading}
          >
            <span role="img" aria-label="google">🔍</span>
            Google
          </button>
          <button
            style={
              hovered === "facebook"
                ? { ...socialButtonStyle, ...socialButtonHoverStyle }
                : socialButtonStyle
            }
            onMouseEnter={() => setHovered("facebook")}
            onMouseLeave={() => setHovered(null)}
            type="button"
            disabled={isLoading}
          >
            <span role="img" aria-label="facebook">📘</span>
            Facebook
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