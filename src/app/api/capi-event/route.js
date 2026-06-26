import { NextResponse } from 'next/server';
import { buildUserData, sendCapiEvent } from '@/lib/metaCapi';

export async function POST(request) {
  try {
    const data = await request.json();
    const {
      event_name,
      event_id,
      event_source_url = '',
      email = '',
      phone = '',
      first_name = '',
      last_name = '',
      city = '',
      state = '',
      zip_code = '',
      external_id = '',
      fbc = '',
      fbp = '',
      value = 0,
      currency = 'INR'
    } = data;

    const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';
    const clientUa = request.headers.get('user-agent') || '';

    const userData = buildUserData({
      email,
      phone,
      first_name,
      last_name,
      city,
      state,
      zip_code,
      external_id,
      client_ip: clientIp.split(',')[0].trim(),
      client_ua: clientUa,
      fbc,
      fbp,
    });

    const customData = value ? { value, currency } : null;

    await sendCapiEvent({
      eventName: event_name,
      eventId: event_id,
      eventSourceUrl: event_source_url,
      userData,
      customData
    });

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("CAPI Event API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
