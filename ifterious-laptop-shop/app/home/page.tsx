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
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', address: '', payment: 'online', phone: '', country: '+1', email: '' });
  const [error, setError] = useState<string | null>(null);
  const [showCardForm, setShowCardForm] = useState(false);
  const [card, setCard] = useState({ cardName: '', cardNumber: '', expiry: '', cvv: '' });
  const [cardError, setCardError] = useState<string | null>(null);
  const countryCodes = ['+1', '+44', '+91', '+92', '+61', '+81', '+49', '+33'];
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^\d{10,15}$/.test(phone);
  const validateName = (name: string) => name.length > 0 && name.length <= 15;
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };
  const validateCard = () => {
    if (!card.cardName || card.cardName.length > 26) return 'Cardholder name required (max 26 chars)';
    if (!/^\d{16}$/.test(card.cardNumber)) return 'Card number must be 16 digits';
    if (!/^\d{2}\/\d{2}$/.test(card.expiry)) return 'Expiry must be MM/YY';
    if (!/^\d{3,4}$/.test(card.cvv)) return 'CVV must be 3 or 4 digits';
    return null;
  };
  const handleProceed = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validateName(form.name)) { setError('Name must be 1-15 characters.'); return; }
    if (!form.address || form.address.length < 5) { setError('Address is required.'); return; }
    if (!validateEmail(form.email)) { setError('Invalid email format.'); return; }
    if (!validatePhone(form.phone)) { setError('Invalid phone number.'); return; }
    if (form.payment === 'online') {
      setShowCardForm(true);
      return;
    }
    await submitOrder();
  };
  const submitOrder = async () => {
    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          address: form.address,
          payment: form.payment,
          phone: form.country + form.phone,
          email: form.email,
          ...(form.payment === 'online' ? { card } : {})
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Submission failed.');
        return;
      }
      setShowForm(false);
      setShowCardForm(false);
      setSelectedIdx(null);
      setForm({ name: '', address: '', payment: 'online', phone: '', country: '+1', email: '' });
      setCard({ cardName: '', cardNumber: '', expiry: '', cvv: '' });
      alert('Order placed!');
    } catch (e) {
      setError('Server error.');
    }
  };
  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCardError(null);
    const err = validateCard();
    if (err) { setCardError(err); return; }
    await submitOrder();
  };
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
      <button onClick={() => router.push('/')} style={{ margin: "1rem 0", padding: "0.5rem 1.2rem", borderRadius: 8, border: "none", background: "#4f8cff", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "1rem" }}>Go Back</button>
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
                  <div key={idx} style={{ background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px rgba(99,102,241,0.10)", padding: "1.5rem", width: 260, textAlign: "center", cursor: 'pointer' }} onClick={() => setSelectedIdx(idx)}>
                    <img src={item.image} alt={item.name} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 10, marginBottom: 16 }} />
                    <h3>{item.name}</h3>
                    <p style={{ color: item.category === "PC" ? "#4f8cff" : "#f59e42", fontWeight: "bold", fontSize: "1.1rem", margin: "0.5rem 0" }}>{item.price}</p>
                    <p>{item.details}</p>
                    <span style={{ fontSize: 13, color: "#888" }}>{item.category}</span>
                  </div>
                ))}
              </div>
            )}
            {selectedIdx !== null && results && results[selectedIdx] && (
              <div className={styles.overlay} onClick={() => { setSelectedIdx(null); setShowForm(false); }}>
                <div className={styles.expandedCard} onClick={e => e.stopPropagation()}>
                  <img src={results[selectedIdx].image} alt={results[selectedIdx].name} style={{width: '100%', height: 220, objectFit: 'cover', borderRadius: 12, marginBottom: 16}} />
                  <h2>{results[selectedIdx].name}</h2>
                  <p style={{color: results[selectedIdx].category === 'PC' ? '#4f8cff' : '#f59e42', fontWeight: 'bold', fontSize: '1.4rem'}}>{results[selectedIdx].price}</p>
                  <p style={{margin: '1rem 0'}}>{results[selectedIdx].details}</p>
                  <span style={{ fontSize: 15, color: '#888', display: 'block', marginBottom: 16 }}>{results[selectedIdx].category}</span>
                  {!showForm ? (
                    <>
                      <button style={{padding: '0.7rem 2rem', background: results[selectedIdx].category === 'PC' ? '#4f8cff' : '#f59e42', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer'}} onClick={() => setShowForm(true)}>Buy Now</button>
                      <button onClick={() => setSelectedIdx(null)} style={{marginLeft: 16, padding: '0.7rem 2rem', background: '#eee', color: '#333', border: 'none', borderRadius: 8, fontWeight: 500, fontSize: '1.1rem', cursor: 'pointer'}}>Close</button>
                    </>
                  ) : (
                    <>
                      <form onSubmit={handleProceed} style={{marginTop: 24, display: showCardForm ? 'none' : 'flex', flexDirection: 'column', gap: 16}}>
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
                          <button type="submit" style={{padding: '0.7rem 2rem', background: results[selectedIdx].category === 'PC' ? '#4f8cff' : '#f59e42', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer'}}>Proceed</button>
                          <button type="button" onClick={() => setShowForm(false)} style={{padding: '0.7rem 2rem', background: '#eee', color: '#333', border: 'none', borderRadius: 8, fontWeight: 500, fontSize: '1.1rem', cursor: 'pointer'}}>Not Now</button>
                        </div>
                      </form>
                      {showCardForm && (
                        <form onSubmit={handleCardSubmit} style={{marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16}}>
                          {cardError && <div style={{color: 'red', fontWeight: 600}}>{cardError}</div>}
                          <input name="cardName" value={card.cardName} onChange={handleCardChange} placeholder="Cardholder Name" required maxLength={26} style={{padding: 10, borderRadius: 6, border: '1px solid #ccc'}} />
                          <input name="cardNumber" value={card.cardNumber} onChange={handleCardChange} placeholder="Card Number" required maxLength={16} style={{padding: 10, borderRadius: 6, border: '1px solid #ccc'}} />
                          <input name="expiry" value={card.expiry} onChange={handleCardChange} placeholder="MM/YY" required maxLength={5} style={{padding: 10, borderRadius: 6, border: '1px solid #ccc'}} />
                          <input name="cvv" value={card.cvv} onChange={handleCardChange} placeholder="CVV" required maxLength={4} style={{padding: 10, borderRadius: 6, border: '1px solid #ccc'}} />
                          <div style={{display: 'flex', gap: 16, marginTop: 8}}>
                            <button type="submit" style={{padding: '0.7rem 2rem', background: results[selectedIdx].category === 'PC' ? '#4f8cff' : '#f59e42', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer'}}>Place Order</button>
                            <button type="button" onClick={() => { setShowCardForm(false); setCard({ cardName: '', cardNumber: '', expiry: '', cvv: '' }); }} style={{padding: '0.7rem 2rem', background: '#eee', color: '#333', border: 'none', borderRadius: 8, fontWeight: 500, fontSize: '1.1rem', cursor: 'pointer'}}>Cancel</button>
                          </div>
                        </form>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 