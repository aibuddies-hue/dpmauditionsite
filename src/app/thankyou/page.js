"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ThankYouForm from "@/components/ThankYouForm";

const DPM_LOGO = "https://dpmentertainment.com/wp-content/uploads/2024/04/dpm-logo-1-2-e1783104510551.png";

function ThankYouPageContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  const name = searchParams.get("name") || "";
  const email = searchParams.get("email") || "";
  const phone = searchParams.get("phone") || "";

  // Fire Purchase pixel + CAPI on thank you page load
  useEffect(() => {
    const eid = 'Purchase_' + Date.now() + '_' + Math.random().toString(36).substr(2,9);
    if (window.fbq) {
      window.fbq('track', 'Purchase', { value: 999, currency: 'INR', content_name: 'DPM Beauty Pageant 2026 Registration' }, { eventID: eid });
    }
    // CAPI server-side Purchase
    const API = '/api';
    const fbc = typeof document !== 'undefined' ? (document.cookie.match(/(^| )_fbc=([^;]+)/)?.[2] || '') : '';
    const fbp = typeof document !== 'undefined' ? (document.cookie.match(/(^| )_fbp=([^;]+)/)?.[2] || '') : '';
    fetch(`${API}/capi-event`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({
      event_name: 'Purchase', event_id: eid, event_source_url: window.location.href,
      email, phone, first_name: name.split(' ')[0], last_name: name.split(' ').slice(1).join(' '),
      fbc, fbp, value: 999, currency: 'INR', external_id: id,
    })}).catch(() => {});
  }, [id, name, email, phone]);

  return (
    <div style={{ background: "#0c0c0c", minHeight: "100vh" }}>
      {/* NAV */}
      <nav className="glass" style={{ position: "sticky", top: 0, width: "100%", zIndex: 50, padding: "6px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
        <a href="/"><img src={DPM_LOGO} alt="DPM Entertainment" style={{ height: 65, objectFit: "contain", filter: "brightness(1.8)", background: "rgba(255,255,255,0.12)", borderRadius: 10, padding: "6px 12px", boxShadow: "0 0 20px rgba(255,255,255,0.15)" }} /></a>
        <a href="/" className="gold-outline-btn" style={{ padding: "10px 24px", borderRadius: 50, fontSize: "0.7rem", textDecoration: "none" }}>Back to Home</a>
      </nav>

      {/* FORM */}
      <div style={{ padding: "60px 24px 120px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "#f0ede6", marginBottom: 8 }}>Complete Your Profile</h2>
            <p style={{ color: "#857d6e", fontSize: "0.8rem" }}>Fill in your details for the audition process</p>
          </div>
          <ThankYouForm applicationId={id} name={name} email={email} phone={phone} />
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#080808", borderTop: "1px solid rgba(201,168,76,0.1)", padding: "40px 24px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <img src={DPM_LOGO} alt="DPM Entertainment" style={{ height: 55, objectFit: "contain", marginBottom: 16, filter: "brightness(1.8)", background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: "6px 10px" }} />
          <p style={{ fontSize: "0.75rem", color: "#857d6e", marginBottom: 8 }}>dpmentertainment@gmail.com</p>
          <p style={{ fontSize: "0.6rem", color: "#2e2e2e", marginTop: 16 }}>&copy; 2026 DPM Entertainment. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div style={{ color: '#fff', textAlign: 'center', padding: '100px' }}>Loading...</div>}>
      <ThankYouPageContent />
    </Suspense>
  );
}
