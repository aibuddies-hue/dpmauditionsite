"use client";

import { useState, useEffect } from "react";

const NAMES = [
  { name: "Priya Sharma", city: "Mumbai" },
  { name: "Ananya Verma", city: "Delhi" },
  { name: "Riya Patel", city: "Ahmedabad" },
  { name: "Sneha Gupta", city: "Lucknow" },
  { name: "Kavya Nair", city: "Kochi" },
  { name: "Ishita Reddy", city: "Hyderabad" },
  { name: "Aisha Khan", city: "Jaipur" },
  { name: "Pooja Mishra", city: "Bhopal" },
  { name: "Neha Singh", city: "Patna" },
  { name: "Tanvi Joshi", city: "Pune" },
  { name: "Simran Kaur", city: "Chandigarh" },
  { name: "Divya Rao", city: "Bangalore" },
  { name: "Meghna Das", city: "Kolkata" },
  { name: "Rohit Mehra", city: "Indore" },
  { name: "Arjun Thakur", city: "Dehradun" },
  { name: "Vikash Yadav", city: "Varanasi" },
];

const ACTIONS = [
  "just applied for Miss India",
  "just registered for auditions",
  "just applied for Mrs. India",
  "just applied for Miss Teen",
  "just completed registration",
  "just applied for Mr. & Miss India",
];

const TIMES = ["just now", "1 min ago", "2 min ago", "3 min ago", "5 min ago"];

export default function SocialProof() {
  const [current, setCurrent] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showNext = () => {
      const person = NAMES[Math.floor(Math.random() * NAMES.length)];
      const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
      const time = TIMES[Math.floor(Math.random() * TIMES.length)];
      setCurrent({ ...person, action, time });
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    };

    const initialDelay = setTimeout(showNext, 4000);
    const interval = setInterval(showNext, 7000);
    return () => { clearTimeout(initialDelay); clearInterval(interval); };
  }, []);

  if (!current) return null;

  return (
    <div
      data-testid="social-proof-toast"
      style={{
        position: "fixed",
        bottom: 70,
        left: 20,
        zIndex: 60,
        background: "#111111",
        border: "1px solid rgba(201,168,76,0.2)",
        borderRadius: 12,
        padding: "14px 20px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        maxWidth: 360,
        boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
        transform: visible ? "translateX(0)" : "translateX(-120%)",
        opacity: visible ? 1 : 0,
        transition: "all 0.5s cubic-bezier(.34,1.56,.64,1)",
        pointerEvents: "none",
      }}
    >
      <div style={{
        width: 40, height: 40, borderRadius: "50%",
        background: "linear-gradient(135deg,#C9A84C,#e6c364)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "0.85rem", fontWeight: 800, color: "#0c0c0c", flexShrink: 0,
      }}>
        {current.name.charAt(0)}
      </div>
      <div>
        <p style={{ fontSize: "0.8rem", color: "#f0ede6", fontWeight: 600, margin: 0 }}>
          {current.name} <span style={{ color: "#857d6e", fontWeight: 400 }}>from {current.city}</span>
        </p>
        <p style={{ fontSize: "0.7rem", color: "#C9A84C", margin: "2px 0 0" }}>
          {current.action} &bull; <span style={{ color: "#857d6e" }}>{current.time}</span>
        </p>
      </div>
    </div>
  );
}
