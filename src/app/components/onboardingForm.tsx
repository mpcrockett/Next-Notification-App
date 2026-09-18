"use client";

import { useState } from 'react';

interface Props {
  onComplete: () => void;
  userId: string | undefined;
}

export default function OnboardingPage({ onComplete, userId }: Props) {
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTestClick = async () => {
    setLoading(true);
    const res = await fetch('/api/notifications/notification/test', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId })
    });

    if (res.ok) {
    } else {
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

   const handleCompleteClick = async () => {
    setLoading(true);
    const res = await fetch('/api/user/onboard', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({  })
    });

    if (res.ok) {
      onComplete(); 
    } else {
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Complete Your Profile</h2>
      <p>Sign up to receive your notifications</p>

  
      <a href="https://apps.apple.com/us/app/ntfy/id1625396347">Download ntfy.sh</a>
      <p>Your personal topic is {userId}</p>

      <button onClick={handleTestClick}>Send a Test Notification</button>

      <button onClick={handleCompleteClick}>Complete Onboarding</button>
        
    </div>
  );






}