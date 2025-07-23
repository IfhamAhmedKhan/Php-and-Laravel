"use client";

import Link from "next/link";
import { useState } from "react";

const navStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "70px",
  background: "linear-gradient(90deg, #4f8cff 0%, #6ee7b7 100%)",
  boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
  position: "relative",
};

const logoStyle: React.CSSProperties = {
  position: "absolute",
  left: "2rem",
  fontFamily: "Orbitron, sans-serif",
  fontWeight: 700,
  fontSize: "1.5rem",
  color: "#fff",
  letterSpacing: "2px",
  textShadow: "0 2px 8px rgba(79,140,255,0.18)",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
};

const ulStyle = {
  display: "flex",
  gap: "2.5rem",
  listStyle: "none",
  margin: 0,
  padding: 0,
};

const linkStyle = {
  color: "#fff",
  fontWeight: 600,
  fontSize: "1.15rem",
  textDecoration: "none",
  padding: "8px 18px",
  borderRadius: "8px",
  transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
};

const linkHoverStyle = {
  background: "rgba(255,255,255,0.18)",
  color: "#222",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const NavBar = () => {
  const [hovered, setHovered] = useState(-1);
  const links = [
    { href: "/home", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/pc", label: "PC" },
    { href: "/laptop", label: "Laptop" },
  ];
  return (
    <nav style={navStyle}>
      <Link href="/home" style={logoStyle}>
        <span role="img" aria-label="laptop">💻</span> Iterious
        <span style={{ color: "#f59e42", fontWeight: 900 }}>Laptop Store</span>
      </Link>
      <ul style={ulStyle}>
        {links.map((link, idx) => (
          <li key={link.href}>
            <Link
              href={link.href}
              style={
                hovered === idx
                  ? { ...linkStyle, ...linkHoverStyle }
                  : linkStyle
              }
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(-1)}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar; 