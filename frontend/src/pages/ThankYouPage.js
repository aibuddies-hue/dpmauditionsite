import ThankYouForm from "@/components/ThankYouForm";

export default function ThankYouPage() {
  return (
    <div style={{ background: "#0c0c0c", minHeight: "100vh", padding: "60px 24px 120px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "#f0ede6", marginBottom: 8 }}>Complete Your Profile</h2>
          <p style={{ color: "#857d6e", fontSize: "0.8rem" }}>Fill in your details for the audition process</p>
        </div>
        <ThankYouForm applicationId="" name="" email="" phone="" />
      </div>
    </div>
  );
}
