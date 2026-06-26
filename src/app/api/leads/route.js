import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    const now = new Date().toISOString();
    const leadId = crypto.randomUUID();

    const sheetWebhook = process.env.GOOGLE_SHEET_WEBHOOK;
    const n8nRegUrl = "https://n8n.srv1562813.hstgr.cloud/webhook/registration-form-submit";

    const payloads = [];

    if (sheetWebhook) {
      payloads.push(
        fetch(sheetWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: "lead",
            name: data.name,
            email: data.email,
            phone: data.phone,
            status: "lead",
            date: now
          })
        }).catch(err => console.error("Sheet webhook error:", err))
      );
    }

    payloads.push(
      fetch(n8nRegUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: data.name,
          whatsapp_number: data.phone,
          email: data.email,
          source: data.utm_source || "organic",
          utm_source: data.utm_source,
          utm_medium: data.utm_medium,
          utm_campaign: data.utm_campaign,
          utm_term: data.utm_term,
          utm_content: data.utm_content,
          utm_id: data.utm_id,
          placement: data.placement,
          site_source: data.site_source,
          fbclid: data.fbclid,
          gclid: data.gclid,
          ref: data.ref,
          timestamp: now,
        })
      }).catch(err => console.error("n8n registration webhook error:", err))
    );

    await Promise.allSettled(payloads);

    return NextResponse.json({ status: "success", id: leadId });
  } catch (error) {
    console.error("Leads API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
