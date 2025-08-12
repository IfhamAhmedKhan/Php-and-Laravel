"use client";
import Navbar from "../components/navbar";

export default function Items() {
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
            placeholder="Search by Item Name"
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
            New Item
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
            fontSize: "16px",
            marginBottom: "32px",
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
              <g clipPath="url(#clip0)">
                <path
                  d="M37.6333 35.0006H4.38372C1.97003 35.0006 0.00915527 33.0371 0.00915527 30.6261V13.1265C0.00915527 10.7155 1.97134 8.75195 4.38372 8.75195H37.6333C40.047 8.75195 42.0078 10.7155 42.0078 13.1265V30.6261C42.0078 33.0371 40.0457 35.0006 37.6333 35.0006ZM4.38372 10.5002C2.93603 10.5002 1.75872 11.6775 1.75872 13.1252V30.6248C1.75872 32.0725 2.93603 33.2498 4.38372 33.2498H37.6333C39.081 33.2498 40.2583 32.0725 40.2583 30.6248V13.1252C40.2583 11.6775 39.081 10.5002 37.6333 10.5002H4.38372Z"
                  fill="#212121"
                />
                <path d="M3.5083 14.0005H5.25786V29.7505H3.5083V14.0005Z" fill="#212121" />
                <path d="M7.00879 14.0005H8.75835V26.2501H7.00879V14.0005Z" fill="#212121" />
                <path d="M10.5092 14.0005H12.2587V26.2501H10.5092V14.0005Z" fill="#212121" />
                <path d="M15.7592 14.0005H17.5087V26.2501H15.7592V14.0005Z" fill="#212121" />
                <path d="M19.2583 14.0005H21.0079V26.2501H19.2583V14.0005Z" fill="#212121" />
                <path d="M26.2592 14.0005H28.0087V26.2501H26.2592V14.0005Z" fill="#212121" />
                <path d="M29.7583 14.0005H31.5079V26.2501H29.7583V14.0005Z" fill="#212121" />
                <path d="M33.2588 14.0005H35.0084V26.2501H33.2588V14.0005Z" fill="#212121" />
                <path d="M36.7592 14.0005H38.5087V29.7505H36.7592V14.0005Z" fill="#212121" />
                <path d="M8.75042 27.9995H7.00085V29.7491H8.75042V27.9995Z" fill="#212121" />
                <path d="M12.2496 27.9995H10.5V29.7491H12.2496V27.9995Z" fill="#212121" />
                <path d="M17.4996 27.9995H15.75V29.7491H17.4996V27.9995Z" fill="#212121" />
                <path d="M21.0001 27.9995H19.2505V29.7491H21.0001V27.9995Z" fill="#212121" />
                <path d="M27.9996 27.9995H26.25V29.7491H27.9996V27.9995Z" fill="#212121" />
                <path d="M31.5001 27.9995H29.7505V29.7491H31.5001V27.9995Z" fill="#212121" />
                <path d="M35.0004 27.9995H33.2509V29.7491H35.0004V27.9995Z" fill="#212121" />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="42" height="42" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          <h2 style={{ marginBottom: "16px", fontSize: "20px" }}>
            Keep track of your items
          </h2>
          <p style={{ marginBottom: "24px", fontSize: "14px" }}>
            Add your commonly invoiced items and speed up your invoice creation.
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
            New Item
          </button>
        </div>

        {/* Footer Note */}
        <div
          style={{
            textAlign: "center",
            color: "#888",
            fontSize: "13px",
          }}
        >
          All your items are auto saved here.
        </div>
      </div>
    </>
  );
}
