import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Do I need any modelling experience to apply?",
    a: "No! DPM Beauty Pageant welcomes participants with zero experience. We provide complete grooming support, portfolio shoots, and training to prepare you for the competition.",
  },
  {
    q: "What is the registration fee?",
    a: "The registration fee is ₹999 only. This is a one-time fee that covers your online audition slot, initial grooming guidance, and digital exposure. The fee is non-refundable.",
  },
  {
    q: "How does the online audition process work?",
    a: "After registration, our team will contact you within 24 hours via WhatsApp/email with the Zoom audition link and schedule. You'll participate in a virtual audition round from the comfort of your home.",
  },
  {
    q: "What are the age requirements for each category?",
    a: "Miss Teen India: 12-18 years | Mr. & Miss India: 16-40 years | Mrs. India: 18+ years (must be married). Age proof is required at the time of audition.",
  },
  {
    q: "What prizes can I win?",
    a: "Winners receive cash prizes worth ₹11,00,000+, a 1-year in-house contract for web series, movies & fashion shows, chance to represent India on an international platform, brand ambassador opportunities, and a chance to work with Bollywood celebrities.",
  },
  {
    q: "Can married women participate?",
    a: "Absolutely! The Mrs. India category is specifically designed for married women between 28-50 years of age. Celebrate your elegance and grace on a national platform.",
  },
  {
    q: "What happens after I get selected in the audition?",
    a: "Selected candidates move through: Portfolio Photoshoot → Personal Interview → Grooming Sessions → Grand Finale. You'll receive complete support throughout the journey.",
  },
  {
    q: "Is the registration fee refundable?",
    a: "No, the registration fee of ₹999 is non-refundable under any circumstances as per our terms and conditions. Please read the rules carefully before registering.",
  },
  {
    q: "Can I participate from any city in India?",
    a: "Yes! The initial auditions are conducted online via Zoom, so you can participate from anywhere in India. Only the final rounds require in-person attendance.",
  },
  {
    q: "Who is the chief guest / celebrity patron?",
    a: "Miss Universe Urvashi Rautela is the Celebrity Patron and Chief Guest of DPM Beauty Pageant 2026. Winners will have the honor of being crowned by her.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section data-testid="faq-section" className="section-fade" style={{ padding: "80px 24px", background: "#111111" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.4em", color: "#C9A84C", textTransform: "uppercase", display: "block", marginBottom: 12 }}>Got Questions?</span>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,3rem)", color: "#f0ede6" }}>Frequently Asked Questions</h2>
          <div style={{ height: 1, width: 60, background: "#C9A84C", margin: "20px auto 0" }} />
        </div>

        <div style={{ display: "grid", gap: 8 }}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              data-testid={`faq-item-${i}`}
              style={{
                background: openIndex === i ? "#181818" : "#141414",
                border: `1px solid ${openIndex === i ? "rgba(201,168,76,0.25)" : "rgba(201,168,76,0.08)"}`,
                borderRadius: 8,
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: "100%",
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span style={{ fontSize: "0.9rem", color: openIndex === i ? "#f0ede6" : "#c8c0ad", fontWeight: 600, fontFamily: "'Montserrat',sans-serif" }}>{faq.q}</span>
                <ChevronDown
                  size={20}
                  color="#C9A84C"
                  style={{
                    flexShrink: 0,
                    transition: "transform 0.3s ease",
                    transform: openIndex === i ? "rotate(180deg)" : "rotate(0)",
                  }}
                />
              </button>
              <div
                style={{
                  maxHeight: openIndex === i ? 300 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.4s ease, padding 0.3s ease",
                  padding: openIndex === i ? "0 24px 20px" : "0 24px",
                }}
              >
                <p style={{ fontSize: "0.85rem", color: "#857d6e", lineHeight: 1.8, margin: 0 }}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
