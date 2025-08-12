"use client";
import { useState } from "react";

export default function Setup() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function createAdmin() {
    setLoading(true);
    try {
      const res = await fetch("/api/setup-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setMessage(data.message || data.error);
    } catch (error) {
      setMessage("Error creating admin account");
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col gap-4 w-80 p-8 border rounded shadow bg-white">
        <h2 className="text-2xl font-bold mb-4">Admin Setup</h2>
        <p className="text-gray-600 mb-4">
          This will create an admin account with:
          <br />
          Email: ifham.khan105@gmail.com
          <br />
          Password: ImAnAn007@
        </p>
        <button
          onClick={createAdmin}
          disabled={loading}
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Admin Account"}
        </button>
        {message && (
          <div className={`p-2 rounded ${message.includes("success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {message}
          </div>
        )}
        {message && message.includes("success") && (
          <a href="/login" className="text-blue-600 hover:underline">
            Go to Login →
          </a>
        )}
      </div>
    </div>
  );
} 