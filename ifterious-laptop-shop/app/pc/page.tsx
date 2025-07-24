"use client";
import styles from "./pc.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', address: '', payment: 'online', phone: '', country: '+1', email: '' });
  const [error, setError] = useState<string | null>(null);
  const countryCodes = ['+1', '+44', '+91', '+92', '+61', '+81', '+49', '+33'];
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^\d{10,15}$/.test(phone);
  const validateName = (name: string) => name.length > 0 && name.length <= 15;
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleProceed = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validateName(form.name)) {
      setError('Name must be 1-15 characters.'); return;
    }
    if (!form.address || form.address.length < 5) {
      setError('Address is required.'); return;
    }
    if (!validateEmail(form.email)) {
      setError('Invalid email format.'); return;
    }
    if (!validatePhone(form.phone)) {
      setError('Invalid phone number.'); return;
    }
    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          address: form.address,
          payment: form.payment,
          phone: form.country + form.phone,
          email: form.email
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Submission failed.');
        return;
      }
      setShowForm(false);
      setSelectedIdx(null);
      setForm({ name: '', address: '', payment: 'online', phone: '', country: '+1', email: '' });
      alert('Order placed!');
    } catch (e) {
      setError('Server error.');
    }
  };
  return (
    <div className={styles.container}>
      <button onClick={() => router.push('/')} style={{ margin: "1rem 0", padding: "0.5rem 1.2rem", borderRadius: 8, border: "none", background: "#4f8cff", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "1rem" }}>Go Back</button>
      <h1>PC Page</h1>
      <h2 className={styles.welcome}>Welcome to the PC page!</h2>
      <div className={styles.cardGrid}>
        {pcItems.map((item, idx) => (
          <div className={styles.card} key={idx} onClick={() => setSelectedIdx(idx)}>
            <img src={item.image} alt={item.name} className={styles.cardImg} />
            <h3>{item.name}</h3>
            <p className={styles.price}>{item.price}</p>
            <p>{item.details}</p>
          </div>
        ))}
      </div>
      {selectedIdx !== null && (
        <div className={styles.overlay} onClick={() => { setSelectedIdx(null); setShowForm(false); }}>
          <div className={styles.expandedCard} onClick={e => e.stopPropagation()}>
            <img src={pcItems[selectedIdx].image} alt={pcItems[selectedIdx].name} style={{width: '100%', height: 220, objectFit: 'cover', borderRadius: 12, marginBottom: 16}} />
            <h2>{pcItems[selectedIdx].name}</h2>
            <p className={styles.price} style={{fontSize: '1.4rem'}}>{pcItems[selectedIdx].price}</p>
            <p style={{margin: '1rem 0'}}>{pcItems[selectedIdx].details}</p>
            {!showForm ? (
              <>
                <button style={{padding: '0.7rem 2rem', background: '#4f8cff', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer'}} onClick={() => setShowForm(true)}>Buy Now</button>
                <button onClick={() => setSelectedIdx(null)} style={{marginLeft: 16, padding: '0.7rem 2rem', background: '#eee', color: '#333', border: 'none', borderRadius: 8, fontWeight: 500, fontSize: '1.1rem', cursor: 'pointer'}}>Close</button>
              </>
            ) : (
              <form onSubmit={handleProceed} style={{marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16}}>
                {error && <div style={{color: 'red', fontWeight: 600}}>{error}</div>}
                <input name="name" value={form.name} onChange={handleFormChange} placeholder="Your Name" required maxLength={15} style={{padding: 10, borderRadius: 6, border: '1px solid #ccc'}} />
                <input name="address" value={form.address} onChange={handleFormChange} placeholder="Address" required style={{padding: 10, borderRadius: 6, border: '1px solid #ccc'}} />
                <select name="payment" value={form.payment} onChange={handleFormChange} style={{padding: 10, borderRadius: 6, border: '1px solid #ccc'}}>
                  <option value="online">Online</option>
                  <option value="cod">Cash on Delivery</option>
                </select>
                <div style={{display: 'flex', gap: 8}}>
                  <select name="country" value={form.country} onChange={handleFormChange} style={{padding: 10, borderRadius: 6, border: '1px solid #ccc', width: 90}}>
                    {countryCodes.map(code => <option key={code} value={code}>{code}</option>)}
                  </select>
                  <input name="phone" value={form.phone} onChange={handleFormChange} placeholder="Phone Number" required style={{flex: 1, padding: 10, borderRadius: 6, border: '1px solid #ccc'}} />
                </div>
                <input name="email" value={form.email} onChange={handleFormChange} placeholder="Email Address" type="email" required style={{padding: 10, borderRadius: 6, border: '1px solid #ccc'}} />
                <div style={{display: 'flex', gap: 16, marginTop: 8}}>
                  <button type="submit" style={{padding: '0.7rem 2rem', background: '#4f8cff', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer'}}>Proceed</button>
                  <button type="button" onClick={() => setShowForm(false)} style={{padding: '0.7rem 2rem', background: '#eee', color: '#333', border: 'none', borderRadius: 8, fontWeight: 500, fontSize: '1.1rem', cursor: 'pointer'}}>Not Now</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 