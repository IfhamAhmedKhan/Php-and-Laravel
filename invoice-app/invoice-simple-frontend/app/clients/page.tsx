"use client";
import Navbar from "../components/navbar";

export default function Clients() {
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
        {/* Header Actions */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <input
            type="text"
            placeholder="Search by client name"
            style={{
              padding: "10px 16px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              width: "60%",
              fontSize: "14px",
            }}
          />
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
            New Client
          </button>
        </div>

        {/* Table Headers */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 2fr 2fr 2fr 1fr",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            fontWeight: "bold",
            color: "#555",
            marginBottom: "32px",
          }}
        >
          <div>Name</div>
          <div>Email</div>
          <div>Address</div>
          <div>Phone</div>
          <div>Total Billed</div>
        </div>

        {/* Empty State */}
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "48px",
            textAlign: "center",
            color: "#555",
            fontSize: "16px",
            marginBottom: "32px",
          }}
        >
          You have no Clients, add your first Client today.
        </div>

        {/* Pagination */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <button
            disabled
            style={{
              backgroundColor: "#eee",
              color: "#aaa",
              border: "none",
              borderRadius: "6px",
              padding: "10px 20px",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: "not-allowed",
            }}
          >
            Prev
          </button>
          <button
            disabled
            style={{
              backgroundColor: "#eee",
              color: "#aaa",
              border: "none",
              borderRadius: "6px",
              padding: "10px 20px",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: "not-allowed",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
