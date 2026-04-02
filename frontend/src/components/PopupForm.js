import { useState, useEffect, useCallback } from "react";
import { X, Sparkles, Crown, ArrowRight } from "lucide-react";

const URVASHI_IMG = "https://customer-assets.emergentagent.com/job_page-craft-228/artifacts/vsxnt8rm_541085-baogqnyb.gif";

export default function PopupForm() {
  const [show, setShow] = useState(false);
  const [closing, setClosing] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("dpm_popup_shown");
    if (alreadyShown) return;
    const timer = setTimeout(() => {
      setShow(true);
      sessionStorage.setItem("dpm_popup_shown", "1");
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => { setShow(false); setClosing(false); }, 350);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      handleClose();
      setTimeout(() => {
        document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    }, 1800);
  };

  if (!show) return null;

  return (
    <div
      data-testid="popup-overlay"
      className="popup-overlay"
      style={{ animation: closing ? "overlayFadeOut 0.35s ease forwards" : undefined }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        data-testid="popup-card"
        className="popup-card"
        style={{ animation: closing ? "popupSlideOut 0.35s ease forwards" : undefined }}
      >
        <button data-testid="popup-close-btn" className="popup-close" onClick={handleClose}>
          <X size={18} />
        </button>

        {!submitted ? (
          <>
            {/* Header with image */}
            <div style={{ display: "flex", gap: 20, marginBottom: 28, alignItems: "center" }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(201,168,76,0.4)", flexShrink: 0 }}>
                <img src={URVASHI_IMG} alt="Urvashi Rautela" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <Crown size={16} color="#C9A84C" />
                  <span style={{ fontSize: "0.55rem", letterSpacing: "0.3em", color: "#C9A84C", textTransform: "uppercase", fontWeight: 600 }}>Limited Slots Open</span>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", color: "#f0ede6", lineHeight: 1.2 }}>
                  Don't Miss Your<br /><em style={{ color: "#C9A84C" }}>Golden Chance!</em>
                </h3>
              </div>
            </div>

            <p style={{ fontSize: "0.85rem", color: "#c8c0ad", lineHeight: 1.7, marginBottom: 24 }}>
              Get a callback from our team. Drop your details and we'll guide you through the audition process.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
              <input
                data-testid="popup-input-name"
                className="dpm-input"
                type="text"
                placeholder="Your Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                data-testid="popup-input-phone"
                className="dpm-input"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <button
                data-testid="popup-submit-btn"
                type="submit"
                className="gold-btn gold-btn-pulse"
                style={{ width: "100%", padding: "16px 24px", borderRadius: 50, fontSize: "0.78rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
              >
                <Sparkles size={16} />
                Get a Callback
                <ArrowRight size={16} />
              </button>
            </form>

            <p style={{ textAlign: "center", marginTop: 16, fontSize: "0.65rem", color: "#857d6e" }}>
              Application Fee: <span style={{ color: "#C9A84C", fontWeight: 700 }}>&#8377;999 Only</span> &bull; No Experience Required
            </p>
          </>
        ) : (
          <div data-testid="popup-success" style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#e6c364,#C9A84C)", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", animation: "popupSuccessBounce 0.6s cubic-bezier(.34,1.56,.64,1)" }}>
              <Crown size={32} color="#0c0c0c" />
            </div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", color: "#C9A84C", marginBottom: 8 }}>Thank You!</h3>
            <p style={{ color: "#c8c0ad", fontSize: "0.9rem" }}>Our team will call you shortly.</p>
            <p style={{ color: "#857d6e", fontSize: "0.75rem", marginTop: 8 }}>Redirecting to application form...</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes overlayFadeOut { to { opacity: 0; } }
        @keyframes popupSlideOut { to { opacity: 0; transform: translateY(40px) scale(0.95); } }
        @keyframes popupSuccessBounce { 0% { transform: scale(0); } 60% { transform: scale(1.15); } 100% { transform: scale(1); } }
      `}</style>
    </div>
  );
}
