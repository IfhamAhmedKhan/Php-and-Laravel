"use client";
import styles from "./pc.module.css";
import { useRouter } from "next/navigation";

const pcItems = [
  {
    name: "Gaming PC X1",
    price: "$1200",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    details: "Intel i7, 16GB RAM, RTX 3060, 1TB SSD",
    category: "PC",
  },
  {
    name: "Workstation Pro",
    price: "$1800",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    details: "AMD Ryzen 9, 32GB RAM, RTX 3070, 2TB SSD",
    category: "PC",
  },
  {
    name: "Creator Studio",
    price: "$1500",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    details: "Intel i9, 32GB RAM, RTX 3080, 2TB SSD",
    category: "PC",
  },
  {
    name: "Budget Build",
    price: "$700",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    details: "Intel i5, 8GB RAM, GTX 1650, 512GB SSD",
    category: "PC",
  },
  {
    name: "Silent Office",
    price: "$950",
    image: "https://images.unsplash.com/photo-1515168833906-d2a3b82b3029?auto=format&fit=crop&w=400&q=80",
    details: "Intel i5, 16GB RAM, Integrated Graphics, 1TB SSD",
    category: "PC",
  },
];

export default function PC() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <button onClick={() => router.back()} style={{ margin: "1rem 0", padding: "0.5rem 1.2rem", borderRadius: 8, border: "none", background: "#4f8cff", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "1rem" }}>Go Back</button>
      <h1>PC Page</h1>
      <h2 className={styles.welcome}>Welcome to the PC page!</h2>
      <div className={styles.cardGrid}>
        {pcItems.map((item, idx) => (
          <div className={styles.card} key={idx}>
            <img src={item.image} alt={item.name} className={styles.cardImg} />
            <h3>{item.name}</h3>
            <p className={styles.price}>{item.price}</p>
            <p>{item.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 