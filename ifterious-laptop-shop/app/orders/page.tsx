"use client";

import { useUser } from "../../contexts/UserContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

const ordersContainerStyle: React.CSSProperties = {
  minHeight: "100vh",
  padding: "2rem",
  background: "linear-gradient(135deg, rgba(79,140,255,0.1) 0%, rgba(110,231,183,0.1) 100%)",
};

const ordersCardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.95)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: "2rem",
  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  maxWidth: "1200px",
  margin: "0 auto",
  border: "1px solid rgba(255,255,255,0.2)",
};

const titleStyle: React.CSSProperties = {
  fontSize: "2.5rem",
  fontWeight: "700",
  color: "#333",
  marginBottom: "0.5rem",
  textAlign: "center",
  fontFamily: "Orbitron, sans-serif",
};

const subtitleStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#666",
  marginBottom: "3rem",
  fontSize: "1.1rem",
};

const backButtonStyle: React.CSSProperties = {
  padding: "0.75rem 1.5rem",
  borderRadius: "8px",
  border: "none",
  background: "#4f8cff",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "1rem",
  marginBottom: "2rem",
  transition: "all 0.2s",
};

const backButtonHoverStyle: React.CSSProperties = {
  background: "#3b82f6",
  transform: "translateY(-1px)",
  boxShadow: "0 4px 12px rgba(79,140,255,0.3)",
};

const noOrdersStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "4rem 2rem",
  color: "#666",
};

const noOrdersTitleStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  fontWeight: "600",
  color: "#333",
  marginBottom: "1rem",
};

const noOrdersTextStyle: React.CSSProperties = {
  fontSize: "1rem",
  color: "#666",
  marginBottom: "2rem",
  lineHeight: "1.5",
};

const shopNowButtonStyle: React.CSSProperties = {
  padding: "0.75rem 2rem",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(90deg, #4f8cff 0%, #6ee7b7 100%)",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "1rem",
  textDecoration: "none",
  display: "inline-block",
  transition: "all 0.2s",
};

const shopNowButtonHoverStyle: React.CSSProperties = {
  transform: "translateY(-2px)",
  boxShadow: "0 8px 25px rgba(79,140,255,0.3)",
};

const ordersGridStyle: React.CSSProperties = {
  display: "grid",
  gap: "1.5rem",
  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
};

const orderCardStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: "12px",
  padding: "1.5rem",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  border: "1px solid #e5e7eb",
  transition: "all 0.2s",
};

const orderCardHoverStyle: React.CSSProperties = {
  transform: "translateY(-2px)",
  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
};

const orderHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1rem",
  paddingBottom: "1rem",
  borderBottom: "1px solid #e5e7eb",
};

const orderIdStyle: React.CSSProperties = {
  fontSize: "1.1rem",
  fontWeight: "600",
  color: "#333",
};

const orderDateStyle: React.CSSProperties = {
  fontSize: "0.9rem",
  color: "#666",
};

const orderStatusStyle: React.CSSProperties = {
  padding: "0.25rem 0.75rem",
  borderRadius: "20px",
  fontSize: "0.8rem",
  fontWeight: "600",
  textTransform: "uppercase",
};

const statusPendingStyle: React.CSSProperties = {
  ...orderStatusStyle,
  background: "#fef3c7",
  color: "#92400e",
};

const statusProcessingStyle: React.CSSProperties = {
  ...orderStatusStyle,
  background: "#dbeafe",
  color: "#1e40af",
};

const statusShippedStyle: React.CSSProperties = {
  ...orderStatusStyle,
  background: "#d1fae5",
  color: "#065f46",
};

const statusDeliveredStyle: React.CSSProperties = {
  ...orderStatusStyle,
  background: "#dcfce7",
  color: "#166534",
};

const orderDetailsStyle: React.CSSProperties = {
  marginBottom: "1rem",
};

const orderDetailRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "0.5rem",
  fontSize: "0.9rem",
};

const orderDetailLabelStyle: React.CSSProperties = {
  color: "#666",
  fontWeight: "500",
};

const orderDetailValueStyle: React.CSSProperties = {
  color: "#333",
  fontWeight: "600",
};

const orderTotalStyle: React.CSSProperties = {
  fontSize: "1.2rem",
  fontWeight: "700",
  color: "#4f8cff",
  textAlign: "right",
  marginTop: "1rem",
  paddingTop: "1rem",
  borderTop: "1px solid #e5e7eb",
};

const loadingStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "4rem 2rem",
  color: "#666",
  fontSize: "1.1rem",
};

interface Order {
  _id: string;
  name: string;
  address: string;
  payment: string;
  phone: string;
  email: string;
  userId: string;
  createdAt: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  productName?: string;
  productPrice?: string;
  productDetails?: string;
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'pending':
      return statusPendingStyle;
    case 'processing':
      return statusProcessingStyle;
    case 'shipped':
      return statusShippedStyle;
    case 'delivered':
      return statusDeliveredStyle;
    default:
      return statusPendingStyle;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default function OrdersPage() {
  const { user } = useUser();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/orders?userId=${user._id}`);
        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders || []);
        } else {
          console.error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user, router]);

  if (!user) {
    return null; // Will redirect to login
  }

  if (isLoading) {
    return (
      <div style={ordersContainerStyle}>
        <div style={ordersCardStyle}>
          <div style={loadingStyle}>
            Loading your orders...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={ordersContainerStyle}>
      <div style={ordersCardStyle}>
        <button
          onClick={() => router.push('/home')}
          style={
            hovered === "back"
              ? { ...backButtonStyle, ...backButtonHoverStyle }
              : backButtonStyle
          }
          onMouseEnter={() => setHovered("back")}
          onMouseLeave={() => setHovered(null)}
        >
          ← Back to Home
        </button>
        
        <h1 style={titleStyle}>My Orders</h1>
        <p style={subtitleStyle}>
          Track all your orders and their current status
        </p>

        {orders.length === 0 ? (
          <div style={noOrdersStyle}>
            <h2 style={noOrdersTitleStyle}>No Orders Yet</h2>
            <p style={noOrdersTextStyle}>
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <Link href="/pc">
              <button
                style={
                  hovered === "shop"
                    ? { ...shopNowButtonStyle, ...shopNowButtonHoverStyle }
                    : shopNowButtonStyle
                }
                onMouseEnter={() => setHovered("shop")}
                onMouseLeave={() => setHovered(null)}
              >
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div style={ordersGridStyle}>
            {orders.map((order) => (
              <div
                key={order._id}
                style={
                  hovered === order._id
                    ? { ...orderCardStyle, ...orderCardHoverStyle }
                    : orderCardStyle
                }
                onMouseEnter={() => setHovered(order._id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div style={orderHeaderStyle}>
                  <div>
                    <div style={orderIdStyle}>Order #{order._id.slice(-8)}</div>
                    <div style={orderDateStyle}>{formatDate(order.createdAt)}</div>
                  </div>
                  <div style={getStatusStyle(order.status)}>
                    {order.status}
                  </div>
                </div>

                <div style={orderDetailsStyle}>
                  <div style={orderDetailRowStyle}>
                    <span style={orderDetailLabelStyle}>Customer:</span>
                    <span style={orderDetailValueStyle}>{order.name}</span>
                  </div>
                  <div style={orderDetailRowStyle}>
                    <span style={orderDetailLabelStyle}>Email:</span>
                    <span style={orderDetailValueStyle}>{order.email}</span>
                  </div>
                  <div style={orderDetailRowStyle}>
                    <span style={orderDetailLabelStyle}>Phone:</span>
                    <span style={orderDetailValueStyle}>{order.phone}</span>
                  </div>
                  <div style={orderDetailRowStyle}>
                    <span style={orderDetailLabelStyle}>Payment:</span>
                    <span style={orderDetailValueStyle}>
                      {order.payment === 'online' ? 'Online Payment' : 'Cash on Delivery'}
                    </span>
                  </div>
                  {order.productName && (
                    <div style={orderDetailRowStyle}>
                      <span style={orderDetailLabelStyle}>Product:</span>
                      <span style={orderDetailValueStyle}>{order.productName}</span>
                    </div>
                  )}
                  {order.productPrice && (
                    <div style={orderDetailRowStyle}>
                      <span style={orderDetailLabelStyle}>Price:</span>
                      <span style={orderDetailValueStyle}>{order.productPrice}</span>
                    </div>
                  )}
                </div>

                <div style={orderTotalStyle}>
                  Order Total: {order.productPrice || 'Contact for pricing'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 