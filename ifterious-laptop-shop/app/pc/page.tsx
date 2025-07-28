"use client";
import styles from "./pc.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import Link from "next/link";

const pcItems = [
  {
    name: "Gaming PC X1",
    price: "$1200",
    image: "https://m.media-amazon.com/images/I/71sIsHeIpIL._AC_SL1500_.jpg",
    details: "Intel i7, 16GB RAM, RTX 3060, 1TB SSD",
    category: "PC",
  },
  {
    name: "Workstation Pro",
    price: "$1800",
    image: "https://rb.gy/nd5kn5",
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

const loginPromptStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.8)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const loginPromptCardStyle: React.CSSProperties = {
  background: "white",
  padding: "2rem",
  borderRadius: "12px",
  textAlign: "center",
  maxWidth: "400px",
  margin: "1rem",
};

const loginPromptTitleStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  fontWeight: "700",
  color: "#333",
  marginBottom: "1rem",
};

const loginPromptTextStyle: React.CSSProperties = {
  fontSize: "1rem",
  color: "#666",
  marginBottom: "2rem",
  lineHeight: "1.5",
};

const loginPromptButtonsStyle: React.CSSProperties = {
  display: "flex",
  gap: "1rem",
  justifyContent: "center",
};

const loginPromptButtonStyle: React.CSSProperties = {
  padding: "0.75rem 1.5rem",
  borderRadius: "8px",
  border: "none",
  fontWeight: "600",
  fontSize: "1rem",
  cursor: "pointer",
  transition: "all 0.2s",
};

const primaryButtonStyle: React.CSSProperties = {
  ...loginPromptButtonStyle,
  background: "#4f8cff",
  color: "#fff",
};

const secondaryButtonStyle: React.CSSProperties = {
  ...loginPromptButtonStyle,
  background: "#e5e7eb",
  color: "#374151",
};

export default function PC() {
  const router = useRouter();
  const { user } = useUser();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
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
  
  const handleBuyNow = () => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    setShowForm(true);
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
          userId: user?._id, // Add user ID to the order
          productName: selectedIdx !== null ? pcItems[selectedIdx].name : 'PC Product',
          productPrice: selectedIdx !== null ? pcItems[selectedIdx].price : 'Contact for pricing',
          productDetails: selectedIdx !== null ? pcItems[selectedIdx].details : '',
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
      alert('Order placed successfully! You can view your orders in the Orders page.');
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
  
  return (
    <div className={styles.container}>
      <button onClick={() => router.push('/')} style={{ margin: "1rem 0", padding: "0.5rem 1.2rem", borderRadius: 8, border: "none", background: "#4f8cff", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "1rem" }}>Go Back</button>
      <h1>PC Page</h1>
      <h2 className={styles.welcome}>Welcome to the gaming laptop page!</h2>
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
                <button style={{padding: '0.7rem 2rem', background: '#4f8cff', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer'}} onClick={handleBuyNow}>Buy Now</button>
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
                    <button type="submit" style={{padding: '0.7rem 2rem', background: '#4f8cff', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer'}}>Proceed</button>
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
                      <button type="submit" style={{padding: '0.7rem 2rem', background: '#4f8cff', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer'}}>Place Order</button>
                      <button type="button" onClick={() => { setShowCardForm(false); setCard({ cardName: '', cardNumber: '', expiry: '', cvv: '' }); }} style={{padding: '0.7rem 2rem', background: '#eee', color: '#333', border: 'none', borderRadius: 8, fontWeight: 500, fontSize: '1.1rem', cursor: 'pointer'}}>Cancel</button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div style={loginPromptStyle} onClick={() => setShowLoginPrompt(false)}>
          <div style={loginPromptCardStyle} onClick={e => e.stopPropagation()}>
            <h2 style={loginPromptTitleStyle}>Login Required</h2>
            <p style={loginPromptTextStyle}>
              Please log in or create an account to place orders. This helps us provide better service and track your orders.
            </p>
            <div style={loginPromptButtonsStyle}>
              <Link href="/login">
                <button style={primaryButtonStyle}>
                  Login
                </button>
              </Link>
              <Link href="/signup">
                <button style={primaryButtonStyle}>
                  Sign Up
                </button>
              </Link>
              <button 
                onClick={() => setShowLoginPrompt(false)}
                style={secondaryButtonStyle}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 