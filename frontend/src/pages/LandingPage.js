import { useEffect, useRef } from "react";
import {
  CheckCircle, GraduationCap, Camera, CreditCard, Video, Mic, Trophy,
  Banknote, Film, Plane, Star, Theater, Award, User, Quote, Lock,
  Wallet, Images, Image, ChevronRight
} from "lucide-react";
import ApplicationForm from "@/components/ApplicationForm";
import PopupForm from "@/components/PopupForm";

const URVASHI_HEADER = "https://customer-assets.emergentagent.com/job_page-craft-228/artifacts/vsxnt8rm_541085-baogqnyb.gif";
const URVASHI_GIF = "https://i.postimg.cc/brNfVpBP/541085-baogqnyb.gif";

export default function LandingPage() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".section-fade").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div data-testid="landing-page">
      {/* POPUP FORM - appears after 5 seconds */}
      <PopupForm />

      {/* STICKY NAV */}
      <nav data-testid="sticky-nav" className="glass" style={{ position: "fixed", top: 0, width: "100%", zIndex: 50, padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontWeight: 700, color: "#C9A84C", letterSpacing: "0.15em" }}>DPM</div>
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
                <span style={{ fontSize: "0.75rem", color: "#C9A84C", fontWeight: 700, letterSpacing: "0.05em" }}>&#8377;999 Only</span>
              </div>
            </div>

            {/* Stats */}
            <div className="stats-strip fade-in-up delay-5" style={{ marginTop: 48, display: "flex", gap: 32, flexWrap: "wrap" }}>
              {[
                ["500+", "Careers Launched"],
                ["₹5L+", "Prizes"],
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
          </div>
        </div>
      </header>

      {/* SPONSORS */}
      <section data-testid="sponsors-section" style={{ background: "#080808", padding: "32px 24px", borderTop: "1px solid rgba(201,168,76,0.08)", borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.35em", color: "#857d6e", textTransform: "uppercase", textAlign: "center", marginBottom: 24 }}>Sponsored By</p>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 48, flexWrap: "wrap", opacity: 0.45 }}>
            {["Brand 1", "Brand 2", "Brand 3", "Brand 4"].map((b, i) => (
              <div key={b} style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", fontWeight: 700, color: "#f0ede6", letterSpacing: "0.1em", fontStyle: i === 1 ? "italic" : "normal" }}>{b}</div>
            ))}
          </div>
        </div>
      </section>

      {/* JUDGES */}
      <section data-testid="judges-section" className="section-fade" style={{ padding: "80px 24px", background: "#0c0c0c" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontSize: "0.6rem", letterSpacing: "0.4em", color: "#C9A84C", textTransform: "uppercase", display: "block", marginBottom: 12 }}>The Grand Jury</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", color: "#f0ede6" }}>Meet Our Judges</h2>
            <div style={{ height: 1, width: 60, background: "#C9A84C", margin: "20px auto 0" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 40 }}>
            {[1, 2, 3, 4].map((j) => (
              <div key={j} style={{ textAlign: "center" }}>
                <div style={{ width: 180, height: 180, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.25)", background: "#181818", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  <User size={64} color="#2e2e2e" />
                </div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", color: "#f0ede6", textTransform: "uppercase", letterSpacing: "0.05em" }}>Judge {j}</h3>
                <p style={{ fontSize: "0.6rem", color: "#C9A84C", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 6 }}>Title / Role</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 56 }}>
            <a href="#apply" className="gold-outline-btn" style={{ padding: "14px 36px", borderRadius: 50, fontSize: "0.7rem" }}>Apply for Online Auditions</a>
          </div>
        </div>
      </section>

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
                <em style={{ color: "#C9A84C" }}>Urvashi Rautela</em>
              </h2>
              <div style={{ borderLeft: "2px solid #C9A84C", paddingLeft: 24, marginBottom: 40, display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  ["Actor & Model", true],
                  ["Miss Universe India 2015", false],
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
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,3rem)", color: "#C9A84C", marginBottom: 8 }}>Prizes Worth &#8377;5L+</h2>
            <p style={{ color: "#c8c0ad", fontSize: "0.95rem" }}>and a Direct Ticket to Bollywood</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16, marginBottom: 56 }}>
            {[
              [Banknote, "Cash Prize", "Worth ₹5,00,000\n(T&C Apply)"],
              [Film, "1-Year In-House Contract", "Web series, movies, music videos, fashion shows & more"],
              [Plane, "International Trip", "Free International Trip Voucher"],
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
              { title: "Miss Teen India", age: "Age: 12 - 18 Years", popular: false },
              { title: "Miss India", age: "Age: 16 - 28 Years", popular: true },
              { title: "Mrs. India", age: "Age: 23 - 60 Years | Married", popular: false },
              { title: "Mr. India", age: "Age: 16 - 32 Years", popular: false },
            ].map((cat) => (
              <div key={cat.title} className="category-card" style={{ background: "#111111", border: cat.popular ? "2px solid rgba(201,168,76,0.35)" : "1px solid rgba(201,168,76,0.12)", borderRadius: 8, overflow: "hidden", textAlign: "center", position: "relative" }}>
                {cat.popular && (
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, background: "linear-gradient(135deg,#C9A84C,#e6c364)", padding: 6, textAlign: "center", zIndex: 2 }}>
                    <span style={{ fontSize: "0.55rem", letterSpacing: "0.2em", color: "#0c0c0c", fontWeight: 800, textTransform: "uppercase" }}>Most Popular</span>
                  </div>
                )}
                <div style={{ height: 200, background: "#181818", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", marginTop: cat.popular ? 28 : 0 }}>
                  <User size={64} color="#2e2e2e" />
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
            <div style={{ gridRow: "1/3", background: "#181818", borderRadius: 6, minHeight: 400, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(201,168,76,0.08)" }}>
              <Images size={48} color="#2e2e2e" />
            </div>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{ background: "#181818", borderRadius: 6, minHeight: 190, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(201,168,76,0.08)" }}>
                <Image size={36} color="#2e2e2e" />
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
            {[
              { quote: "Add your participant testimonial here — a genuine quote from a past winner or participant about their experience with DPM.", name: "Participant Name", role: "Miss India Finalist" },
              { quote: "Add a second testimonial here from another winner or past participant sharing how DPM changed their career.", name: "Participant Name", role: "Mr. India Winner" },
              { quote: "Add a third testimonial here — ideally from a Mrs. India or Miss Teen category winner to represent multiple audiences.", name: "Participant Name", role: "Mrs. India Winner" },
            ].map((t, i) => (
              <div key={i} className="testimonial-card" style={{ background: "#181818", border: "1px solid rgba(201,168,76,0.12)", borderRadius: 8, padding: 36, position: "relative" }}>
                <Quote size={36} color="#C9A84C" style={{ position: "absolute", top: -16, left: 28 }} />
                <p style={{ fontStyle: "italic", color: "#c8c0ad", lineHeight: 1.8, marginBottom: 24, fontSize: "0.9rem" }}>{t.quote}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#2e2e2e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <User size={20} color="#857d6e" />
                  </div>
                  <div>
                    <h5 style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.85rem", color: "#f0ede6", textTransform: "uppercase" }}>{t.name}</h5>
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
              <div style={{ background: "#181818", border: "1px solid rgba(201,168,76,0.12)", borderRadius: 8, height: 320, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <div style={{ textAlign: "center" }}>
                  <User size={64} color="#2e2e2e" />
                  <p style={{ fontSize: "0.65rem", color: "#857d6e", marginTop: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>Founder Photo with DPM Board</p>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[1, 2].map((i) => (
                  <div key={i} style={{ background: "#181818", borderRadius: 6, height: 120, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(201,168,76,0.08)" }}>
                    <Image size={28} color="#2e2e2e" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section data-testid="final-cta-section" className="section-fade" style={{ padding: "100px 24px", background: "#080808", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center,rgba(201,168,76,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 700, margin: "0 auto" }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.4em", color: "#C9A84C", textTransform: "uppercase", marginBottom: 20 }}>Limited Slots Remaining for the Auditions</p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,4rem)", color: "#f0ede6", lineHeight: 1.15, marginBottom: 20 }}>Take Your First Step Today<br />to Break Through Your<br /><em style={{ color: "#C9A84C" }}>Bollywood / Modelling / Fashion Career</em></h2>
          <p style={{ color: "#c8c0ad", marginBottom: 48, fontSize: "1rem" }}>Are You the Next Winner?</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
            {["Miss India", "Mrs. India", "Miss Teen", "Mr. India"].map((cat) => (
              <span key={cat} style={{ background: "#111111", border: "1px solid rgba(201,168,76,0.3)", color: "#C9A84C", padding: "10px 20px", borderRadius: 4, fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'Playfair Display',serif" }}>{cat}</span>
            ))}
          </div>
          <a href="#apply" className="gold-btn shimmer gold-btn-pulse" style={{ padding: "20px 56px", borderRadius: 50, fontSize: "0.85rem" }}>Apply for Online Auditions — &#8377;999</a>
          <p style={{ marginTop: 20, fontSize: "0.65rem", color: "#857d6e" }}>Grooming Support Provided &bull; Portfolio Shoot Guaranteed &bull; No Prior Experience Required</p>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <ApplicationForm />

      {/* RULES & REGULATIONS */}
      <section id="tnc" data-testid="rules-section" style={{ padding: "80px 24px", background: "#080808" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "#f0ede6", textAlign: "center", marginBottom: 12 }}>Rules & Regulations</h2>
          <div style={{ height: 1, width: 60, background: "#C9A84C", margin: "0 auto 48px" }} />
          <div style={{ background: "#111111", border: "1px solid rgba(201,168,76,0.1)", borderRadius: 8, padding: 40 }}>
            <ol style={{ color: "#c8c0ad", fontSize: "0.85rem", lineHeight: 2.2, paddingLeft: 20 }}>
              {[
                "The applicant must agree to abide by all rules, as changed from time to time by the organisers.",
                "Age requirements: Male applicant: 16-32 years | Miss Teen (Girls): 12-18 years | Miss (Girls): 16-28 years | Mrs. (Married): 23-60 years.",
                "The applicant will be required to produce their age proof (Passport, birth certificate, school leaving certificate, driver's license, etc).",
                "All female applicants should be natural-born females.",
                "The applicant should be an Indian born.",
                "The applicant should be in good health.",
                "The applicant should not be under any commercial contract with any modeling agency at the time of appearing for the auditions.",
                "The applicant, once short-listed, cannot be a part of any other commercial contract.",
                "The organisers are not responsible for any delays or non-receipt of applications on any account and for any reason whatsoever.",
                "The applicant will have to participate in a disciplined and diligent manner throughout as per the schedule given.",
                "The organisers are not responsible if the sponsors do not make good the prizes promised by them.",
                "The organisers are not responsible for any loss or physical injury that occurs to the applicant on account of their participation in the event. The applicant will participate at her own risk.",
                "Incorrect information will result in disqualification, whether discovered prior to, during or after participation.",
                "The decision of the judges is final in all cases.",
                "Only persons of good health and moral character can participate.",
                "Only the applicant will be allowed inside the designated venue of the preliminaries.",
                "The schedule of events and qualification rounds is subject to change at the discretion of the organisers.",
                "In the event of any dispute, the organiser's decisions are final and binding on the applicant.",
                "The courts of Allahabad have jurisdiction over all disputes.",
                "The organisers have all the right to cancel, reschedule, postpone, or amend the show.",
              ].map((rule, i) => (
                <li key={i} style={{ marginBottom: 8 }}>{rule}</li>
              ))}
              <li style={{ marginBottom: 8 }}><strong style={{ color: "#f0ede6" }}>The fees paid towards grooming or registration are non-refundable in any circumstances.</strong></li>
              <li style={{ marginBottom: 8 }}>Please note that if you fail to join the event using the provided Zoom link of the auditions for three consecutive times, the registration will be considered null and void.</li>
            </ol>
            <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(201,168,76,0.1)" }}>
              <p style={{ fontSize: "0.8rem", color: "#857d6e", lineHeight: 1.8 }}>For further information/clarification, contact:<br />
                <a href="mailto:dpmentertainment@gmail.com" style={{ color: "#C9A84C" }}>dpmentertainment@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer data-testid="footer-section" style={{ background: "#080808", borderTop: "1px solid rgba(201,168,76,0.1)", padding: "60px 24px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
            <div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 700, color: "#C9A84C", letterSpacing: "0.15em", marginBottom: 16 }}>DPM</div>
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
          <a href="#apply" className="gold-btn" style={{ padding: "12px 28px", borderRadius: 50, fontSize: "0.7rem", textDecoration: "none", whiteSpace: "nowrap" }}>Apply Now — &#8377;999</a>
        </div>
      </div>

      {/* Bottom spacer for sticky footer */}
      <div style={{ height: 60 }} />
    </div>
  );
}
