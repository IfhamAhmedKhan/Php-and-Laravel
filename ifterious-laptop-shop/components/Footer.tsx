const footerStyle: React.CSSProperties = {
  width: "100%",
  background: "linear-gradient(90deg, #6ee7b7 0%, #4f8cff 100%)",
  color: "#fff",
  textAlign: "center",
  padding: "1.2rem 0 1rem 0",
  fontFamily: "Segoe UI, Arial, sans-serif",
  fontSize: "1.05rem",
  letterSpacing: "0.5px",
  marginTop: "auto",
  boxShadow: "0 -2px 8px rgba(0,0,0,0.07)",
};

export default function Footer() {
  return (
    <footer style={footerStyle}>
      <div>
        &copy; {new Date().getFullYear()} Iterious Laptop Store &mdash; Your one-stop shop for PCs &amp; Laptops
      </div>
    </footer>
  );
} 