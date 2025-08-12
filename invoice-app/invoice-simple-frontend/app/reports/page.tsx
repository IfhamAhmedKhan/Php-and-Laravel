"use client";
import Navbar from "../components/navbar";

export default function Reports() {
  return (
    <>
      <Navbar />
      <div
        style={{
          padding: "32px",
          fontFamily: "sans-serif",
          backgroundColor: "#F9F9F9",
          minHeight: "100vh",
        }}
      >
        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <button
            style={{
              backgroundColor: "#2ED4A7",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "10px 20px",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Paid
          </button>
          <button
            style={{
              backgroundColor: "#fff",
              color: "#2ED4A7",
              border: "1px solid #2ED4A7",
              borderRadius: "6px",
              padding: "10px 20px",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Clients
          </button>
        </div>

        {/* Table Headers */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 2fr 1fr",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            fontWeight: "bold",
            color: "#555",
            marginBottom: "32px",
          }}
        >
          <div>Clients</div>
          <div>Invoices</div>
          <div>Paid</div>
        </div>

        {/* Loading State */}
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "48px",
            textAlign: "center",
            color: "#555",
            fontSize: "16px",
          }}
        >
          No reports available yet.
        </div>
      </div>
    </>
  );
}
