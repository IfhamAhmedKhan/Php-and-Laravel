"use client";
import styles from "./about.module.css";
import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <button
        onClick={() => router.push('/')}
        style={{
          margin: "1rem 0",
          padding: "0.6rem 1.4rem",
          borderRadius: 8,
          border: "none",
          background: "#4f8cff",
          color: "#fff",
          fontWeight: 600,
          cursor: "pointer",
          fontSize: "1rem",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#3b82f6")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#4f8cff")}
      >
        ← Go Back
      </button>

      <div className={styles.block}>
        <h1>About Us</h1>
        <h2 className={styles.welcome}>👋 Welcome to Ifterious!</h2>
        <p>
          <strong>Ifterious Laptop Store</strong> is your go-to hub for{" "}
          <span style={{ color: "#4f8cff", fontWeight: 600 }}>
            high-quality laptops
          </span>{" "}
          and unbeatable tech solutions. Whether you're a student, a gaming
          enthusiast, or a professional — we’ve got the perfect machine for you.
        </p>

        <p>
          💡 At Ifterious, we believe the{" "}
          <em style={{ fontWeight: 500 }}>right technology</em> empowers you to
          go further. That’s why we offer a handpicked selection of laptops —
          from essential day-to-day tools to ultra-fast performance beasts —
          all backed by{" "}
          <span style={{ color: "#10b981", fontWeight: 600 }}>
            exceptional customer support
          </span>
          .
        </p>

        <p>
          🧠 Our team is made up of passionate tech experts who understand your
          needs. Whether you're{" "}
          <span style={{ fontStyle: "italic" }}>upgrading your gear</span>,
          seeking honest advice, or just exploring your options — we’re here to
          help, every step of the way.
        </p>

        <p>
          🤝 We’re not just a store. We're building{" "}
          <span style={{ fontWeight: 600 }}>relationships</span> based on{" "}
          <span style={{ color: "#f59e0b" }}>trust</span>,{" "}
          <span style={{ color: "#3b82f6" }}>quality</span>, and a shared love
          for all things tech.
        </p>

        <p style={{ marginTop: "1rem", fontWeight: 600 }}>
          🚀 Ifterious Laptop Store — <em>Power Up Your Potential</em>.
        </p>
      </div>
    </div>
  );
}
