const sectionStyle = { marginBottom: 32 };
const headingStyle = { fontFamily: "'Playfair Display',serif", fontSize: "1.15rem", color: "#f0ede6", marginBottom: 16 };
const paraStyle = { color: "#c8c0ad", fontSize: "0.85rem", lineHeight: 2, marginBottom: 12 };
const listStyle = { color: "#c8c0ad", fontSize: "0.85rem", lineHeight: 2, paddingLeft: 20, listStyleType: "disc", marginBottom: 12 };
const goldText = { color: "#C9A84C" };
const bold = { color: "#f0ede6", fontWeight: 700 };

export default function TermsContent() {
  return (
    <div data-testid="terms-content">
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <p style={{ ...paraStyle, ...goldText, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Organizer: DPM Entertainment</p>
        <p style={paraStyle}>Event Name: DPM Mr. & Miss, Miss Teen, and Mrs. India</p>
        <p style={paraStyle}>Contact Email: <a href="mailto:dpmentertainment@gmail.com" style={goldText}>dpmentertainment@gmail.com</a></p>
      </div>

      {/* 1 */}
      <div style={sectionStyle}>
        <h3 style={headingStyle}>1. Acceptance of Terms</h3>
        <p style={paraStyle}>By accessing this website, submitting a registration application, and/or making payment of the registration fee, the applicant ("Applicant," "Participant," "You") unconditionally agrees to be bound by these Terms and Conditions ("T&Cs"), the Rules and Regulations set out herein, and any other policies, guidelines, or instructions issued by DPM Entertainment ("Organizer," "We," "Us," "Our") from time to time.</p>
        <p style={paraStyle}>If the Applicant does not agree to these T&Cs, they must immediately discontinue use of this website and refrain from submitting any application or payment.</p>
        <p style={paraStyle}>For Miss Teen Applicants who are below 18 years of age, these T&Cs must be read, understood, and accepted by the Applicant's parent or legal guardian on the Applicant's behalf.</p>
      </div>

      {/* 2 */}
      <div style={sectionStyle}>
        <h3 style={headingStyle}>2. About the Event</h3>
        <p style={paraStyle}>DPM Entertainment is a talent and entertainment organization conducting the DPM Beauty Pageant — a multi-category competition celebrating elegance, talent, and aspiration.</p>
        <div style={{ background: "#181818", borderRadius: 8, padding: "16px 20px", marginBottom: 16, overflowX: "auto" }}>
          <table style={{ width: "100%", fontSize: "0.8rem", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
                <th style={{ padding: "10px 12px", textAlign: "left", color: "#C9A84C", fontWeight: 700 }}>Category</th>
                <th style={{ padding: "10px 12px", textAlign: "left", color: "#C9A84C", fontWeight: 700 }}>Eligibility (Age)</th>
                <th style={{ padding: "10px 12px", textAlign: "left", color: "#C9A84C", fontWeight: 700 }}>Marital Status</th>
              </tr>
            </thead>
            <tbody style={{ color: "#c8c0ad" }}>
              <tr style={{ borderBottom: "1px solid rgba(201,168,76,0.08)" }}><td style={{ padding: "10px 12px" }}>Mr. India</td><td style={{ padding: "10px 12px" }}>16 to 32 years</td><td style={{ padding: "10px 12px" }}>Not Specified</td></tr>
              <tr style={{ borderBottom: "1px solid rgba(201,168,76,0.08)" }}><td style={{ padding: "10px 12px" }}>Miss India</td><td style={{ padding: "10px 12px" }}>16 to 28 years</td><td style={{ padding: "10px 12px" }}>Unmarried</td></tr>
              <tr style={{ borderBottom: "1px solid rgba(201,168,76,0.08)" }}><td style={{ padding: "10px 12px" }}>Miss Teen India</td><td style={{ padding: "10px 12px" }}>12 to 18 years</td><td style={{ padding: "10px 12px" }}>Unmarried</td></tr>
              <tr><td style={{ padding: "10px 12px" }}>Mrs. India</td><td style={{ padding: "10px 12px" }}>23 to 60 years</td><td style={{ padding: "10px 12px" }}>Married</td></tr>
            </tbody>
          </table>
        </div>
        <p style={paraStyle}>The Event format includes Online Auditions, Photoshoot, Interview, and Grand Finale stages. The Organizer reserves the right to modify the format, stages, schedule, and structure of the Event at any time without prior notice.</p>
      </div>

      {/* 3 */}
      <div style={sectionStyle}>
        <h3 style={headingStyle}>3. Eligibility Criteria</h3>
        <ol style={{ ...listStyle, listStyleType: "decimal" }}>
          {[
            "The Applicant must be an Indian national by birth.",
            "The Applicant must fall within the age range applicable to their chosen category.",
            "The Applicant must be in good physical health and of good moral character.",
            "All female applicants must be natural-born females.",
            "For the Mrs. India category, the Applicant must be a married woman at the time of application.",
            "The Applicant must not be under any commercial contract with any modeling agency at the time of appearing for the auditions.",
            "Once shortlisted, the Applicant cannot enter into any other commercial contract without the prior written consent of the Organizer.",
            "The Applicant must not have any criminal record or pending criminal proceedings against them.",
            "No prior modeling, acting, or performance experience is required.",
          ].map((item, i) => <li key={i} style={{ marginBottom: 4 }}>{item}</li>)}
        </ol>
      </div>

      {/* 4 */}
      <div style={sectionStyle}>
        <h3 style={headingStyle}>4. Registration Process</h3>
        <p style={{ ...paraStyle, ...bold }}>4.1 Application Steps</p>
        <ol style={{ ...listStyle, listStyleType: "decimal" }}>
          <li style={{ marginBottom: 4 }}>Step 1 - Personal Details: Name, Email, WhatsApp Number, Date of Birth, Age, Father's/Spouse's Name, Marital Status, State, City, and Category.</li>
          <li style={{ marginBottom: 4 }}>Step 2 - Review: The Applicant reviews all submitted details before proceeding.</li>
          <li style={{ marginBottom: 4 }}>Step 3 - Payment: The Applicant completes payment of the registration fee through the payment gateway.</li>
        </ol>
        <p style={{ ...paraStyle, ...bold }}>4.2 Registration Fee</p>
        <p style={paraStyle}>The non-refundable, non-transferable registration fee is <span style={goldText}>&#8377;999</span> (Indian Rupees Nine Hundred and Ninety-Nine Only) per application.</p>
        <p style={{ ...paraStyle, ...bold }}>4.3 Application Accuracy</p>
        <p style={paraStyle}>All information submitted must be accurate, complete, and truthful. Submission of incorrect, false, or misleading information shall result in immediate disqualification without any entitlement to refund.</p>
        <p style={{ ...paraStyle, ...bold }}>4.4 Document Verification</p>
        <p style={paraStyle}>The Applicant must be prepared to submit valid age proof documents upon request. Acceptable documents include: Passport, Aadhaar Card, Birth Certificate, School Leaving Certificate, or Driver's License.</p>
        <p style={{ ...paraStyle, ...bold }}>4.5 Confirmation</p>
        <p style={paraStyle}>Upon successful payment, the Applicant will receive a confirmation on their registered email and/or WhatsApp. The Organizer's team will contact within 24 hours with next steps for auditions.</p>
      </div>

      {/* 5 */}
      <div style={sectionStyle}>
        <h3 style={headingStyle}>5. Registration Fee — Non-Refundable and Non-Cancellable</h3>
        <p style={{ ...paraStyle, ...bold }}>The registration fee of &#8377;999 is strictly non-refundable and non-cancellable under all circumstances once payment has been processed.</p>
        <p style={paraStyle}>The registration is non-transferable to another person, another category, or another event cycle.</p>
        <p style={paraStyle}>No refund, credit, waiver, or adjustment shall be made for any reason including but not limited to:</p>
        <ul style={listStyle}>
          <li>Change of mind by the Applicant after payment</li>
          <li>Inability to attend auditions, photoshoot, interview, or finale</li>
          <li>Failure to qualify at any stage of the competition</li>
          <li>Technical issues at the Applicant's end during the online audition</li>
          <li>Any personal, medical, family, or professional circumstances</li>
          <li>Rescheduling, postponement, or format change of the Event by the Organizer</li>
        </ul>
      </div>

      {/* 6 */}
      <div style={sectionStyle}>
        <h3 style={headingStyle}>6. Online Audition — Zoom Policy</h3>
        <p style={paraStyle}>Online auditions are conducted over Zoom or any other video conferencing platform designated by the Organizer.</p>
        <p style={{ ...paraStyle, ...bold }}>If the Applicant fails to join on three (3) consecutive scheduled occasions, the registration shall be considered null and void.</p>
        <p style={paraStyle}>The Applicant is responsible for ensuring stable internet connectivity, a functioning device, and timely joining. Technical issues at the Applicant's end do not entitle a rescheduled session or refund.</p>
      </div>

      {/* 7 */}
      <div style={sectionStyle}>
        <h3 style={headingStyle}>7. Prizes, Benefits, and Opportunities</h3>
        <p style={paraStyle}>The prizes, benefits, and opportunities advertised on the website, including Cash Prize, 1-Year In-House Contract, Free International Trip Voucher, Brand Ambassador opportunities, Guaranteed Portfolio Shoot, and Digital Exposure, are subject to Terms and Conditions, successful completion of all stages, and availability of sponsors.</p>
        <p style={paraStyle}>The Organizer is not responsible if a sponsor or third party does not fulfill a prize or benefit. "Direct Ticket to Bollywood" and similar statements are indicative of opportunities and do not constitute a guaranteed contractual commitment.</p>
        <p style={paraStyle}>The Organizer does not guarantee income, employment, casting, or professional success to any Applicant or winner.</p>
      </div>

      {/* 8 */}
      <div style={sectionStyle}>
        <h3 style={headingStyle}>8. Rules and Regulations of the Contest</h3>
        <ol style={{ ...listStyle, listStyleType: "decimal" }}>
          {[
            "The Applicant must abide by all rules as modified from time to time by the Organizer.",
            "The Applicant must participate in a disciplined and diligent manner throughout the Event.",
            "The Applicant must maintain good health, conduct, and moral character throughout the competition.",
            "Only the Applicant shall be allowed inside the designated venue for preliminary rounds.",
            "Incorrect information at any stage shall result in immediate disqualification.",
            "The Applicant must not be under any commercial contract with a modeling or talent agency at the time of auditions.",
            "Once shortlisted, the Applicant shall not enter into any other commercial contract without prior written consent of the Organizer.",
            "The Organizer is not responsible for any delays in receipt of applications.",
            "The schedule of events, qualification rounds, venues, and timings is subject to change at the sole discretion of the Organizer.",
            "In the event of any dispute, the Organizer's decision shall be final and binding.",
            "The decision of the judges in all scoring, selection, and title-awarding matters is final and cannot be contested or appealed.",
            "The Organizer has the right to cancel, reschedule, postpone, or amend the competition at any time.",
          ].map((item, i) => <li key={i} style={{ marginBottom: 4 }}>{item}</li>)}
        </ol>
      </div>

      {/* 9-19 condensed */}
      <div style={sectionStyle}>
        <h3 style={headingStyle}>9. Organizer's Rights</h3>
        <p style={paraStyle}>The Organizer reserves the right to accept or reject any application, disqualify any Applicant for breach of T&Cs, change or modify these T&Cs at any time, modify categories, prizes, stages, schedule, format, venue, or cancel/postpone the Event. All decisions are final, conclusive, and binding.</p>
      </div>

      <div style={sectionStyle}>
        <h3 style={headingStyle}>10. Media, Photography, and Intellectual Property</h3>
        <p style={paraStyle}>By registering, the Applicant grants DPM Entertainment a perpetual, royalty-free, worldwide, non-exclusive license to use their name, photograph, video footage, interview content, and application details for promoting the Event and marketing DPM Entertainment.</p>
        <p style={paraStyle}>All content, branding, and intellectual property of the Event remain the sole property of DPM Entertainment.</p>
      </div>

      <div style={sectionStyle}>
        <h3 style={headingStyle}>11. Health, Safety, and Liability</h3>
        <p style={paraStyle}>The Applicant participates in all stages entirely at their own risk. The Organizer shall not be liable for any loss of property, personal injury, accident, illness, or any other harm suffered during or arising from participation. The Organizer's total liability shall not exceed the registration fee paid (&#8377;999).</p>
      </div>

      <div style={sectionStyle}>
        <h3 style={headingStyle}>12. Confidentiality</h3>
        <p style={paraStyle}>The Applicant agrees to keep confidential any non-public information shared by the Organizer including event planning details, internal communications, judging criteria, shortlisting processes, and business strategies.</p>
      </div>

      <div style={sectionStyle}>
        <h3 style={headingStyle}>13. Privacy and Data Collection</h3>
        <p style={paraStyle}>By registering, the Applicant consents to DPM Entertainment collecting, storing, and processing their personal data for registration, communication, verification, and promotional purposes. The Organizer shall handle data in accordance with applicable Indian data protection laws including the Digital Personal Data Protection Act, 2023.</p>
      </div>

      <div style={sectionStyle}>
        <h3 style={headingStyle}>14. Minor Participants — Miss Teen Category</h3>
        <p style={paraStyle}>Applicants in the Miss Teen India category must be between 12 and 18 years of age. Registration must be completed by the parent or legal guardian on behalf of the minor who must agree to these T&Cs and accompany the minor for physical event stages.</p>
      </div>

      <div style={sectionStyle}>
        <h3 style={headingStyle}>15. Modification of Terms</h3>
        <p style={paraStyle}>DPM Entertainment reserves the right to modify, update, or amend these T&Cs at any time. Changes take effect immediately upon publication on the official website.</p>
      </div>

      <div style={sectionStyle}>
        <h3 style={headingStyle}>16. Governing Law and Jurisdiction</h3>
        <p style={paraStyle}>These Terms shall be governed by the laws of India. In the event of any dispute, the <strong style={bold}>courts of Allahabad, Uttar Pradesh, India</strong> shall have exclusive jurisdiction.</p>
      </div>

      <div style={sectionStyle}>
        <h3 style={headingStyle}>17. Contact Information</h3>
        <p style={paraStyle}>DPM Entertainment<br />Email: <a href="mailto:dpmentertainment@gmail.com" style={goldText}>dpmentertainment@gmail.com</a></p>
      </div>

      <div style={sectionStyle}>
        <h3 style={headingStyle}>18. Severability</h3>
        <p style={paraStyle}>If any provision is found invalid or unenforceable, it shall be modified to the minimum extent necessary, and the remaining provisions shall continue in full force and effect.</p>
      </div>

      <div style={{ marginBottom: 0 }}>
        <h3 style={headingStyle}>19. Entire Agreement</h3>
        <p style={paraStyle}>These Terms and Conditions, together with the Rules and Regulations and Privacy Policy, constitute the entire agreement between DPM Entertainment and the Applicant with respect to participation in the Event.</p>
        <p style={{ ...paraStyle, ...bold, marginTop: 20, fontStyle: "italic" }}>By clicking "I agree to all the Terms and Conditions of the Contest" and proceeding to payment, the Applicant confirms that they have read, understood, and unconditionally agreed to these Terms and Conditions.</p>
      </div>
    </div>
  );
}
