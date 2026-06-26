import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_live_SdppA5AGlfgn4i';
    const keySecret = process.env.RAZORPAY_KEY_SECRET || 'rUSIZ4cEZ7vWx5y2dDCr3J5j';

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
      },
      body: JSON.stringify({
        amount: 99900,
        currency: 'INR',
        payment_capture: 1,
        notes: {
          name: data.name,
          email: data.email,
          phone: data.phone
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Razorpay order creation failed:", errorText);
      return NextResponse.json({ error: "Failed to create payment order" }, { status: 500 });
    }

    const order = await response.json();
    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: keyId
    });
  } catch (error) {
    console.error("Create order API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
