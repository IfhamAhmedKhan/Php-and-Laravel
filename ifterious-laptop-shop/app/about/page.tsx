"use client";
import styles from "./about.module.css";
import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <button onClick={() => router.back()} style={{ margin: "1rem 0", padding: "0.5rem 1.2rem", borderRadius: 8, border: "none", background: "#4f8cff", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "1rem" }}>Go Back</button>
      <div className={styles.block}>
        <h1>About Us</h1>
        <h2 className={styles.welcome}>Welcome to the About Us page!</h2>
        <p>Learn more about us on this page.</p>
      </div>
    </div>
  );
} 