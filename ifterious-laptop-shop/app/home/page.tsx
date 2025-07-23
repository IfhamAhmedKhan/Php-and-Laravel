"use client";

import styles from "./home.module.css";
import { useState } from "react";
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
];

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
];

const allItems = [...pcItems, ...laptopItems];

export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<typeof allItems | null>(null);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = allItems.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setResults(filtered.length > 0 ? filtered : []);
  };

  return (
    <div className={styles.container}>
      <button onClick={() => router.back()} style={{ margin: "1rem 0", padding: "0.5rem 1.2rem", borderRadius: 8, border: "none", background: "#4f8cff", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "1rem" }}>Go Back</button>
      <h1>Home Page</h1>
      <h2 className={styles.welcome}>Welcome to the Home page!</h2>
      <p>Enjoy exploring our site.</p>
      <div className={styles.searchBlock}>
        <form onSubmit={handleSearch} style={{ margin: 0, display: "flex", gap: "1rem", justifyContent: "center" }}>
          <input
            type="text"
            placeholder="Search for a product..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: "0.7rem 1.2rem", borderRadius: 8, border: "1px solid #b3b3b3", fontSize: "1rem", minWidth: 220 }}
          />
          <button type="submit" style={{ padding: "0.7rem 1.5rem", borderRadius: 8, background: "#4f8cff", color: "#fff", border: "none", fontWeight: 600, fontSize: "1rem", cursor: "pointer" }}>
            Search
          </button>
        </form>
        {results && (
          <div style={{ marginTop: 24, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            {results.length === 0 ? (
              <div style={{ color: "#f00", fontWeight: 600, fontSize: "1.2rem" }}>Product not found</div>
            ) : (
              <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center" }}>
                {results.map((item, idx) => (
                  <div key={idx} style={{ background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px rgba(99,102,241,0.10)", padding: "1.5rem", width: 260, textAlign: "center" }}>
                    <img src={item.image} alt={item.name} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 10, marginBottom: 16 }} />
                    <h3>{item.name}</h3>
                    <p style={{ color: item.category === "PC" ? "#4f8cff" : "#f59e42", fontWeight: "bold", fontSize: "1.1rem", margin: "0.5rem 0" }}>{item.price}</p>
                    <p>{item.details}</p>
                    <span style={{ fontSize: 13, color: "#888" }}>{item.category}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 