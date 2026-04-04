import { useState, useCallback } from "react";
import axios from "axios";
import { CheckCircle } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const URVASHI_HEADER_IMG = "https://customer-assets.emergentagent.com/job_page-craft-228/artifacts/vsxnt8rm_541085-baogqnyb.gif";

export default function ApplicationForm({ isPopup = false, onSuccess }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", dob: "", age: "",
    parent: "", marital: "", city: "", category: "", agree: false,
  });

  const updateField = useCallback((field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const goToStep2 = () => {
    setError("");
    const { name, email, phone, dob, age, parent, marital, city, category, agree } = form;
    if (!name || !email || !phone || !dob || !age || !parent || !marital || !city || !category) {
      setError("Please fill all required fields.");
      return;
    }
    if (!agree) {
      setError("Please agree to the Terms and Conditions.");
      return;
    }
    setStep(2);
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  };

  const goToStep3 = async () => {
    setLoading(true);
    setError("");
    try {
      const { agree, ...data } = form;
      await axios.post(`${API}/applications`, data);
      setStep(3);
      document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
    } catch (e) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const showThankYou = () => {
    setSubmitted(true);
    if (!isPopup) {
      document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
    }
    if (onSuccess) {
      setTimeout(() => onSuccess(), 3000);
    }
  };

  const stepClass = (i) => {
    if (i < step) return "progress-step-done";
    if (i === step) return "progress-step-active";
    return "progress-step-todo";
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
            <p style={{ color: "#c8c0ad", fontSize: "0.85rem" }}>Phone: <span style={{ color: "#C9A84C" }}>[Add phone number]</span></p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" data-testid="application-form-section" style={{ padding: "80px 24px 120px", background: "#0c0c0c", position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "#f0ede6", marginBottom: 8 }}>Apply for Online Auditions</h2>
          <p style={{ color: "#857d6e", fontSize: "0.8rem" }}>Complete your application in 3 simple steps</p>
        </div>

        {/* Progress Bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 48 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ display: "contents" }}>
              <div data-testid={`step-${i}-dot`} className={stepClass(i)} style={{ width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, flexShrink: 0 }}>{i}</div>
              {i < 3 && <div style={{ flex: 1, height: 1, background: "#2e2e2e" }} />}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: -40, marginBottom: 40, padding: "0 4px" }}>
          <span style={{ fontSize: "0.6rem", color: step >= 1 ? "#C9A84C" : "#857d6e", letterSpacing: "0.1em", textTransform: "uppercase" }}>Personal Details</span>
          <span style={{ fontSize: "0.6rem", color: step >= 2 ? "#C9A84C" : "#857d6e", letterSpacing: "0.1em", textTransform: "uppercase" }}>Review</span>
          <span style={{ fontSize: "0.6rem", color: step >= 3 ? "#C9A84C" : "#857d6e", letterSpacing: "0.1em", textTransform: "uppercase" }}>Payment</span>
        </div>

        {error && <div data-testid="form-error" style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)", borderRadius: 8, padding: "12px 16px", marginBottom: 20, color: "#f87171", fontSize: "0.85rem" }}>{error}</div>}

        {/* STEP 1 */}
        {step === 1 && (
          <div data-testid="step-1-panel">
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", color: "#f0ede6", marginBottom: 32 }}>Add Personal Details</h3>
            <div style={{ display: "grid", gap: 20 }}>
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
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.12em", color: "#857d6e", textTransform: "uppercase", marginBottom: 8 }}>Date of Birth *</label>
                  <input data-testid="input-dob" className="dpm-input" type="date" value={form.dob} onChange={e => updateField("dob", e.target.value)} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.12em", color: "#857d6e", textTransform: "uppercase", marginBottom: 8 }}>Age *</label>
                  <input data-testid="input-age" className="dpm-input" type="number" placeholder="Your age" value={form.age} onChange={e => updateField("age", e.target.value)} />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.12em", color: "#857d6e", textTransform: "uppercase", marginBottom: 8 }}>Father's / Spouse's Name *</label>
                <input data-testid="input-parent" className="dpm-input" type="text" placeholder="Father's or Spouse's name" value={form.parent} onChange={e => updateField("parent", e.target.value)} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.12em", color: "#857d6e", textTransform: "uppercase", marginBottom: 8 }}>Marital Status *</label>
                <select data-testid="select-marital" className="dpm-select" value={form.marital} onChange={e => updateField("marital", e.target.value)}>
                  <option value="">Select status</option>
                  <option>Single</option>
                  <option>Married</option>
                  <option>Divorced</option>
                  <option>Widowed</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.12em", color: "#857d6e", textTransform: "uppercase", marginBottom: 8 }}>State & City *</label>
                <input data-testid="input-city" className="dpm-input" type="text" placeholder="e.g. Maharashtra, Mumbai" value={form.city} onChange={e => updateField("city", e.target.value)} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.12em", color: "#857d6e", textTransform: "uppercase", marginBottom: 8 }}>Category *</label>
                <select data-testid="select-category" className="dpm-select" value={form.category} onChange={e => updateField("category", e.target.value)}>
                  <option value="">Select your category</option>
                  <option>Miss Teen India (Age 12-18)</option>
                  <option>Mr. & Miss India (Age 16-40)</option>
                  <option>Mrs. India (Age 18+, Married)</option>
                </select>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: 16, background: "#111111", borderRadius: 6, border: "1px solid rgba(201,168,76,0.12)" }}>
                <input data-testid="checkbox-agree" className="checkbox-gold" type="checkbox" checked={form.agree} onChange={e => updateField("agree", e.target.checked)} style={{ width: 16, height: 16, marginTop: 2, flexShrink: 0 }} />
                <label style={{ fontSize: "0.8rem", color: "#c8c0ad", lineHeight: 1.6, cursor: "pointer" }}>I agree to all the <a href="#tnc" style={{ color: "#C9A84C", textDecoration: "underline" }}>Terms and Conditions</a> of the Contest</label>
              </div>
              <button data-testid="btn-next-step2" onClick={goToStep2} className="gold-btn" style={{ width: "100%", padding: 18, borderRadius: 8, fontSize: "0.8rem" }}>Next &rarr;</button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div data-testid="step-2-panel">
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", color: "#f0ede6", marginBottom: 32 }}>Review Your Details</h3>
            <div style={{ background: "#111111", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 8, padding: 28, marginBottom: 32, fontSize: "0.85rem", lineHeight: 2.2, color: "#c8c0ad" }}>
              {[
                ["Name", form.name], ["Email", form.email], ["WhatsApp", form.phone],
                ["Date of Birth", form.dob], ["Age", form.age], ["Father / Spouse", form.parent],
                ["Marital Status", form.marital], ["State & City", form.city],
              ].map(([label, val]) => (
                <div key={label} style={{ display: "flex", gap: 16 }}>
                  <span style={{ color: "#857d6e", minWidth: 160, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</span>
                  <span style={{ color: "#f0ede6" }}>{val}</span>
                </div>
              ))}
              <div style={{ display: "flex", gap: 16 }}>
                <span style={{ color: "#857d6e", minWidth: 160, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Category</span>
                <span style={{ color: "#C9A84C", fontWeight: 700 }}>{form.category}</span>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <button data-testid="btn-back-step1" onClick={() => { setStep(1); setError(""); }} className="gold-outline-btn" style={{ padding: 16, borderRadius: 8, fontSize: "0.75rem" }}>&larr; Go Back</button>
              <button data-testid="btn-proceed-payment" onClick={goToStep3} className="gold-btn" style={{ padding: 16, borderRadius: 8, fontSize: "0.75rem" }} disabled={loading}>{loading ? "Submitting..." : "Proceed to Payment \u2192"}</button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div data-testid="step-3-panel">
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", color: "#f0ede6", marginBottom: 8 }}>Complete Your Payment</h3>
            <p style={{ color: "#857d6e", fontSize: "0.8rem", marginBottom: 32 }}>Application Fee: <strong style={{ color: "#C9A84C", fontSize: "1rem" }}>&#8377;999</strong></p>

            {/* Urvashi side banner */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 20, marginBottom: 24 }}>
              <div style={{ background: "#111111", border: "2px dashed rgba(201,168,76,0.2)", borderRadius: 8, padding: "40px 28px", textAlign: "center" }}>
                <p style={{ color: "#857d6e", fontSize: "0.85rem", marginBottom: 12 }}>Payment Gateway Integration</p>
                <p style={{ color: "#2e2e2e", fontSize: "0.7rem" }}>(Razorpay / PayU / Paytm embed)</p>
                <button data-testid="btn-simulate-payment" onClick={showThankYou} className="gold-btn" style={{ marginTop: 20, padding: "14px 32px", borderRadius: 50, fontSize: "0.75rem" }}>Simulate Payment</button>
              </div>
              <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid rgba(201,168,76,0.25)" }}>
                <img src={URVASHI_HEADER_IMG} alt="Urvashi Rautela" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>

            <p style={{ textAlign: "center", fontSize: "0.65rem", color: "#857d6e" }}>Secure Payment &bull; Your data is safe with us</p>
            <button data-testid="btn-back-step2" onClick={() => setStep(2)} className="gold-outline-btn" style={{ width: "100%", padding: 14, borderRadius: 8, fontSize: "0.7rem", marginTop: 20 }}>&larr; Go Back</button>
          </div>
        )}
      </div>
    </section>
  );
}
