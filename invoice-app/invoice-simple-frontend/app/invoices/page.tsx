"use client";
import Navbar from "../components/navbar";

export default function Invoices() {
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
        {/* Trial Notice */}
        <div
          style={{
            backgroundColor: "#E6FCF6",
            border: "1px solid #2ED4A7",
            borderRadius: "8px",
            padding: "16px 24px",
            marginBottom: "24px",
            color: "#2ED4A7",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>You have 1 document left on free trial</span>
          <button
            style={{
              backgroundColor: "#2ED4A7",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "8px 16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Subscribe now
          </button>
        </div>

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
                d="M26.25 3.5H10.5C9.57174 3.5 8.6815 3.86875 8.02513 4.52513C7.36875 5.1815 7 6.07174 7 7V35C7 35.9283 7.36875 36.8185 8.02513 37.4749C8.6815 38.1312 9.57174 38.5 10.5 38.5H31.5C32.4283 38.5 33.3185 38.1312 33.9749 37.4749C34.6313 36.8185 35 35.9283 35 35V12.25L26.25 3.5Z"
                fill="#212121"
                stroke="#212121"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M12.8441 19.2217H14.4977V26.7419H12.8441V19.2217Z" fill="white" />
              <path
                d="M15.9503 19.2217H17.5934L20.732 24.2668H20.7531V19.2217H22.3014V26.7419H20.6478L17.5197 21.7074H17.4986V26.7419H15.9503V19.2217Z"
                fill="white"
              />
              <path
                d="M27.2538 26.7419H25.3896L22.9566 19.2217H24.6523L26.327 24.509H26.348L28.0437 19.2217H29.75L27.2538 26.7419Z"
                fill="white"
              />
              <path
                d="M24.5 3.5V10.5C24.5 11.4283 24.8687 12.3185 25.5251 12.9749C26.1815 13.6313 27.0717 14 28 14H35"
                stroke="#ECEFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h2 style={{ marginBottom: "16px", fontSize: "20px" }}>
            Create your first invoice
          </h2>
          <p style={{ marginBottom: "24px", fontSize: "16px" }}>
            Get paid faster with Invoice Simple invoice creation.
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
