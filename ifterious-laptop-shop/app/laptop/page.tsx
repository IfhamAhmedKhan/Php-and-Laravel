"use client";
import styles from "./laptop.module.css";
import { useRouter } from "next/navigation";

const laptopItems = [
  {
    name: "UltraBook 14",
    price: "$900",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    details: "Intel i5, 8GB RAM, 512GB SSD, 14'' FHD",
    category: "Laptop",
  },
  {
    name: "Gaming Laptop Z",
    price: "$1500",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    details: "AMD Ryzen 7, 16GB RAM, RTX 3050, 15.6'' QHD",
    category: "Laptop",
  },
  {
    name: "Business Pro 15",
    price: "$1100",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    details: "Intel i7, 16GB RAM, 1TB SSD, 15.6'' FHD",
    category: "Laptop",
  },
  {
    name: "Student Lite",
    price: "$650",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    details: "Intel i3, 8GB RAM, 256GB SSD, 13'' HD",
    category: "Laptop",
  },
  {
    name: "Designer Touch",
    price: "$1350",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    details: "Intel i7, 16GB RAM, Touchscreen, 1TB SSD, 15'' FHD",
    category: "Laptop",
  },
];

export default function Laptop() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <button onClick={() => router.back()} style={{ margin: "1rem 0", padding: "0.5rem 1.2rem", borderRadius: 8, border: "none", background: "#4f8cff", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "1rem" }}>Go Back</button>
      <h1>Laptop Page</h1>
      <h2 className={styles.welcome}>Welcome to the Laptop page!</h2>
      <div className={styles.cardGrid}>
        {laptopItems.map((item, idx) => (
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