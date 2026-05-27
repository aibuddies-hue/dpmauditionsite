import { useState, useRef } from "react";
import axios from "axios";
import { CheckCircle, Upload, User, MapPin, Ruler, Camera, GraduationCap, Briefcase, Instagram, Facebook, MessageSquare } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const HEIGHTS = ["4'0\"","4'1\"","4'2\"","4'3\"","4'4\"","4'5\"","4'6\"","4'7\"","4'8\"","4'9\"","4'10\"","4'11\"","5'0\"","5'1\"","5'2\"","5'3\"","5'4\"","5'5\"","5'6\"","5'7\"","5'8\"","5'9\"","5'10\"","5'11\"","6'0\"","6'1\"","6'2\"","6'3\"","6'4\"","6'5\"","6'6\""];
const STATES = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"];
const HAIR_COLORS = ["Black","Brown","Ombre","Balayage","Blond","Rarely Red"];
const SKIN_TONES = ["Pale White","White","Light Beige","Olive","Light Brown"];
const EYE_COLORS = ["Black","Blue","Green","Hazel","Amber","Brown"];
const BODY_SHAPES = ["Hour Glass","Pear","Apple","Inverted Triangle","Ruler","Muscular","V-Shape","Trapezoid","Ectomorphic","Mesomorphic","Endomorphic"];

const L = { display: "block", fontSize: "0.65rem", letterSpacing: "0.12em", color: "#857d6e", textTransform: "uppercase", marginBottom: 8 };
const S = { fontSize: "0.7rem", letterSpacing: "0.25em", color: "#C9A84C", textTransform: "uppercase", fontWeight: 700, marginBottom: 20, marginTop: 36, display: "flex", alignItems: "center", gap: 10 };

export default function ThankYouForm({ applicationId, name, email, phone }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [p1Preview, setP1Preview] = useState(null);
  const [p2Preview, setP2Preview] = useState(null);
  const p1Ref = useRef(null);
  const p2Ref = useRef(null);

  const [contactPhone, setContactPhone] = useState(phone?.replace("+91","").trim() || "");
  const [contactEmail, setContactEmail] = useState(email || "");

  const [f, setF] = useState({
    first_name: name?.split(" ")[0] || "", last_name: name?.split(" ").slice(1).join(" ") || "",
    dob: "", age: "", marital_status: "", category: "",
    alt_phone: "", address1: "", address2: "", city: "", state: "", postal_code: "",
    qualification: "", professional_detail: "", instagram_url: "", facebook_url: "",
    height: "", weight: "", hair_color: "", skin_tone: "", eye_color: "", body_shape: "",
    waist: "", hip: "", chest: "",
    qa_why_model: "", qa_strengths: "", qa_role_model: "", qa_adventure: "", qa_if_win: "",
  });

  const u = (k, v) => setF(p => ({ ...p, [k]: v }));
  const handlePhoto = (e, set) => { const file = e.target.files[0]; if (file) { const r = new FileReader(); r.onload = ev => set(ev.target.result); r.readAsDataURL(file); } };

  const handleSubmit = async () => {
    setError("");
    if (!f.first_name || !f.dob || !f.age) { setError("Please fill all required fields"); return; }
    if (!p1Ref.current?.files[0] || !p2Ref.current?.files[0]) { setError("Please upload both photos"); return; }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("application_id", applicationId);
      fd.append("contact_email", contactEmail);
      fd.append("contact_phone", contactPhone);
      Object.entries(f).forEach(([k, v]) => fd.append(k, v));
      fd.append("photo1", p1Ref.current.files[0]);
      fd.append("photo2", p2Ref.current.files[0]);
      await axios.post(`${API}/profile`, fd);
      setSubmitted(true);
    } catch (e) { setError("Failed to submit profile. Please try again."); }
    finally { setLoading(false); }
  };

  if (submitted) return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#e6c364,#C9A84C)", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center" }}><CheckCircle size={40} color="#0c0c0c" /></div>
      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", color: "#C9A84C", marginBottom: 12 }}>Profile Submitted!</h3>
      <p style={{ color: "#c8c0ad", lineHeight: 1.8 }}>Your complete profile has been submitted successfully.<br />Our team will reach out within <strong style={{ color: "#f0ede6" }}>24 hours</strong>.</p>
      <div style={{ background: "#181818", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 8, padding: 20, textAlign: "left", marginTop: 32 }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "#C9A84C", textTransform: "uppercase", marginBottom: 12 }}>For Queries</p>
        <p style={{ color: "#c8c0ad", fontSize: "0.85rem" }}>Email: <a href="mailto:dpmentertainment@gmail.com" style={{ color: "#C9A84C" }}>dpmentertainment@gmail.com</a></p>
      </div>
    </div>
  );

  const Input = ({ label, k, type = "text", placeholder, required }) => (
    <div>
      <label style={L}>{label}{required && " *"}</label>
      <input className="dpm-input" type={type} placeholder={placeholder || label} value={f[k]} onChange={e => u(k, e.target.value)} />
    </div>
  );

  const Select = ({ label, k, options, required }) => (
    <div>
      <label style={L}>{label}{required && " *"}</label>
      <select className="dpm-select" value={f[k]} onChange={e => u(k, e.target.value)}>
        <option value="">- Select -</option>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );

  const TextArea = ({ label, k, placeholder, required }) => (
    <div>
      <label style={L}>{label}{required && " *"}</label>
      <textarea className="dpm-input" rows={3} placeholder={placeholder || label} value={f[k]} onChange={e => u(k, e.target.value)} style={{ resize: "vertical", minHeight: 80 }} />
    </div>
  );

  return (
    <div data-testid="thankyou-profile-form">
      <div style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 12, padding: "24px 28px", marginBottom: 32, display: "flex", alignItems: "center", gap: 16 }}>
        <CheckCircle size={32} color="#C9A84C" style={{ flexShrink: 0 }} />
        <div>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", color: "#C9A84C", marginBottom: 4 }}>Payment Successful!</h3>
          <p style={{ color: "#c8c0ad", fontSize: "0.85rem" }}>Now complete your profile to proceed with auditions.</p>
        </div>
      </div>

      {error && <div style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)", borderRadius: 8, padding: "12px 16px", marginBottom: 20, color: "#f87171", fontSize: "0.85rem" }}>{error}</div>}

      {/* CATEGORY */}
      <div style={{ marginBottom: 20 }}>
        <Select label="Category" k="category" required options={["Mr. India","Miss India","Mrs. India","Miss Teen India"]} />
      </div>

      {/* PERSONAL INFORMATION */}
      <div style={S}><User size={14} /> Personal Information</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <Input label="First Name" k="first_name" required />
        <Input label="Last Name" k="last_name" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
        <Input label="Date of Birth" k="dob" type="date" required />
        <Input label="Age" k="age" type="number" required />
        <Select label="Marital Status" k="marital_status" required options={["Single","Married","Divorced","Widowed"]} />
      </div>

      {/* CONTACT DETAILS */}
      <div style={S}>Contact Details</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div>
          <label style={L}>Mobile Number *</label>
          <div style={{ display: "flex", gap: 8 }}>
            <span className="dpm-input" style={{ width: 55, textAlign: "center", flexShrink: 0, color: "#C9A84C", padding: "14px 8px" }}>+91</span>
            <input className="dpm-input" placeholder="XXXXX XXXXX" value={contactPhone} onChange={e => setContactPhone(e.target.value)} />
          </div>
        </div>
        <Input label="Alternative No." k="alt_phone" type="tel" placeholder="Alternative Number" />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={L}>Email Address *</label>
        <input className="dpm-input" placeholder="your@email.com" value={contactEmail} onChange={e => setContactEmail(e.target.value)} />
      </div>

      {/* ADDRESS */}
      <div style={S}><MapPin size={14} /> Communication Address</div>
      <div style={{ display: "grid", gap: 16, marginBottom: 16 }}>
        <Input label="Full Address" k="address1" required placeholder="Address Line 1" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          <Input label="City" k="city" required />
          <Select label="State" k="state" required options={STATES} />
          <Input label="Postal Code" k="postal_code" required />
        </div>
      </div>

      {/* QUALIFICATION & PROFESSIONAL */}
      <div style={S}><GraduationCap size={14} /> Qualification & Professional Details</div>
      <div style={{ display: "grid", gap: 16, marginBottom: 16 }}>
        <Input label="Qualification Details" k="qualification" required placeholder="e.g. B.A., MBA, 12th Pass" />
        <Input label="Professional Detail" k="professional_detail" required placeholder="e.g. Fashion Designer, Student, Engineer" />
      </div>

      {/* SOCIAL MEDIA */}
      <div style={S}><Instagram size={14} /> Social Media</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <Input label="Instagram URL" k="instagram_url" placeholder="https://instagram.com/yourprofile" required />
        <Input label="Facebook URL" k="facebook_url" placeholder="https://facebook.com/yourprofile" required />
      </div>

      {/* PHYSICAL ATTRIBUTES */}
      <div style={S}><Ruler size={14} /> Physical Attributes</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <Select label="Height" k="height" required options={HEIGHTS} />
        <Input label="Weight (KGs)" k="weight" type="number" required />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <Select label="Hair Color" k="hair_color" required options={HAIR_COLORS} />
        <Select label="Skin Tone" k="skin_tone" required options={SKIN_TONES} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <Select label="Eye Color" k="eye_color" required options={EYE_COLORS} />
        <Select label="Body Shape" k="body_shape" required options={BODY_SHAPES} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
        <Input label="Waist (inches)" k="waist" required />
        <Input label="Hip (inches)" k="hip" required />
        <Input label="Chest Size (inches)" k="chest" required />
      </div>

      {/* Q&A */}
      <div style={S}><MessageSquare size={14} /> Q & A</div>
      <div style={{ display: "grid", gap: 20, marginBottom: 16 }}>
        <TextArea label="Why do you want to be a Model? Why do you want to participate in this show?" k="qa_why_model" required />
        <TextArea label="What Are Your Strengths & Weaknesses?" k="qa_strengths" required />
        <TextArea label="Who is Your Role Model & Why?" k="qa_role_model" required />
        <TextArea label="Which Is the Most Adventurous Incident In Your Life?" k="qa_adventure" required />
        <TextArea label="What Will You Do If You Win The Pageant?" k="qa_if_win" required />
      </div>

      {/* PHOTOS */}
      <div style={S}><Camera size={14} /> Upload Photos</div>
      <p style={{ fontSize: "0.75rem", color: "#857d6e", marginBottom: 16 }}>Upload professional and recent photographs *</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
        {[{ label: "Photo 1 *", ref: p1Ref, preview: p1Preview, set: setP1Preview, tid: "profile-photo1" },
          { label: "Photo 2 *", ref: p2Ref, preview: p2Preview, set: setP2Preview, tid: "profile-photo2" }].map(({ label, ref, preview, set, tid }) => (
          <div key={label}>
            <label style={L}>{label}</label>
            <div onClick={() => ref.current?.click()} style={{ background: "#1e1e1e", border: "2px dashed rgba(201,168,76,0.25)", borderRadius: 8, height: 180, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", overflow: "hidden", transition: "border-color 0.3s" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "#C9A84C"} onMouseOut={e => e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)"}>
              {preview ? <img src={preview} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <><Upload size={28} color="#857d6e" /><p style={{ fontSize: "0.7rem", color: "#857d6e", marginTop: 8 }}>Click to upload</p></>}
            </div>
            <input data-testid={tid} ref={ref} type="file" accept="image/*" style={{ display: "none" }} onChange={e => handlePhoto(e, set)} />
          </div>
        ))}
      </div>

      <button data-testid="btn-submit-profile" onClick={handleSubmit} className="gold-btn gold-btn-pulse" disabled={loading}
        style={{ width: "100%", padding: 18, borderRadius: 8, fontSize: "0.85rem" }}>
        {loading ? "Submitting..." : "Submit Profile"}
      </button>
    </div>
  );
}
