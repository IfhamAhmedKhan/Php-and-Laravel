"use client";
import Navbar from "../components/navbar";

export default function Estimates() {
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
          {["All invoices", "Outstanding", "Paid"].map((tab) => (
            <button
              key={tab}
              style={{
                backgroundColor: "#fff",
                border: "1px solid #2ED4A7",
                borderRadius: "6px",
                padding: "8px 16px",
                fontWeight: "bold",
                color: "#2ED4A7",
                cursor: "pointer",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search and New Invoice */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
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
            New invoice
          </button>
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
          }}
        >
          {/* Centered SVG Icon */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
            <svg
              width="42"
              height="42"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.25 3.5H10.5C9.57174 3.5 8.6815 3.86875 8.02513 4.52513C7.36875 5.1815 7 6.07174 7 7V35C7 35.9283 7.36875 36.8185 8.02513 37.4749C8.6815 38.1313 9.57174 38.5 10.5 38.5H31.5C32.4283 38.5 33.3185 38.1313 33.9749 37.4749C34.6313 36.8185 35 35.9283 35 35V12.25L26.25 3.5Z"
                stroke="#393939"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M24.5 3.5V10.5C24.5 11.4283 24.8687 12.3185 25.5251 12.9749C26.1815 13.6313 27.0717 14 28 14H35"
                stroke="#393939"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M27.0635 26.9057V20.6821H24.8066V19.3842H30.8947V20.6821H28.6377V26.9057H27.0635Z"
                fill="#393939"
              />
              <path
                d="M21.4149 27.0986C19.6166 27.0986 18.4803 26.2386 18.3917 24.9042L18.3864 24.8208H19.9033L19.9085 24.8729C19.9658 25.4359 20.5757 25.8164 21.4566 25.8164C22.2957 25.8164 22.8743 25.415 22.8743 24.8364V24.8312C22.8743 24.336 22.5042 24.0598 21.5712 23.8669L20.7789 23.7053C19.2152 23.3874 18.5428 22.6577 18.5428 21.5161V21.5109C18.5428 20.114 19.7417 19.1914 21.4096 19.1914C23.1662 19.1914 24.1983 20.1192 24.2973 21.3754L24.3025 21.4432H22.8222L22.8118 21.3806C22.7232 20.8437 22.2019 20.4684 21.4096 20.4684C20.633 20.4737 20.117 20.8281 20.117 21.391V21.3963C20.117 21.8862 20.4818 22.1781 21.3679 22.3605L22.1654 22.5221C23.7552 22.8505 24.4485 23.4864 24.4485 24.6592V24.6644C24.4485 26.1552 23.2913 27.0986 21.4149 27.0986Z"
                fill="#393939"
              />
              <path
                d="M12.7846 26.9057V19.3842H17.7677V20.6821H14.3588V22.4961H17.5748V23.7053H14.3588V25.6079H17.7677V26.9057H12.7846Z"
                fill="#393939"
              />
            </svg>
          </div>

          <h2 style={{ marginBottom: "16px", fontSize: "20px" }}>
            Create your first estimate.
          </h2>
          <p style={{ marginBottom: "24px", fontSize: "16px" }}>
            Send estimates to clients for approval and turn them into invoices.
          </p>
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
            + New invoice
          </button>
        </div>
      </div>
    </>
  );
}
