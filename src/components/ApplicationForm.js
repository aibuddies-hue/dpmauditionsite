"use client";

import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { CheckCircle, Lock, Shield } from "lucide-react";

const API = "/api";
const RAZORPAY_KEY = "rzp_live_SdppA5AGlfgn4i";

// Extract UTM params from URL
function getUtmParams() {
  if (typeof window === "undefined") {
    return {
      utm_source: "", utm_medium: "", utm_campaign: "", utm_term: "", utm_content: "",
      utm_id: "", placement: "", site_source: "", fbclid: "", gclid: "", ref: ""
    };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_term: params.get("utm_term") || "",
    utm_content: params.get("utm_content") || "",
    utm_id: params.get("utm_id") || "",
    placement: params.get("placement") || "",
    site_source: params.get("site_source") || params.get("site_source_name") || "",
    fbclid: params.get("fbclid") || "",
    gclid: params.get("gclid") || "",
    ref: params.get("ref") || "",
  };
}

// Generate deterministic event_id for dedup between pixel + CAPI
function genEventId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Get fbc/fbp cookies for EMQ
function getCookie(name) {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : '';
}
function getFbc() {
  let fbc = getCookie('_fbc');
  if (!fbc && typeof window !== "undefined") {
    const fbclid = new URLSearchParams(window.location.search).get('fbclid');
    if (fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;
  }
  return fbc || '';
}
function getFbp() { return getCookie('_fbp') || ''; }

// Fire pixel + CAPI together with shared event_id for dedup
function fireTrackedEvent(eventName, customData, userData = {}) {
  if (typeof window === "undefined") return;
  const eventId = genEventId(eventName);
  // Browser pixel with eventID
  if (window.fbq) {
    setTimeout(() => { window.fbq('track', eventName, customData, { eventID: eventId }); }, 0);
  }
  // Server-side CAPI relay (fire-and-forget)
  axios.post(`${API}/capi-event`, {
    event_name: eventName,
    event_id: eventId,
    event_source_url: window.location.href,
    fbc: getFbc(),
    fbp: getFbp(),
    value: customData?.value || 0,
    currency: customData?.currency || 'INR',
    ...userData,
  }).catch(() => {});
}

export default function ApplicationForm({ isPopup = false, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [utmParams, setUtmParams] = useState({
    utm_source: "", utm_medium: "", utm_campaign: "", utm_term: "", utm_content: "",
    utm_id: "", placement: "", site_source: "", fbclid: "", gclid: "", ref: ""
  });

  useEffect(() => {
    setUtmParams(getUtmParams());
  }, []);

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

    // Meta Pixel + CAPI: InitiateCheckout (form filled, starting payment)
    fireTrackedEvent("InitiateCheckout", { value: 999, currency: "INR", content_name: "DPM Beauty Pageant 2026 Registration" }, { email, phone, first_name: name.split(" ")[0], last_name: name.split(" ").slice(1).join(" ") });

    // Small delay to ensure pixel + CAPI complete before Razorpay overlay opens
    await new Promise(r => setTimeout(r, 500));

    setLoading(true);
    try {
      // Save lead with UTM params
      await axios.post(`${API}/leads`, { name, email, phone, ...utmParams }).catch(() => {});

      // Create Razorpay order
      const { data: order } = await axios.post(`${API}/create-order`, { name, email, phone });

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
            const { data: appResult } = await axios.post(`${API}/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              name, email, phone,
              ...utmParams,
            });
            // Redirect to thank you page with UTM params
            const utmQuery = Object.entries(utmParams).filter(([,v]) => v).map(([k,v]) => `${k}=${encodeURIComponent(v)}`).join("&");
            const base = `/thankyou?id=${appResult.id}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`;
            window.location.href = utmQuery ? `${base}&${utmQuery}` : base;
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
        axios.post(`${API}/payment-failed`, {
          razorpay_order_id: order.order_id,
          name, email, phone,
          error_reason: response.error?.description || response.error?.reason || "Payment failed",
        }).catch(() => {});
        setError("Payment failed. Please try again.");
        setLoading(false);
      });
      rzp.open();
    } catch (e) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section id="apply" data-testid="application-form-section" style={{ padding: isPopup ? "40px 20px 60px" : "80px 24px 120px", background: "#0c0c0c", position: "relative", zIndex: 10 }}>
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
