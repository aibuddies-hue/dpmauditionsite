import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { buildUserData, sendCapiEvent } from '@/lib/metaCapi';

export async function POST(request) {
  try {
    const data = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      name,
      email,
      phone,
      utm_source = '',
      utm_medium = '',
      utm_campaign = '',
      utm_term = '',
      utm_content = '',
      utm_id = '',
      placement = '',
      site_source = '',
      fbclid = '',
      gclid = '',
      ref = ''
    } = data;

    // Verify signature
    const keySecret = process.env.RAZORPAY_KEY_SECRET || 'rUSIZ4cEZ7vWx5y2dDCr3J5j';
    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      console.error("Razorpay signature verification failed");
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    const now = new Date().toISOString();
    const appId = 'APP_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);

    const n8nSuccessUrl = "https://n8n.srv1562813.hstgr.cloud/webhook/razorpay-payment-success";
    const payloads = [];

    payloads.push(
      fetch(n8nSuccessUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          whatsapp_number: phone,
          full_name: name,
          razorpay_payment_id,
          razorpay_order_id,
          amount: 999,
          utm_source,
          utm_medium,
          utm_campaign,
          utm_term,
          utm_content,
          placement,
          site_source,
          fbclid,
          gclid,
          timestamp: now
        })
      }).catch(err => console.error("n8n payment success webhook error:", err))
    );

    // Trigger Meta Conversions API (CAPI) Purchase Event
    // Get client IP and User Agent from request headers
    const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';
    const clientUa = request.headers.get('user-agent') || '';
    const baseUrl = process.env.BASE_URL || '';

    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const userData = buildUserData({
      email,
      phone,
      first_name: firstName,
      last_name: lastName,
      client_ip: clientIp.split(',')[0].trim(),
      client_ua: clientUa,
      fbc: fbclid ? `fb.1.${Date.now()}.${fbclid}` : '',
      fbp: '', // will be populated from cookie on client side if needed
    });

    payloads.push(
      sendCapiEvent({
        eventName: 'Purchase',
        eventId: razorpay_payment_id,
        eventSourceUrl: baseUrl,
        userData,
        customData: { value: 999, currency: 'INR' }
      })
    );

    // Ensure all endpoints are notified before responding to user
    await Promise.allSettled(payloads);

    return NextResponse.json({
      id: appId,
      name,
      email,
      phone,
      status: "paid",
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      created_at: now
    });
  } catch (error) {
    console.error("Verify payment API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
