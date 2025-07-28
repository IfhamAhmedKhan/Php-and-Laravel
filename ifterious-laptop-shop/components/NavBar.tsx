"use client";

import Link from "next/link";
import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useRouter } from "next/navigation";

const navStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "70px",
  background: "linear-gradient(90deg, #4f8cff 0%, #6ee7b7 100%)",
  boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
  position: "relative",
  padding: "0 1rem",
};

const logoStyle: React.CSSProperties = {
  position: "absolute",
  left: "1rem",
  fontFamily: "Orbitron, sans-serif",
  fontWeight: 700,
  fontSize: "1.3rem",
  color: "#fff",
  letterSpacing: "1px",
  textShadow: "0 2px 8px rgba(79,140,255,0.18)",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  whiteSpace: "nowrap",
};

const ulStyle = {
  display: "flex",
  gap: "1.5rem",
  listStyle: "none",
  margin: 0,
  padding: 0,
  flexWrap: "wrap",
  justifyContent: "center",
};

const linkStyle = {
  color: "#fff",
  fontWeight: 600,
  fontSize: "1rem",
  textDecoration: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
  whiteSpace: "nowrap",
};

const linkHoverStyle = {
  background: "rgba(255,255,255,0.18)",
  color: "#222",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const authButtonsContainer: React.CSSProperties = {
  position: "absolute",
  right: "1rem",
  display: "flex",
  gap: "0.75rem",
  alignItems: "center",
};

const authButtonStyle = {
  color: "#fff",
  fontWeight: "600",
  fontSize: "0.9rem",
  textDecoration: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  transition: "all 0.2s",
  border: "2px solid rgba(255,255,255,0.3)",
  background: "rgba(255,255,255,0.1)",
  whiteSpace: "nowrap",
};

const authButtonHoverStyle = {
  background: "rgba(255,255,255,0.2)",
  border: "2px solid rgba(255,255,255,0.5)",
  transform: "translateY(-1px)",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
};

const signUpButtonStyle = {
  ...authButtonStyle,
  background: "rgba(255,255,255,0.2)",
  border: "2px solid rgba(255,255,255,0.4)",
};

const signUpButtonHoverStyle = {
  background: "rgba(255,255,255,0.3)",
  border: "2px solid rgba(255,255,255,0.6)",
  transform: "translateY(-1px)",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
};

const logoutButtonStyle = {
  ...authButtonStyle,
  background: "rgba(239,68,68,0.2)",
  border: "2px solid rgba(239,68,68,0.4)",
  color: "#fff",
};

const logoutButtonHoverStyle = {
  background: "rgba(239,68,68,0.3)",
  border: "2px solid rgba(239,68,68,0.6)",
  transform: "translateY(-1px)",
  boxShadow: "0 4px 12px rgba(239,68,68,0.2)",
};

const userInfoStyle: React.CSSProperties = {
  position: "absolute",
  right: "1rem",
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  color: "#fff",
  fontSize: "0.85rem",
  flexWrap: "wrap",
  maxWidth: "300px",
};

const usernameStyle: React.CSSProperties = {
  fontWeight: "600",
  color: "#fff",
  fontSize: "0.85rem",
  whiteSpace: "nowrap",
};

const NavBar = () => {
  const { user, logout } = useUser();
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);
  
  const baseLinks = [
    { href: "/home", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/pc", label: "PC" },
    { href: "/laptop", label: "Laptop" },
  ];

  const handleLogout = () => {
    logout();
    router.push('/home');
  };

  return (
    <nav style={navStyle}>
      <Link href="/home" style={logoStyle}>
        <span role="img" aria-label="laptop">💻</span> Iterious
        <span style={{ color: "#f59e42", fontWeight: 900 }}>Laptop Store</span>
      </Link>
      <ul style={ulStyle}>
        {baseLinks.map((link, idx) => (
          <li key={link.href}>
            <Link
              href={link.href}
              style={
                hovered === `nav-${idx}`
                  ? { ...linkStyle, ...linkHoverStyle }
                  : linkStyle
              }
              onMouseEnter={() => setHovered(`nav-${idx}`)}
              onMouseLeave={() => setHovered(null)}
            >
              {link.label}
            </Link>
          </li>
        ))}
        {user && (
          <li>
            <Link
              href="/orders"
              style={
                hovered === "orders"
                  ? { ...linkStyle, ...linkHoverStyle }
                  : linkStyle
              }
              onMouseEnter={() => setHovered("orders")}
              onMouseLeave={() => setHovered(null)}
            >
              📦 Orders
            </Link>
          </li>
        )}
      </ul>
      
      {user ? (
        // User is logged in - show logout button and username
        <div style={userInfoStyle}>
          <span style={usernameStyle}>
            Welcome, {user.username}!
          </span>
          <button
            onClick={handleLogout}
            style={
              hovered === "logout"
                ? { ...logoutButtonStyle, ...logoutButtonHoverStyle }
                : logoutButtonStyle
            }
            onMouseEnter={() => setHovered("logout")}
            onMouseLeave={() => setHovered(null)}
          >
            Logout
          </button>
        </div>
      ) : (
        // User is not logged in - show login and signup buttons
        <div style={authButtonsContainer}>
          <Link
            href="/login"
            style={
              hovered === "login"
                ? { ...authButtonStyle, ...authButtonHoverStyle }
                : authButtonStyle
            }
            onMouseEnter={() => setHovered("login")}
            onMouseLeave={() => setHovered(null)}
          >
            Login
          </Link>
          <Link
            href="/signup"
            style={
              hovered === "signup"
                ? { ...signUpButtonStyle, ...signUpButtonHoverStyle }
                : signUpButtonStyle
            }
            onMouseEnter={() => setHovered("signup")}
            onMouseLeave={() => setHovered(null)}
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar; 