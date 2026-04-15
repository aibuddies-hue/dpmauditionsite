import { useState, useCallback } from "react";
import axios from "axios";
import { CheckCircle, Lock, Shield } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_KEY_ID;

export default function ApplicationForm({ isPopup = false, onSuccess }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const updateField = useCallback((field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const handlePayment = async () => {
    setError("");
    const { name, email, phone } = form;
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill all required fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      // Create Razorpay order
      const { data: order } = await axios.post(`${API}/create-order`, { name, email, phone });

      // Open Razorpay checkout
      const options = {
        key: RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        order_id: order.order_id,
        name: "DPM Entertainment",
        description: "DPM Beauty Pageant 2026 - Registration Fee",
        image: "https://customer-assets.emergentagent.com/job_page-craft-228/artifacts/oarhbp7n_dpm%20entertainment%20logo%20final%20.png",
        prefill: { name, email, contact: phone },
        theme: { color: "#C9A84C" },
        handler: async (response) => {
          try {
            await axios.post(`${API}/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              name, email, phone,
            });
            setSubmitted(true);
            if (!isPopup) {
              document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
            }
            if (onSuccess) setTimeout(() => onSuccess(), 3000);
          } catch (e) {
            setError("Payment verification failed. Please contact support.");
          }
          setLoading(false);
        },
        modal: {
          ondismiss: () => { setLoading(false); },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response) => {
        setError("Payment failed. Please try again.");
        setLoading(false);
      });
      rzp.open();
    } catch (e) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="apply" data-testid="thankyou-section" style={{ padding: "80px 24px", background: "#0c0c0c", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#e6c364,#C9A84C)", margin: "0 auto 32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CheckCircle size={40} color="#0c0c0c" />
          </div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", color: "#C9A84C", marginBottom: 16 }}>Congratulations!</h2>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", color: "#f0ede6", marginBottom: 24 }}>We Have Received Your Application for Online Auditions</h3>
          <p style={{ color: "#c8c0ad", lineHeight: 1.8, marginBottom: 40 }}>Our Team will reach out to you within <strong style={{ color: "#f0ede6" }}>24 hours</strong> for the next steps and Auditions.<br />Keep an eye on your registered email and WhatsApp.</p>
          <div style={{ background: "#111111", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 8, padding: 24, textAlign: "left" }}>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "#C9A84C", textTransform: "uppercase", marginBottom: 16 }}>For Queries</p>
            <p style={{ color: "#c8c0ad", fontSize: "0.85rem", marginBottom: 8 }}>Email: <a href="mailto:dpmentertainment@gmail.com" style={{ color: "#C9A84C" }}>dpmentertainment@gmail.com</a></p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" data-testid="application-form-section" style={{ padding: "80px 24px 120px", background: "#0c0c0c", position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "#f0ede6", marginBottom: 8 }}>Apply for Online Auditions</h2>
          <p style={{ color: "#857d6e", fontSize: "0.8rem" }}>Fill your details and pay &#8377;999 to register</p>
        </div>

        {error && <div data-testid="form-error" style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)", borderRadius: 8, padding: "12px 16px", marginBottom: 20, color: "#f87171", fontSize: "0.85rem" }}>{error}</div>}

        <div data-testid="step-1-panel" style={{ display: "grid", gap: 20 }}>
          <div>
            <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.12em", color: "#857d6e", textTransform: "uppercase", marginBottom: 8 }}>Full Name *</label>
            <input data-testid="input-name" className="dpm-input" type="text" placeholder="Your full name" value={form.name} onChange={e => updateField("name", e.target.value)} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.12em", color: "#857d6e", textTransform: "uppercase", marginBottom: 8 }}>Email Address *</label>
            <input data-testid="input-email" className="dpm-input" type="email" placeholder="your@email.com" value={form.email} onChange={e => updateField("email", e.target.value)} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.12em", color: "#857d6e", textTransform: "uppercase", marginBottom: 8 }}>WhatsApp Number *</label>
            <input data-testid="input-phone" className="dpm-input" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => updateField("phone", e.target.value)} />
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: 16, background: "#111111", borderRadius: 6, border: "1px solid rgba(201,168,76,0.12)" }}>
            <input data-testid="checkbox-agree" className="checkbox-gold" type="checkbox" id="agree-tnc" style={{ width: 16, height: 16, marginTop: 2, flexShrink: 0 }} />
            <label htmlFor="agree-tnc" style={{ fontSize: "0.8rem", color: "#c8c0ad", lineHeight: 1.6, cursor: "pointer" }}>I agree to all the <a href="#tnc" style={{ color: "#C9A84C", textDecoration: "underline" }}>Terms and Conditions</a> of the Contest</label>
          </div>

          <button
            data-testid="btn-pay-now"
            onClick={handlePayment}
            className="gold-btn gold-btn-pulse"
            disabled={loading}
            style={{ width: "100%", padding: 18, borderRadius: 8, fontSize: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
          >
            {loading ? "Processing..." : <>Pay &#8377;999 & Register</>}
          </button>

          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 4 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.65rem", color: "#857d6e" }}><Lock size={12} color="#C9A84C" /> Secure Payment</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.65rem", color: "#857d6e" }}><Shield size={12} color="#C9A84C" /> Powered by Razorpay</span>
          </div>
        </div>
      </div>
    </section>
  );
}
