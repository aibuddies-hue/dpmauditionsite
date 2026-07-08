import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    const { razorpay_order_id, name, email, phone, error_reason } = data;
    const now = new Date().toISOString();

    const n8nFailedUrl = "https://n8n.srv1562813.hstgr.cloud/webhook/auditions-payment-failed";

    await fetch(n8nFailedUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        whatsapp_number: phone,
        full_name: name,
        razorpay_order_id,
        error_reason,
        timestamp: now
      })
    }).catch(err => console.error("n8n payment failed webhook error:", err));

    return NextResponse.json({ status: "logged" });
  } catch (error) {
    console.error("Payment failed API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
