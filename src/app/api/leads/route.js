import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    const now = new Date().toISOString();
    const leadId = 'LEAD_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);

    const sheetWebhook = process.env.GOOGLE_SHEET_WEBHOOK;
    const n8nRegUrl = "https://n8n.srv1562813.hstgr.cloud/webhook/registration-form-submit";

    const payloads = [];

    let sheetResponse = null;

    if (sheetWebhook) {
      try {
        const sheetRes = await fetch(sheetWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          redirect: 'follow',
          body: JSON.stringify({
            lead_id: leadId,
            full_name: data.name,
            email: data.email,
            whatsapp_number: data.phone,
            utm_source: data.utm_source || "",
            utm_medium: data.utm_medium || "",
            utm_campaign: data.utm_campaign || "",
            utm_term: data.utm_term || "",
            utm_content: data.utm_content || "",
            utm_id: data.utm_id || "",
            placement: data.placement || "",
            site_source: data.site_source || "",
            fbclid: data.fbclid || "",
            gclid: data.gclid || "",
            ref: data.ref || "auditions.dpmentertainment.com",
            utm_link: data.utm_link || "",
            payment_status: "Pending",
            follow_up_stage: "Initiated",
            timestamp: now
          })
        });
        const resText = await sheetRes.text();
        console.log("Google Sheets response:", resText);
        try {
          sheetResponse = JSON.parse(resText);
        } catch (e) {
          sheetResponse = resText;
        }
      } catch (err) {
        console.error("Sheet webhook error:", err);
        sheetResponse = { error: err.toString() };
      }
    }

    try {
      await fetch(n8nRegUrl, {
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
      });
    } catch (err) {
      console.error("n8n registration webhook error:", err);
    }

    return NextResponse.json({ status: "success", id: leadId, webhook_configured: !!sheetWebhook, sheet_response: sheetResponse });
  } catch (error) {
    console.error("Leads API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
