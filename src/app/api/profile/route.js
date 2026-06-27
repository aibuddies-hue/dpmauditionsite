import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

function saveBase64Image(dataUrl, folder) {
  if (!dataUrl) return null;
  const matches = dataUrl.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    // If it is not a data URL but a raw base64 string
    const filename = `${crypto.randomUUID()}.jpg`;
    const filepath = path.join(folder, filename);
    fs.writeFileSync(filepath, Buffer.from(dataUrl, 'base64'));
    return { filename, base64: dataUrl };
  }

  const mimeType = matches[1];
  const base64Data = matches[2];
  let ext = mimeType.split('/')[1] || 'jpg';
  if (ext === 'jpeg') ext = 'jpg';
  const filename = `${crypto.randomUUID()}.${ext}`;
  const filepath = path.join(folder, filename);

  fs.writeFileSync(filepath, Buffer.from(base64Data, 'base64'));
  return { filename, base64: base64Data };
}

function parseBase64(dataUrl) {
  if (!dataUrl) return { base64: '', mime: '' };
  const matches = dataUrl.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    return { base64: dataUrl, mime: 'image/jpeg' };
  }
  return { base64: matches[2], mime: matches[1] };
}

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
    const baseUrl = process.env.BASE_URL || '';

    // Create upload directory
    const uploadDir = path.join(process.cwd(), 'public', 'api', 'uploads');
    fs.mkdirSync(uploadDir, { recursive: true });

    // Save photos
    const p1Result = saveBase64Image(photo1, uploadDir);
    const p2Result = saveBase64Image(photo2, uploadDir);

    const photo1_name = p1Result ? p1Result.filename : '';
    const photo1_b64 = p1Result ? p1Result.base64 : '';
    const photo1_url = photo1_name ? `${baseUrl}/api/uploads/${photo1_name}` : '';

    const photo2_name = p2Result ? p2Result.filename : '';
    const photo2_b64 = p2Result ? p2Result.base64 : '';
    const photo2_url = photo2_name ? `${baseUrl}/api/uploads/${photo2_name}` : '';

    const sheetWebhook = process.env.GOOGLE_SHEET_WEBHOOK;
    const n8nProfileUrl = "https://n8n.srv1562813.hstgr.cloud/webhook/profile-form-submit";

    const payloads = [];

    if (sheetWebhook) {
      const p1Parsed = parseBase64(photo1);
      const p2Parsed = parseBase64(photo2);

      payloads.push(
        fetch(sheetWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sheet_name: "Profiles",
            application_id,
            first_name,
            last_name,
            full_name: `${first_name} ${last_name}`.trim(),
            email: contact_email,
            whatsapp_number: contact_phone,
            dob,
            age,
            category,
            marital_status,
            alt_phone,
            address1,
            address2,
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
            photo1_base64: p1Parsed.base64,
            photo1_mime: p1Parsed.mime,
            photo2_base64: p2Parsed.base64,
            photo2_mime: p2Parsed.mime
          })
        }).catch(err => console.error("Sheet profile webhook error:", err))
      );
    }

    payloads.push(
      fetch(n8nProfileUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: contact_email,
          whatsapp_number: contact_phone,
          first_name,
          last_name,
          dob,
          age,
          category,
          payment_verified: "Yes",
          marital_status,
          alt_phone,
          address_line1: address1,
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
          photo1_url,
          photo2_url,
          photo1_filename: photo1_name,
          photo2_filename: photo2_name,
          photo1_base64: photo1_b64,
          photo2_base64: photo2_b64,
          timestamp: now
        })
      }).catch(err => console.error("n8n profile webhook error:", err))
    );

    await Promise.allSettled(payloads);

    return NextResponse.json({
      status: "success",
      message: "Profile submitted successfully"
    });
  } catch (error) {
    console.error("Profile submission API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
