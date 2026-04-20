import { useState, useRef } from "react";
import axios from "axios";
import { CheckCircle, Upload, User, MapPin, Ruler, Camera } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const HEIGHTS = [
  "4'0\"", "4'1\"", "4'2\"", "4'3\"", "4'4\"", "4'5\"", "4'6\"", "4'7\"", "4'8\"", "4'9\"", "4'10\"", "4'11\"",
  "5'0\"", "5'1\"", "5'2\"", "5'3\"", "5'4\"", "5'5\"", "5'6\"", "5'7\"", "5'8\"", "5'9\"", "5'10\"", "5'11\"",
  "6'0\"", "6'1\"", "6'2\"", "6'3\"", "6'4\"", "6'5\"", "6'6\"",
];

const labelStyle = { display: "block", fontSize: "0.65rem", letterSpacing: "0.12em", color: "#857d6e", textTransform: "uppercase", marginBottom: 8 };
const sectionTitle = { fontSize: "0.7rem", letterSpacing: "0.25em", color: "#C9A84C", textTransform: "uppercase", fontWeight: 700, marginBottom: 20, marginTop: 32 };

export default function ThankYouForm({ applicationId, name, email, phone }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [photo1Preview, setPhoto1Preview] = useState(null);
  const [photo2Preview, setPhoto2Preview] = useState(null);
  const photo1Ref = useRef(null);
  const photo2Ref = useRef(null);

  const [form, setForm] = useState({
    first_name: name?.split(" ")[0] || "",
    last_name: name?.split(" ").slice(1).join(" ") || "",
    age: "",
    marital_status: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postal_code: "",
    height: "",
    weight: "",
    bust: "",
    waist: "",
    hips: "",
  });

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handlePhoto = (e, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setError("");
    const { first_name, age, marital_status, address1, city, state, postal_code, height, weight } = form;
    if (!first_name || !age || !marital_status || !address1 || !city || !state || !postal_code || !height || !weight) {
      setError("Please fill all required fields marked with *");
      return;
    }
    if (!photo1Ref.current?.files[0] || !photo2Ref.current?.files[0]) {
      setError("Please upload both photos");
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("application_id", applicationId);
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append("photo1", photo1Ref.current.files[0]);
      fd.append("photo2", photo2Ref.current.files[0]);
      await axios.post(`${API}/profile`, fd);
      setSubmitted(true);
    } catch (e) {
      setError("Failed to submit profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#e6c364,#C9A84C)", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CheckCircle size={40} color="#0c0c0c" />
        </div>
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", color: "#C9A84C", marginBottom: 12 }}>Profile Submitted!</h3>
        <p style={{ color: "#c8c0ad", lineHeight: 1.8 }}>Your complete profile has been submitted successfully.<br />Our team will reach out to you within <strong style={{ color: "#f0ede6" }}>24 hours</strong>.</p>
        <div style={{ background: "#181818", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 8, padding: 20, textAlign: "left", marginTop: 32 }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "#C9A84C", textTransform: "uppercase", marginBottom: 12 }}>For Queries</p>
          <p style={{ color: "#c8c0ad", fontSize: "0.85rem" }}>Email: <a href="mailto:dpmentertainment@gmail.com" style={{ color: "#C9A84C" }}>dpmentertainment@gmail.com</a></p>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="thankyou-profile-form">
      {/* Success Banner */}
      <div style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 12, padding: "24px 28px", marginBottom: 32, display: "flex", alignItems: "center", gap: 16 }}>
        <CheckCircle size={32} color="#C9A84C" style={{ flexShrink: 0 }} />
        <div>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", color: "#C9A84C", marginBottom: 4 }}>Payment Successful!</h3>
          <p style={{ color: "#c8c0ad", fontSize: "0.85rem" }}>Now complete your profile to proceed with auditions.</p>
        </div>
      </div>

      {error && <div style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)", borderRadius: 8, padding: "12px 16px", marginBottom: 20, color: "#f87171", fontSize: "0.85rem" }}>{error}</div>}

      {/* PERSONAL INFORMATION */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, ...sectionTitle }}><User size={14} /> Personal Information</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div>
          <label style={labelStyle}>First Name *</label>
          <input data-testid="profile-first-name" className="dpm-input" placeholder="First Name" value={form.first_name} onChange={e => update("first_name", e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Last Name</label>
          <input data-testid="profile-last-name" className="dpm-input" placeholder="Last Name" value={form.last_name} onChange={e => update("last_name", e.target.value)} />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div>
          <label style={labelStyle}>Age *</label>
          <input data-testid="profile-age" className="dpm-input" type="number" placeholder="Age" value={form.age} onChange={e => update("age", e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Marital Status *</label>
          <select data-testid="profile-marital" className="dpm-select" value={form.marital_status} onChange={e => update("marital_status", e.target.value)}>
            <option value="">- Select Marital Status -</option>
            <option>Single</option>
            <option>Married</option>
            <option>Divorced</option>
            <option>Widowed</option>
          </select>
        </div>
      </div>

      {/* CONTACT DETAILS */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, ...sectionTitle }}>Contact Details</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div>
          <label style={labelStyle}>Mobile Number *</label>
          <div style={{ display: "flex", gap: 8 }}>
            <span className="dpm-input" style={{ width: 60, textAlign: "center", flexShrink: 0, color: "#C9A84C" }}>+91</span>
            <input className="dpm-input" placeholder="XXXXX XXXXX" value={contactPhone} onChange={e => setContactPhone(e.target.value)} />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Email Address *</label>
          <input className="dpm-input" placeholder="your@email.com" value={contactEmail} onChange={e => setContactEmail(e.target.value)} />
        </div>
      </div>

      {/* COMMUNICATION ADDRESS */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, ...sectionTitle }}><MapPin size={14} /> Communication Address</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div>
          <label style={labelStyle}>Address Line 1 *</label>
          <input data-testid="profile-address1" className="dpm-input" placeholder="Address Line 1" value={form.address1} onChange={e => update("address1", e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Address Line 2</label>
          <input className="dpm-input" placeholder="Address Line 2" value={form.address2} onChange={e => update("address2", e.target.value)} />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div>
          <label style={labelStyle}>City *</label>
          <input data-testid="profile-city" className="dpm-input" placeholder="City" value={form.city} onChange={e => update("city", e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>State *</label>
          <input data-testid="profile-state" className="dpm-input" placeholder="State" value={form.state} onChange={e => update("state", e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Postal Code *</label>
          <input data-testid="profile-postal" className="dpm-input" placeholder="Postal Code" value={form.postal_code} onChange={e => update("postal_code", e.target.value)} />
        </div>
      </div>

      {/* PHYSICAL ATTRIBUTES */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, ...sectionTitle }}><Ruler size={14} /> Physical Attributes</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div>
          <label style={labelStyle}>Height *</label>
          <select data-testid="profile-height" className="dpm-select" value={form.height} onChange={e => update("height", e.target.value)}>
            <option value="">- Select Height -</option>
            {HEIGHTS.map(h => <option key={h}>{h}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Weight (in KGs) *</label>
          <input data-testid="profile-weight" className="dpm-input" type="number" placeholder="Weight in KGs" value={form.weight} onChange={e => update("weight", e.target.value)} />
        </div>
      </div>

      {/* VITAL STATS */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, ...sectionTitle }}>Vital Stats <span style={{ fontSize: "0.55rem", color: "#857d6e", fontWeight: 400 }}>(in inches)</span></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div>
          <label style={labelStyle}>Bust</label>
          <input className="dpm-input" placeholder="Bust" value={form.bust} onChange={e => update("bust", e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Waist</label>
          <input className="dpm-input" placeholder="Waist" value={form.waist} onChange={e => update("waist", e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Hips</label>
          <input className="dpm-input" placeholder="Hips" value={form.hips} onChange={e => update("hips", e.target.value)} />
        </div>
      </div>

      {/* UPLOAD PHOTOS */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, ...sectionTitle }}><Camera size={14} /> Upload Photos</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
        {[
          { label: "Photo 1 *", ref: photo1Ref, preview: photo1Preview, setPreview: setPhoto1Preview, testId: "profile-photo1" },
          { label: "Photo 2 *", ref: photo2Ref, preview: photo2Preview, setPreview: setPhoto2Preview, testId: "profile-photo2" },
        ].map(({ label, ref, preview, setPreview, testId }) => (
          <div key={label}>
            <label style={labelStyle}>{label}</label>
            <div
              onClick={() => ref.current?.click()}
              style={{
                background: "#1e1e1e", border: "2px dashed rgba(201,168,76,0.25)", borderRadius: 8,
                height: 180, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                cursor: "pointer", overflow: "hidden", transition: "border-color 0.3s",
              }}
              onMouseOver={e => e.currentTarget.style.borderColor = "#C9A84C"}
              onMouseOut={e => e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)"}
            >
              {preview ? (
                <img src={preview} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <>
                  <Upload size={28} color="#857d6e" />
                  <p style={{ fontSize: "0.7rem", color: "#857d6e", marginTop: 8 }}>Click to upload</p>
                </>
              )}
            </div>
            <input data-testid={testId} ref={ref} type="file" accept="image/*" style={{ display: "none" }} onChange={e => handlePhoto(e, setPreview)} />
          </div>
        ))}
      </div>

      <button
        data-testid="btn-submit-profile"
        onClick={handleSubmit}
        className="gold-btn gold-btn-pulse"
        disabled={loading}
        style={{ width: "100%", padding: 18, borderRadius: 8, fontSize: "0.85rem" }}
      >
        {loading ? "Submitting..." : "Submit Profile"}
      </button>
    </div>
  );
}
