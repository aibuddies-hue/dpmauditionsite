import { useEffect, useRef, useState } from "react";
import {
  CheckCircle, GraduationCap, Camera, CreditCard, Video, Mic, Trophy,
  Banknote, Film, Plane, Star, Theater, Award, User, Quote, Lock,
  Wallet, Images, Image, ChevronRight, Shield, Clock, Users, TrendingUp
} from "lucide-react";
import ApplicationForm from "@/components/ApplicationForm";
import PopupForm from "@/components/PopupForm";
import SocialProof from "@/components/SocialProof";
import FAQSection from "@/components/FAQSection";
import TermsContent from "@/components/TermsContent";

const URVASHI_HEADER = "https://customer-assets.emergentagent.com/job_page-craft-228/artifacts/vsxnt8rm_541085-baogqnyb.gif";
const URVASHI_GIF = "https://i.postimg.cc/brNfVpBP/541085-baogqnyb.gif";
const DPM_LOGO = "https://customer-assets.emergentagent.com/job_page-craft-228/artifacts/oarhbp7n_dpm%20entertainment%20logo%20final%20.png";

const JUDGE_IMAGES = [
  { url: "https://drive.google.com/thumbnail?id=13YVUeycDGDCd-dljyJaeyQIl7Tk68bfQ&sz=w400", name: "Judge 1", role: "Bollywood Director" },
  { url: "https://drive.google.com/thumbnail?id=1YXGBu25FrT8yqq1UuNhVQgsbZ9pTsg-h&sz=w400", name: "Judge 2", role: "Fashion Designer" },
  { url: "https://drive.google.com/thumbnail?id=1LdF5LbCMi8q7bVKBmfZK9XF4-zP2oX7m&sz=w400", name: "Judge 3", role: "Celebrity Stylist" },
  { url: "https://drive.google.com/thumbnail?id=1V3ZPfYOWDcTCYY4sGkTWmGOiqjQv8X4e&sz=w400", name: "Judge 4", role: "Supermodel & Mentor" },
];

const CATEGORY_IMAGES = {
  mr: "https://customer-assets.emergentagent.com/job_page-craft-228/artifacts/cyk7f4fz_566180301_17947332891022044_2524350184055524225_n.jpg",
  mrs: "https://images.unsplash.com/photo-1722561669647-f3c5a5b73e50?w=600",
  miss: "https://customer-assets.emergentagent.com/job_page-craft-228/artifacts/iasbcr29_article-2022718416302059420000.webp",
  teen: "https://images.unsplash.com/photo-1584290849779-64e87b8e198c?w=600",
};

const EVENT_IMAGES = [
  "https://drive.google.com/thumbnail?id=17jeak-g8op9gSjtkhOwAgBEdL53iyxZQ&sz=w800",
  "https://drive.google.com/thumbnail?id=13wORJaUUaPivsPaTXg8_VXx00BDoXeTX&sz=w600",
  "https://drive.google.com/thumbnail?id=1D59CS5ZeWB6Lg7D4sB69FggbQ9cnwflq&sz=w600",
  "https://drive.google.com/thumbnail?id=190iQgBhV0uvm4AungqP98NrCV0_FGB1h&sz=w600",
  "https://drive.google.com/thumbnail?id=1AtijrYX5FW9cWkjGzKBzOi4526LA-Gjk&sz=w600",
];

const TESTIMONIAL_DATA = [
  { img: "https://drive.google.com/thumbnail?id=18_m6V4-ZcblOaOadhUTKp4lRGF-h1MR4&sz=w200", name: "Kavya Nair", role: "Miss India Finalist", quote: "DPM completely transformed my career. The grooming, the exposure, and the platform they gave me was beyond anything I imagined. I went from a small-town girl to walking the runway in Mumbai!" },
  { img: "https://drive.google.com/thumbnail?id=190iQgBhV0uvm4AungqP98NrCV0_FGB1h&sz=w200", name: "Arjun Mehra", role: "Mr. India Winner", quote: "The DPM team believed in me when no one else did. Their mentorship and industry connections opened doors to Bollywood that I never thought possible. Forever grateful." },
  { img: "https://drive.google.com/thumbnail?id=1AtijrYX5FW9cWkjGzKBzOi4526LA-Gjk&sz=w200", name: "Sneha Gupta", role: "Mrs. India Winner", quote: "As a married woman, I thought my dreams of the spotlight were over. DPM proved me wrong. They celebrate women of all ages and stages of life. A truly life-changing experience." },
];

const ABOUT_IMAGES = {
  founder: "https://customer-assets.emergentagent.com/job_page-craft-228/artifacts/8r21rmqm_photo1705582827%20%281%29.jpeg",
  small1: "https://drive.google.com/thumbnail?id=1QaTIx-YX6ubCBCzw5u9ofR6NisfgQXHs&sz=w400",
  small2: "https://drive.google.com/thumbnail?id=1WTfXtt02skeRTIQfG9sAFUW2o_lFMzGE&sz=w400",
};

function useCountdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + 7);
    const tick = () => {
      const diff = Math.max(0, target - new Date());
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function LandingPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [showTnc, setShowTnc] = useState(false);
  const countdown = useCountdown();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".section-fade").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Intercept all Apply links to show popup instead
  useEffect(() => {
    const handler = (e) => {
      const applyLink = e.target.closest('a[href="#apply"], button[data-apply]');
      if (applyLink) {
        e.preventDefault();
        // Meta Pixel: AddToCart (clicked Apply button)
        if (window.fbq) window.fbq('track', 'AddToCart', { value: 999, currency: 'INR', content_name: 'DPM Beauty Pageant 2026 Registration' });
        setShowPopup(true);
      }
      const tncLink = e.target.closest('a[href="#tnc"]');
      if (tncLink) { e.preventDefault(); setShowTnc(true); }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Auto-show popup after 5 seconds
  useEffect(() => {
    const shown = sessionStorage.getItem("dpm_popup_shown");
    if (shown) return;
    const timer = setTimeout(() => {
      setShowPopup(true);
      sessionStorage.setItem("dpm_popup_shown", "1");
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div data-testid="landing-page">
      {/* POPUP FORM */}
      <PopupForm show={showPopup} onClose={() => setShowPopup(false)} />

      {/* T&C POPUP */}
      {showTnc && (
        <div className="popup-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowTnc(false); }}>
          <div style={{ background: "#0c0c0c", border: "1px solid rgba(201,168,76,0.25)", borderRadius: 16, maxWidth: 800, width: "95%", maxHeight: "90vh", overflowY: "auto", position: "relative", animation: "popupSlideIn 0.5s cubic-bezier(.34,1.56,.64,1)", boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}>
            <button className="popup-close" onClick={() => setShowTnc(false)} style={{ position: "sticky", top: 16, float: "right", marginRight: 16, marginTop: 16, zIndex: 10 }}>
              <span style={{ fontSize: "1.2rem", lineHeight: 1 }}>&times;</span>
            </button>
            <div style={{ padding: "48px 40px 32px" }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", color: "#f0ede6", textAlign: "center", marginBottom: 8 }}>Terms & Conditions</h2>
              <div style={{ height: 1, width: 60, background: "#C9A84C", margin: "0 auto 32px" }} />
              <TermsContent />
            </div>
          </div>
        </div>
      )}

      {/* SOCIAL PROOF NOTIFICATIONS */}
      <SocialProof />

      {/* STICKY NAV */}
      <nav data-testid="sticky-nav" className="glass" style={{ position: "fixed", top: 0, width: "100%", zIndex: 50, padding: "6px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
        <img src={DPM_LOGO} alt="DPM Entertainment" style={{ height: 60, objectFit: "contain", filter: "brightness(1.3)", background: "rgba(201,168,76,0.06)", borderRadius: 8, padding: "4px 8px" }} />
        <a href="#apply" className="gold-btn" style={{ padding: "10px 24px", borderRadius: 50, fontSize: "0.7rem", textDecoration: "none" }}>Apply Now — &#8377;999</a>
      </nav>

      {/* HERO */}
      <header data-testid="hero-section" style={{ minHeight: "100vh", background: "#0c0c0c", position: "relative", display: "flex", alignItems: "center", padding: "120px 32px 100px", overflow: "hidden" }}>
        {/* Background effects */}
        <div style={{ position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)", width: 900, height: 600, background: "radial-gradient(ellipse at center,rgba(201,168,76,0.13) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(201,168,76,0.18) 1px,transparent 1px)", backgroundSize: "40px 40px", opacity: 0.25, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to bottom,transparent,#0c0c0c)", pointerEvents: "none" }} />

        <div className="hero-grid" style={{ position: "relative", zIndex: 10, maxWidth: 1100, width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          {/* Text Content */}
          <div>
            <div className="fade-in-up delay-1" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 32, background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 50, padding: "8px 20px" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A84C", flexShrink: 0 }} />
              <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.6rem", letterSpacing: "0.35em", color: "#C9A84C", textTransform: "uppercase", fontWeight: 600 }}>Limited Entry &middot; 2026 Edition &middot; Online Auditions Open</span>
            </div>

            <h1 className="fade-in-up delay-2" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.4rem,5.5vw,4.4rem)", lineHeight: 1.12, fontWeight: 900, color: "#f0ede6", marginBottom: 20, letterSpacing: "-0.01em" }}>
              Your Golden Chance to<br />
              <em style={{ color: "#C9A84C", fontStyle: "italic" }}>Enter Bollywood</em><br />
              & Become the New Face
            </h1>

            <div className="fade-in-up delay-3" style={{ width: 48, height: 1, background: "#C9A84C", margin: "24px 0" }} />

            <p className="fade-in-up delay-3" style={{ fontSize: "0.95rem", color: "#c8c0ad", marginBottom: 40, lineHeight: 1.8, letterSpacing: "0.02em" }}>
              Become the Next{" "}
              <strong style={{ color: "#f0ede6", fontWeight: 700 }}>DPM Mr. & Miss, Miss Teen, and Mrs. India 2026</strong>
            </p>

            <div className="fade-in-up delay-4" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <a href="#apply" className="gold-btn gold-btn-pulse" style={{ padding: "18px 48px", borderRadius: 50, fontSize: "0.78rem", textDecoration: "none", letterSpacing: "0.14em", textAlign: "center" }}>
                Yes, Apply for Online Auditions
              </a>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "#857d6e", textTransform: "uppercase" }}>Application Fee</span>
                <span style={{ width: 1, height: 10, background: "#2e2e2e" }} />
                <span style={{ fontSize: "0.7rem", color: "#857d6e", textDecoration: "line-through" }}>&#8377;4,999</span>
                <span style={{ fontSize: "0.75rem", color: "#C9A84C", fontWeight: 700, letterSpacing: "0.05em" }}>&#8377;999 Only</span>
              </div>
            </div>

            {/* Stats */}
            <div className="stats-strip fade-in-up delay-5" style={{ marginTop: 48, display: "flex", gap: 32, flexWrap: "wrap" }}>
              {[
                ["500+", "Careers Launched"],
                ["₹11L+", "Prizes"],
                ["4", "Categories"],
                ["100%", "Grooming Support"],
              ].map(([val, label], i) => (
                <div key={label} style={{ display: "contents" }}>
                  {i > 0 && <div className="stats-divider" style={{ width: 1, background: "rgba(201,168,76,0.15)" }} />}
                  <div style={{ textAlign: "center" }}>
                    <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontWeight: 700, color: "#C9A84C", display: "block" }}>{val}</span>
                    <span style={{ fontSize: "0.55rem", letterSpacing: "0.2em", color: "#857d6e", textTransform: "uppercase" }}>{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image - Urvashi */}
          <div className="hero-image-col" style={{ position: "relative" }}>
            <div className="hero-image-wrapper" style={{ position: "relative", borderRadius: 16, overflow: "hidden", height: 600, boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}>
              <img src={URVASHI_HEADER} alt="Urvashi Rautela" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, borderRadius: 16, border: "1px solid rgba(201,168,76,0.25)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 32px", background: "linear-gradient(to top,rgba(12,12,12,0.95) 0%,rgba(12,12,12,0.6) 60%,transparent 100%)" }}>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", color: "#f0ede6", fontWeight: 700 }}>Urvashi Rautela</p>
                <p style={{ fontSize: "0.55rem", color: "#C9A84C", letterSpacing: "0.25em", textTransform: "uppercase", marginTop: 5 }}>Celebrity Patron & Chief Guest</p>
              </div>
            </div>

            {/* Spots Remaining + Countdown */}
            <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
              <span className="spots-dot" />
              <span style={{ fontSize: "0.75rem", color: "#ef4444", fontWeight: 700 }}>Only {Math.floor(Math.random() * 21) + 30} spots remaining</span>
            </div>
            <div style={{ marginTop: 16, display: "flex", gap: 10, justifyContent: "center" }}>
              {[
                [countdown.days, "Days"],
                [countdown.hours, "Hrs"],
                [countdown.mins, "Min"],
                [countdown.secs, "Sec"],
              ].map(([val, label]) => (
                <div key={label} className="countdown-box">
                  <div className="num">{String(val).padStart(2, "0")}</div>
                  <div className="label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* TRUST BADGES BAR */}
      <div style={{ background: "#080808", padding: "16px 24px", borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
          <div className="trust-badge"><Shield size={14} color="#C9A84C" /> Secure Payment</div>
          <div className="trust-badge"><CheckCircle size={14} color="#C9A84C" /> Verified by 500+ Winners</div>
          <div className="trust-badge"><Users size={14} color="#C9A84C" /> 1,247 Applied This Week</div>
          <div className="trust-badge"><TrendingUp size={14} color="#C9A84C" /> 98% Satisfaction Rate</div>
        </div>
      </div>

      {/* TALENT HUNT */}
      <section data-testid="talent-hunt-section" className="section-fade" style={{ padding: "80px 24px", background: "#111111" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.4em", color: "#C9A84C", textTransform: "uppercase", display: "block", marginBottom: 16 }}>The Opportunity</span>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "#f0ede6", marginBottom: 20 }}>DPM Entertainment is on<br />Their Talent Hunt</h2>
          <p style={{ fontSize: "1rem", color: "#c8c0ad", lineHeight: 1.8, maxWidth: 600, margin: "0 auto 48px" }}>This is your golden chance to showcase your talent and get the fame and spotlight you deserve.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16, marginBottom: 48 }}>
            {[
              [CheckCircle, "No Modelling Experience Required"],
              [GraduationCap, "Grooming Support Will Be Provided"],
              [Camera, "Guaranteed Portfolio Shoot & Digital Exposure"],
            ].map(([Icon, text]) => (
              <div key={text} style={{ background: "#181818", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 8, padding: "24px 28px", display: "flex", alignItems: "center", gap: 16 }}>
                <Icon size={28} color="#e6c364" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#f0ede6", textAlign: "left" }}>{text}</span>
              </div>
            ))}
          </div>
          <a href="#apply" className="gold-btn" style={{ padding: "16px 40px", borderRadius: 50, fontSize: "0.75rem" }}>Apply for Online Auditions</a>
        </div>
      </section>

      {/* JURY SECTION */}
      <section data-testid="jury-section" className="section-fade" style={{ padding: "80px 24px", background: "#0c0c0c" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontSize: "0.6rem", letterSpacing: "0.4em", color: "#C9A84C", textTransform: "uppercase", display: "block", marginBottom: 12 }}>The Grand Jury</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", color: "#f0ede6" }}>Meet Our Esteemed Jury</h2>
            <div style={{ height: 1, width: 60, background: "#C9A84C", margin: "20px auto 0" }} />
          </div>

          {/* Featured Jury - Top Row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24, marginBottom: 32 }}>
            {[
              { name: "Dinesh Sudarshan Soi", role: "Director & Producer, Film Industry", followers: "", insta: "", bio: "Visionary director with 100+ music videos. Films on Amazon Prime & Apple TV. India & Asia Book of Records holder. Only Indian director awarded IMDb Top Contributor Trophy by CEO Col Needham. Founder of DS Creations.", img: "https://drive.google.com/thumbnail?id=1IK60Sj1Uq3limfP5dqu8qIC21vFyhimb&sz=w800" },
              { name: "Dishi Bhatnagar", role: "Director, Miss Mrs & Mr Asia International", followers: "220K+", insta: "tauriangirl_16official", bio: "Aviation to fashion icon. Winner - Glammonn Miss & Mrs India (Phuket), Miss & Mrs Eternal Beauty (Malaysia). Femina Miss India Top 5. Face of Tanishq. VP of CTI-New Delhi. Founder adishproductionz.", img: "https://drive.google.com/thumbnail?id=1qBxj0MwXgpTTK53oAU2pwjCBrskQL70c&sz=w800" },
              { name: "Ishmeet Kaur", role: "Mrs India World 2024", followers: "", insta: "iishmeetkaurr", bio: "Mrs India World 2024. Her journey celebrates inner strength, resilience & the belief that true beauty comes from within. Styled celebrities including Raveena Tandon.", img: "https://drive.google.com/thumbnail?id=1Cv5OB4QcJ0WR53YeZJ52UPTJA_b0HDy9&sz=w800" },
            ].map((j, i) => (
              <div key={i} style={{ background: "#111111", border: "1px solid rgba(201,168,76,0.12)", borderRadius: 12, padding: "28px 24px", display: "flex", gap: 20, alignItems: "flex-start", transition: "all 0.3s" }} className="testimonial-card">
                <div style={{ width: 90, height: 90, borderRadius: "50%", border: "2px solid rgba(201,168,76,0.4)", flexShrink: 0, overflow: "hidden" }}>
                  <img src={j.img} alt={j.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.05rem", color: "#f0ede6", marginBottom: 4 }}>{j.name}</h3>
                  <p style={{ fontSize: "0.6rem", color: "#C9A84C", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>{j.role}</p>
                  <p style={{ fontSize: "0.78rem", color: "#857d6e", lineHeight: 1.6, marginBottom: 8 }}>{j.bio}</p>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    {j.followers && <span style={{ fontSize: "0.6rem", color: "#c8c0ad", background: "#181818", padding: "4px 10px", borderRadius: 20 }}>{j.followers} followers</span>}
                    {j.insta && <a href={`https://instagram.com/${j.insta}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.6rem", color: "#C9A84C", textDecoration: "none" }}>@{j.insta.length > 20 ? j.insta.substring(0, 20) + "..." : j.insta}</a>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Other Jury Members - Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 }}>
            {[
              { name: "Dr. Akanksha Massey", role: "Gynecologist & Mentor", insta: "akanksha_mrsindia", bio: "OBG specialist with 17 years experience. Mrs India One In a Million RU 2023. Also won Mrs India Glamorous Gold, Beautiful Body & Beautiful Skin titles. Author with 60+ publications.", img: "https://drive.google.com/thumbnail?id=17g1rnhT6dZiFQLfKL0XiY3z6rkcBM15V&sz=w800" },
              { name: "Ankit Nagpal", role: "Mentor & Personality Coach", insta: "rareimprints.ankit.nagpal", bio: "Founder of Bang on Target PR & Media Solutions. BR Ambedkar National Award winner. Co-Founder of The Great Indian Youth Fest. Groomer & jury at 15+ national pageants.", img: "https://drive.google.com/thumbnail?id=1Gi9BLumdGubfJ00NwqIMbpEhbiJ8hkDE&sz=w800" },
              { name: "Allie Sharma", role: "Show Director & International Pageant Groomer", insta: "alliesharmaofficial", bio: "Founder & National Director of pageants by GIEP. International Pageant Coach with a decade of experience. Celebrated fashion designer with grand shows at India's best platforms.", img: "https://drive.google.com/thumbnail?id=1zxgjZRLYaNjovflbL7axASyYwJK4rCpj&sz=w800" },
              { name: "Sapna Chauhan", role: "Entrepreneur & Filmmaker", insta: "sapna.styleframes", bio: "Entrepreneur, actor, filmmaker. Delhi-based fashion & lifestyle expert. Former IndiGo Airlines flight attendant (6.5 yrs). Originally from Shimla.", img: "https://drive.google.com/thumbnail?id=1bOc-H7upEmCfEEUgvQOvrXXzOauCnvf8&sz=w800" },
              { name: "Kanchan Vishwakarma", role: "Scientist & Shows Topper 2017", insta: "", bio: "Crowned Dellywood Miss India 2016. Miss Diva Lucknow Finalist & Top 50 at Miss Diva 2017 finals. Ph.D. Plant & Microbial Scientist.", img: "https://drive.google.com/thumbnail?id=1l3PHmtyoTF1xxKKfdPpd3y1gUN90aTPH&sz=w800" },
              { name: "Shalini Kashyap", role: "Miss Universe Earth International 2022 | Communication Coach", insta: "", bio: "Miss Universe Earth International 2022. Communication coach and fashion designer with years of experience grooming contestants for national & international pageants.", img: "https://drive.google.com/thumbnail?id=1k9OXMe6_Uh0YqB-6IXs9SMkwJ79-6I8F&sz=w800" },
            ].map((j, i) => (
              <div key={i} style={{ background: "#111111", border: "1px solid rgba(201,168,76,0.08)", borderRadius: 10, padding: "24px 20px", textAlign: "center", transition: "all 0.3s" }} className="testimonial-card">
                <div style={{ width: 100, height: 100, borderRadius: "50%", border: "2px solid rgba(201,168,76,0.25)", margin: "0 auto 14px", overflow: "hidden" }}>
                  <img src={j.img} alt={j.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
                </div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.9rem", color: "#f0ede6", marginBottom: 4 }}>{j.name}</h3>
                <p style={{ fontSize: "0.55rem", color: "#C9A84C", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>{j.role}</p>
                <p style={{ fontSize: "0.72rem", color: "#857d6e", lineHeight: 1.5, marginBottom: 8 }}>{j.bio}</p>
                {j.insta && <a href={`https://instagram.com/${j.insta}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.55rem", color: "#C9A84C", textDecoration: "none" }}>@{j.insta}</a>}
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <a href="#apply" className="gold-outline-btn" style={{ padding: "14px 36px", borderRadius: 50, fontSize: "0.7rem" }}>Apply for Online Auditions</a>
          </div>
        </div>
      </section>

      {/* CELEBRITY - URVASHI RAUTELA */}
      <section data-testid="celebrity-section" className="section-fade" style={{ background: "#080808", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontSize: "0.6rem", letterSpacing: "0.4em", color: "#C9A84C", textTransform: "uppercase" }}>Celebrity Patron</span>
          </div>
          <div className="celebrity-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", height: 680, boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}>
              <img src={URVASHI_GIF} alt="Urvashi Rautela" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 8%", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, borderRadius: 12, border: "1px solid rgba(201,168,76,0.25)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 32px", background: "linear-gradient(to top,rgba(8,8,8,0.95) 0%,rgba(8,8,8,0.6) 60%,transparent 100%)" }}>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", color: "#f0ede6", fontWeight: 700 }}>Urvashi Rautela</p>
                <p style={{ fontSize: "0.55rem", color: "#C9A84C", letterSpacing: "0.25em", textTransform: "uppercase", marginTop: 5 }}>Celebrity Patron & Chief Guest</p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,3.5vw,3.2rem)", color: "#f0ede6", lineHeight: 1.15, marginBottom: 36 }}>
                Get Crowned by<br />
                <em style={{ color: "#C9A84C" }}>Miss Universe Urvashi Rautela</em>
              </h2>
              <div style={{ borderLeft: "2px solid #C9A84C", paddingLeft: 24, marginBottom: 40, display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  ["Bollywood Star", true],
                  ["Winner Universe", false],
                  ["Miss Diva Universe 2015", false],
                  ["Femina Miss India 2015", false],
                  ["International Film Star", false],
                ].map(([text, bold]) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: bold ? "#C9A84C" : "rgba(201,168,76,0.4)", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.9rem", color: bold ? "#f0ede6" : "#c8c0ad", fontWeight: bold ? 700 : 400 }}>{text}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "#111111", border: "1px solid rgba(201,168,76,0.12)", borderRadius: 8, padding: "24px 28px", marginBottom: 36, position: "relative" }}>
                <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", color: "#C9A84C", lineHeight: 0, position: "absolute", top: 20, left: 20, opacity: 0.5 }}>"</span>
                <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "0.95rem", color: "#c8c0ad", lineHeight: 1.8, paddingLeft: 20 }}>This is your golden chance. Step forward, the spotlight is waiting for you.</p>
              </div>
              <a href="#apply" className="gold-btn" style={{ padding: "18px 40px", borderRadius: 50, fontSize: "0.78rem", alignSelf: "flex-start" }}>Apply for Online Auditions</a>
            </div>
          </div>
        </div>
      </section>

      {/* PRIZES */}
      <section data-testid="prizes-section" className="section-fade" style={{ padding: "80px 24px", background: "#080808" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,3rem)", color: "#C9A84C", marginBottom: 8 }}>Prizes Worth &#8377;11L+</h2>
            <p style={{ color: "#c8c0ad", fontSize: "0.95rem" }}>and a Direct Ticket to Bollywood</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16, marginBottom: 56 }}>
            {[
              [Banknote, "Cash Prize", "Worth ₹11,00,000\n(T&C Apply)"],
              [Film, "1-Year In-House Contract", "Web series, movies, music videos, fashion shows & more"],
              [Plane, "International Platform", "Represent India on an International Stage"],
              [Star, "Brand Ambassador", "National & International Brand Ambassador"],
              [Theater, "Bollywood Access", "Chance to Work with Bollywood Celebrities"],
            ].map(([Icon, title, desc]) => (
              <div key={title} className="prize-card" style={{ background: "#111111", padding: "32px 20px", borderRadius: 6, textAlign: "center" }}>
                <Icon size={40} color="#e6c364" style={{ marginBottom: 16 }} />
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", color: "#f0ede6", marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: "0.7rem", color: "#857d6e", lineHeight: 1.6, whiteSpace: "pre-line" }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <a href="#apply" className="gold-btn" style={{ padding: "16px 40px", borderRadius: 50, fontSize: "0.75rem" }}>Apply for Online Auditions</a>
          </div>
        </div>
      </section>

      {/* APPLICATION PROCESS */}
      <section data-testid="process-section" className="section-fade" style={{ padding: "80px 24px", background: "#0c0c0c" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "#f0ede6" }}>Here's How to Apply</h2>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 0, flexWrap: "wrap", justifyContent: "center" }}>
            {[
              [CreditCard, "Paid Registration", true],
              [Video, "Online Auditions", false],
              [Camera, "PhotoShoot", false],
              [Mic, "Interview", false],
              [Trophy, "Finale", true],
            ].map(([Icon, label, filled], i) => (
              <div key={label} style={{ textAlign: "center", flex: 1, minWidth: 140, padding: "0 8px" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: filled ? "linear-gradient(135deg,#e6c364,#C9A84C)" : "transparent",
                  border: filled ? "none" : "1px solid rgba(201,168,76,0.4)",
                  color: filled ? "#0c0c0c" : "#C9A84C",
                  fontWeight: filled ? 800 : 700, fontSize: filled ? "1.2rem" : "1.1rem",
                  display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px"
                }}>{i + 1}</div>
                <Icon size={24} color="#C9A84C" style={{ display: "block", margin: "0 auto 8px" }} />
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#f0ede6", fontWeight: 700 }}>{label}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 56 }}>
            <a href="#apply" className="gold-btn" style={{ padding: "18px 48px", borderRadius: 50, fontSize: "0.8rem" }}>Apply Now</a>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section data-testid="categories-section" className="section-fade" style={{ padding: "80px 24px", background: "#080808" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ fontSize: "0.6rem", letterSpacing: "0.4em", color: "#C9A84C", textTransform: "uppercase", display: "block", marginBottom: 12 }}>Find Your Crown</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,3rem)", color: "#f0ede6" }}>Entry Categories</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20, marginBottom: 32 }}>
            {[
              { title: "Mr. India", age: "Age: 16 - 32 Years", popular: false, img: CATEGORY_IMAGES.mr },
              { title: "Mrs. India", age: "Age: 23 - 60 Years | Married", popular: false, img: CATEGORY_IMAGES.mrs },
              { title: "Miss India", age: "Age: 16 - 28 Years", popular: true, img: CATEGORY_IMAGES.miss },
              { title: "Miss Teen India", age: "Age: 12 - 18 Years", popular: false, img: CATEGORY_IMAGES.teen },
            ].map((cat) => (
              <div key={cat.title} className="category-card" style={{ background: "#111111", border: cat.popular ? "2px solid rgba(201,168,76,0.35)" : "1px solid rgba(201,168,76,0.12)", borderRadius: 8, overflow: "hidden", textAlign: "center", position: "relative" }}>
                {cat.popular && (
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, background: "linear-gradient(135deg,#C9A84C,#e6c364)", padding: 6, textAlign: "center", zIndex: 2 }}>
                    <span style={{ fontSize: "0.55rem", letterSpacing: "0.2em", color: "#0c0c0c", fontWeight: 800, textTransform: "uppercase" }}>Most Popular</span>
                  </div>
                )}
                <div style={{ height: 260, background: "#181818", position: "relative", marginTop: cat.popular ? 28 : 0, overflow: "hidden" }}>
                  <img src={cat.img} alt={cat.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", transition: "all 0.5s ease" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: "linear-gradient(to top,#111111,transparent)" }} />
                </div>
                <div style={{ padding: 24 }}>
                  <Award size={28} color="#C9A84C" style={{ marginBottom: 8 }} />
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", color: "#f0ede6", marginBottom: 6 }}>{cat.title}</h3>
                  <p style={{ fontSize: "0.65rem", color: "#C9A84C", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20 }}>{cat.age}</p>
                  <a href="#apply" className="gold-btn" style={{ padding: "12px 24px", borderRadius: 50, fontSize: "0.65rem", display: "block" }}>Apply for {cat.title}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAST EVENTS */}
      <section data-testid="past-events-section" className="section-fade" style={{ padding: "80px 24px", background: "#0c0c0c" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.6rem,3vw,2.5rem)", color: "#f0ede6", textAlign: "center", marginBottom: 48, fontStyle: "italic" }}>Past Event Photos & BTS</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gridTemplateRows: "auto auto", gap: 12 }}>
            <div style={{ gridRow: "1/3", borderRadius: 6, minHeight: 400, overflow: "hidden", border: "1px solid rgba(201,168,76,0.08)" }}>
              <img src={EVENT_IMAGES[0]} alt="Past Event" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            {EVENT_IMAGES.slice(1).map((img, i) => (
              <div key={i} style={{ borderRadius: 6, minHeight: 190, overflow: "hidden", border: "1px solid rgba(201,168,76,0.08)" }}>
                <img src={img} alt={`Event ${i + 2}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section data-testid="testimonials-section" className="section-fade" style={{ padding: "80px 24px", background: "#111111" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "#f0ede6", textAlign: "center", marginBottom: 56 }}>Voices of Victory</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
            {TESTIMONIAL_DATA.map((t, i) => (
              <div key={i} className="testimonial-card" style={{ background: "#181818", border: "1px solid rgba(201,168,76,0.12)", borderRadius: 8, padding: 36, position: "relative" }}>
                <Quote size={36} color="#C9A84C" style={{ position: "absolute", top: -16, left: 28 }} />
                <p style={{ fontStyle: "italic", color: "#c8c0ad", lineHeight: 1.8, marginBottom: 24, fontSize: "0.9rem" }}>{t.quote}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#C9A84C,#e6c364)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.9rem", fontWeight: 700, color: "#0c0c0c" }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h5 style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.85rem", color: "#f0ede6" }}>{t.name}</h5>
                    <p style={{ fontSize: "0.6rem", color: "#C9A84C", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 2 }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT DPM */}
      <section data-testid="about-section" className="section-fade" style={{ padding: "80px 24px", background: "#0c0c0c" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "0.6rem", letterSpacing: "0.4em", color: "#C9A84C", textTransform: "uppercase", display: "block", marginBottom: 16 }}>About DPM Entertainment</span>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#f0ede6", marginBottom: 28, lineHeight: 1.2 }}>A Visionary Force<br /><em style={{ color: "#C9A84C" }}>in Entertainment</em></h2>
              <div style={{ color: "#c8c0ad", lineHeight: 1.9, fontSize: "0.9rem" }}>
                <p style={{ marginBottom: 16 }}>DPM Entertainment, a visionary force in the realm of entertainment, introduces a spectacular chapter in its legacy.</p>
                <p style={{ marginBottom: 16 }}>The DPM Beauty Pageant is not merely a competition. It's a Celebration of elegance, grace, & the pursuit of dreams.</p>
                <p style={{ marginBottom: 16 }}>The Event is a testament to our commitment to creating timeless memories, from captivating performances to breathtaking spectacles.</p>
                <p>The DPM Beauty Pageant isn't a mere contest. It's a platform where elegance finds new dimensions.</p>
              </div>
            </div>
            <div>
              <div style={{ background: "#181818", border: "1px solid rgba(201,168,76,0.12)", borderRadius: 8, height: 460, overflow: "hidden", position: "relative" }}>
                <img src={ABOUT_IMAGES.founder} alt="Shivanshu Mishra - Founder, DPM Entertainment" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 28px", background: "linear-gradient(to top,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.4) 60%,transparent 100%)" }}>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", color: "#f0ede6", fontWeight: 700 }}>Shivanshu Mishra</p>
                  <p style={{ fontSize: "0.55rem", color: "#C9A84C", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 4 }}>Founder, DPM Entertainment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section data-testid="final-cta-section" className="section-fade" style={{ padding: "100px 24px", background: "#080808", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center,rgba(201,168,76,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 700, margin: "0 auto" }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.4em", color: "#C9A84C", textTransform: "uppercase", marginBottom: 20 }}>What are you waiting for? &bull; Limited Slots Remaining for the Auditions</p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,4rem)", color: "#f0ede6", lineHeight: 1.15, marginBottom: 20 }}>Take Your First Step Today<br />to Break Through Your<br /><em style={{ color: "#C9A84C" }}>Bollywood / Modelling / Fashion Career</em></h2>
          <p style={{ color: "#c8c0ad", marginBottom: 48, fontSize: "1rem" }}>Are You the Next Winner?</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
            {["Miss India", "Mrs. India", "Miss Teen", "Mr. India"].map((cat) => (
              <span key={cat} style={{ background: "#111111", border: "1px solid rgba(201,168,76,0.3)", color: "#C9A84C", padding: "10px 20px", borderRadius: 4, fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'Playfair Display',serif" }}>{cat}</span>
            ))}
          </div>
          <a href="#apply" className="gold-btn shimmer gold-btn-pulse" style={{ padding: "20px 56px", borderRadius: 50, fontSize: "0.85rem" }}><span style={{ textDecoration: "line-through", opacity: 0.6, marginRight: 8 }}>&#8377;4,999</span>Apply Now — &#8377;999</a>
          <p style={{ marginTop: 20, fontSize: "0.65rem", color: "#857d6e" }}>Grooming Support Provided &bull; Portfolio Shoot Guaranteed &bull; No Prior Experience Required</p>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <ApplicationForm />

      {/* FAQ SECTION */}
      <FAQSection />

      {/* FOOTER */}
      <footer data-testid="footer-section" style={{ background: "#080808", borderTop: "1px solid rgba(201,168,76,0.1)", padding: "60px 24px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
            <div>
              <img src={DPM_LOGO} alt="DPM Entertainment" style={{ height: 80, objectFit: "contain", marginBottom: 16, filter: "brightness(1.3)" }} />
              <p style={{ fontSize: "0.75rem", color: "#857d6e", lineHeight: 1.8, maxWidth: 280 }}>DPM Entertainment | [Address Line 1] | [City, State, PIN]</p>
              <p style={{ fontSize: "0.75rem", color: "#857d6e", marginTop: 8 }}>dpmentertainment@gmail.com</p>
            </div>
            <div>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "#C9A84C", textTransform: "uppercase", marginBottom: 16 }}>Quick Links</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["About Us", "Previous Events", "Contact Us"].map((link) => (
                  <a key={link} href="#" style={{ fontSize: "0.75rem", color: "#857d6e", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseOver={e => e.target.style.color = "#C9A84C"}
                    onMouseOut={e => e.target.style.color = "#857d6e"}>{link}</a>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "#C9A84C", textTransform: "uppercase", marginBottom: 16 }}>Legal</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <a href="#tnc" style={{ fontSize: "0.75rem", color: "#857d6e", textDecoration: "none" }}
                  onMouseOver={e => e.target.style.color = "#C9A84C"}
                  onMouseOut={e => e.target.style.color = "#857d6e"}>Terms & Conditions</a>
                <a href="#" style={{ fontSize: "0.75rem", color: "#857d6e", textDecoration: "none" }}
                  onMouseOver={e => e.target.style.color = "#C9A84C"}
                  onMouseOut={e => e.target.style.color = "#857d6e"}>Refund Policy</a>
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(201,168,76,0.08)", paddingTop: 24, textAlign: "center" }}>
            <p style={{ fontSize: "0.6rem", color: "#2e2e2e", letterSpacing: "0.1em" }}>Please go through the Rules and Regulations of the contest before registration. By registering and paying the fee, you agree to all Terms & Conditions.</p>
            <p style={{ fontSize: "0.6rem", color: "#2e2e2e", marginTop: 8 }}>&copy; 2026 DPM Entertainment. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* STICKY FOOTER BAR */}
      <div data-testid="sticky-footer-bar" className="glass" style={{ position: "fixed", bottom: 0, width: "100%", zIndex: 50, borderTop: "1px solid rgba(201,168,76,0.15)", padding: "12px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "#C9A84C", textTransform: "uppercase", display: "block" }}>Apply for Auditions Now</span>
            <span style={{ fontSize: "0.7rem", color: "#857d6e" }}>Grooming Support &bull; Portfolio Shoot &bull; No Experience Needed</span>
          </div>
          <a href="#apply" className="gold-btn" style={{ padding: "12px 28px", borderRadius: 50, fontSize: "0.7rem", textDecoration: "none", whiteSpace: "nowrap" }}><span style={{ textDecoration: "line-through", opacity: 0.6, marginRight: 6 }}>&#8377;4,999</span> Apply Now — &#8377;999</a>
        </div>
      </div>

      {/* Bottom spacer for sticky footer */}
      <div style={{ height: 60 }} />
    </div>
  );
}
