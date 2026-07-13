"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const [phone, setPhone] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !optIn) return alert("You must provide a phone number and opt in.");

    setLoading(true);

    const res = await fetch("/api/user/onboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, optIn }),
    });

    if (res.ok) {
      router.push("/"); 
    } else {
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Complete Your Profile</h2>
      <p>Opt-in to text message notifications via Twilio.</p>
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          type="tel"
          placeholder="+1234567890"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          style={{ padding: "8px", fontSize: "16px" }}
        />
        
        <label style={{ display: "flex", alignItems: "center", gap: "10px", textAlign: "left" }}>
          <input
            type="checkbox"
            checked={optIn}
            onChange={(e) => setOptIn(e.target.checked)}
            required
          />
          I agree to receive automated text messages. Message & data rates may apply.
        </label>

        <button type="submit" disabled={loading} style={{ padding: "10px", cursor: "pointer" }}>
          {loading ? "Saving..." : "Submit & Continue"}
        </button>
      </form>
    </div>
  );






}