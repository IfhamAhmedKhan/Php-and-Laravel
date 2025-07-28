"use client";

import Link from "next/link";
import { useState } from "react";

const signupContainerStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem",
  background: "linear-gradient(135deg, rgba(79,140,255,0.1) 0%, rgba(110,231,183,0.1) 100%)",
};

const signupCardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.95)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: "3rem",
  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  width: "100%",
  maxWidth: "450px",
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

const signupButtonStyle: React.CSSProperties = {
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

const signupButtonHoverStyle: React.CSSProperties = {
  transform: "translateY(-2px)",
  boxShadow: "0 8px 25px rgba(79,140,255,0.3)",
};

const checkboxContainerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: "0.5rem",
  marginTop: "0.5rem",
};

const checkboxStyle: React.CSSProperties = {
  width: "16px",
  height: "16px",
  accentColor: "#4f8cff",
  marginTop: "2px",
};

const checkboxLabelStyle: React.CSSProperties = {
  fontSize: "0.9rem",
  color: "#666",
  lineHeight: "1.4",
};

const termsLinkStyle: React.CSSProperties = {
  color: "#4f8cff",
  textDecoration: "none",
  fontWeight: "500",
};

const termsLinkHoverStyle: React.CSSProperties = {
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

const loginLinkStyle: React.CSSProperties = {
  textAlign: "center",
  marginTop: "2rem",
  color: "#666",
  fontSize: "0.9rem",
};

const loginLinkAnchorStyle: React.CSSProperties = {
  color: "#4f8cff",
  textDecoration: "none",
  fontWeight: "600",
  marginLeft: "0.5rem",
};

const passwordStrengthStyle: React.CSSProperties = {
  fontSize: "0.8rem",
  marginTop: "0.25rem",
  fontWeight: "500",
};

const passwordMatchStyle: React.CSSProperties = {
  fontSize: "0.8rem",
  marginTop: "0.25rem",
  fontWeight: "500",
};

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [hovered, setHovered] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!formData.acceptTerms) {
      alert("Please accept the terms and conditions!");
      return;
    }
    // Handle signup logic here
    console.log("Signup attempt:", formData);
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { text: "", color: "#666" };
    if (password.length < 6) return { text: "Weak", color: "#ef4444" };
    if (password.length < 10) return { text: "Medium", color: "#f59e0b" };
    return { text: "Strong", color: "#10b981" };
  };

  const getPasswordMatch = (password: string, confirmPassword: string) => {
    if (confirmPassword.length === 0) return { text: "", color: "#666" };
    if (password === confirmPassword) return { text: "Passwords match", color: "#10b981" };
    return { text: "Passwords do not match", color: "#ef4444" };
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const passwordMatch = getPasswordMatch(formData.password, formData.confirmPassword);

  return (
    <div style={signupContainerStyle}>
      <div style={signupCardStyle}>
        <h1 style={titleStyle}>Create Account</h1>
        <p style={subtitleStyle}>Join us and start shopping today</p>
        
        <form style={formStyle} onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label style={labelStyle} htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="Enter your username"
              required
            />
          </div>
          
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
            />
            {formData.password && (
              <div style={{ ...passwordStrengthStyle, color: passwordStrength.color }}>
                Password strength: {passwordStrength.text}
              </div>
            )}
          </div>
          
          <div style={inputGroupStyle}>
            <label style={labelStyle} htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="Confirm your password"
              required
            />
            {formData.confirmPassword && (
              <div style={{ ...passwordMatchStyle, color: passwordMatch.color }}>
                {passwordMatch.text}
              </div>
            )}
          </div>
          
          <div style={checkboxContainerStyle}>
            <input
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleInputChange}
              style={checkboxStyle}
              required
            />
            <label style={checkboxLabelStyle} htmlFor="acceptTerms">
              I agree to the{" "}
              <Link
                href="/terms"
                style={
                  hovered === "terms"
                    ? { ...termsLinkStyle, ...termsLinkHoverStyle }
                    : termsLinkStyle
                }
                onMouseEnter={() => setHovered("terms")}
                onMouseLeave={() => setHovered(null)}
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                style={
                  hovered === "privacy"
                    ? { ...termsLinkStyle, ...termsLinkHoverStyle }
                    : termsLinkStyle
                }
                onMouseEnter={() => setHovered("privacy")}
                onMouseLeave={() => setHovered(null)}
              >
                Privacy Policy
              </Link>
            </label>
          </div>
          
          <button
            type="submit"
            style={
              hovered === "signup"
                ? { ...signupButtonStyle, ...signupButtonHoverStyle }
                : signupButtonStyle
            }
            onMouseEnter={() => setHovered("signup")}
            onMouseLeave={() => setHovered(null)}
          >
            Create Account
          </button>
        </form>
        
        <div style={dividerStyle}>
          <div style={dividerLineStyle}></div>
          <span style={{ padding: "0 1rem" }}>or sign up with</span>
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
          >
            <span role="img" aria-label="facebook">📘</span>
            Facebook
          </button>
        </div>
        
        <div style={loginLinkStyle}>
          Already have an account?
          <Link href="/login" style={loginLinkAnchorStyle}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
} 