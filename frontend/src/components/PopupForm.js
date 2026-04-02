import { useState, useEffect } from "react";
import { X } from "lucide-react";
import ApplicationForm from "@/components/ApplicationForm";

export default function PopupForm({ show, onClose }) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      setClosing(false);
      document.body.style.overflow = "hidden";
    }
  }, [show]);

  useEffect(() => {
    const esc = (e) => { if (e.key === "Escape" && visible) handleClose(); };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  });

  const handleClose = () => {
    setClosing(true);
    document.body.style.overflow = "";
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
      onClose();
    }, 350);
  };

  if (!visible) return null;

  return (
    <div
      data-testid="popup-overlay"
      className="popup-overlay"
      style={{ animation: closing ? "overlayFadeOut 0.35s ease forwards" : undefined }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        data-testid="popup-card"
        style={{
          background: "#0c0c0c",
          border: "1px solid rgba(201,168,76,0.25)",
          borderRadius: 16,
          maxWidth: 680,
          width: "95%",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
          animation: closing ? "popupSlideOut 0.35s ease forwards" : "popupSlideIn 0.5s cubic-bezier(.34,1.56,.64,1)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(201,168,76,0.08)",
        }}
      >
        <button
          data-testid="popup-close-btn"
          className="popup-close"
          onClick={handleClose}
          style={{ position: "fixed", top: "calc(5vh + 16px)", right: "calc(50% - 330px)", zIndex: 110 }}
        >
          <X size={18} />
        </button>
        <div style={{ marginTop: -36 }}>
          <ApplicationForm isPopup onSuccess={handleClose} />
        </div>
      </div>

      <style>{`
        @keyframes overlayFadeOut { to { opacity: 0; } }
        @keyframes popupSlideOut { to { opacity: 0; transform: translateY(40px) scale(0.95); } }
      `}</style>
    </div>
  );
}
