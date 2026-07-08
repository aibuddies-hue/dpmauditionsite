import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    const {
      application_id = '',
      contact_email = '',
      contact_phone = '',
      first_name = '',
      last_name = '',
      dob = '',
      age = '',
      marital_status = '',
      category = '',
      alt_phone = '',
      address1 = '',
      address2 = '',
      city = '',
      state = '',
      postal_code = '',
      qualification = '',
      professional_detail = '',
      instagram_url = '',
      facebook_url = '',
      height = '',
      weight = '',
      hair_color = '',
      skin_tone = '',
      eye_color = '',
      body_shape = '',
      waist = '',
      hip = '',
      chest = '',
      qa_why_model = '',
      qa_strengths = '',
      qa_role_model = '',
      qa_adventure = '',
      qa_if_win = '',
      photo1 = '',
      photo2 = ''
    } = data;

    const now = new Date().toISOString();

    // Extract raw base64 (strip data URL prefix if present)
    const stripDataUrl = (input) => {
      if (!input) return '';
      const matches = input.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
      return matches ? matches[2] : input;
    };

    const photo1_base64 = stripDataUrl(photo1);
    const photo2_base64 = stripDataUrl(photo2);

    const n8nProfileUrl = "https://n8n.srv1562813.hstgr.cloud/webhook/auditions-profile-submit";

    try {
      await fetch(n8nProfileUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          application_id,
          contact_email,
          email: contact_email,
          contact_phone,
          whatsapp_number: contact_phone,
          first_name,
          last_name,
          dob,
          age,
          category,
          payment_verified: "Yes",
          marital_status,
          alt_phone,
          address1,
          address_line1: address1,
          address2,
          address_line2: address2,
          city,
          state,
          postal_code,
          qualification,
          professional_detail,
          instagram_url,
          facebook_url,
          height,
          weight,
          hair_color,
          skin_tone,
          eye_color,
          body_shape,
          waist,
          hip,
          chest,
          qa_why_model,
          qa_strengths,
          qa_role_model,
          qa_adventure,
          qa_if_win,
          photo1_base64,
          photo2_base64,
          timestamp: now
        })
      });
    } catch (err) {
      console.error("n8n profile webhook error:", err);
    }

    return NextResponse.json({
      status: "success",
      message: "Profile submitted successfully"
    });
  } catch (error) {
    console.error("Profile submission API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
