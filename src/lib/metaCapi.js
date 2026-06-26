import crypto from 'crypto';

export function hashField(value) {
  if (!value) return '';
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

export function hashPhone(phone) {
  if (!phone) return '';
  let digits = phone.replace(/\D/g, ''); // keep only digits
  if (digits.startsWith('0')) {
    digits = '91' + digits.substring(1);
  }
  if (digits.length === 10) {
    digits = '91' + digits;
  }
  return crypto.createHash('sha256').update(digits).digest('hex');
}

export function buildUserData({
  email = '',
  phone = '',
  first_name = '',
  last_name = '',
  city = '',
  state = '',
  zip_code = '',
  country = 'in',
  external_id = '',
  client_ip = '',
  client_ua = '',
  fbc = '',
  fbp = '',
}) {
  const ud = {};
  if (email) ud.em = [hashField(email)];
  if (phone) ud.ph = [hashPhone(phone)];
  if (first_name) ud.fn = [hashField(first_name)];
  if (last_name) ud.ln = [hashField(last_name)];
  if (city) ud.ct = [hashField(city)];
  if (state) ud.st = [hashField(state)];
  if (zip_code) ud.zp = [hashField(zip_code)];
  if (country) ud.country = [hashField(country)];
  if (external_id) ud.external_id = [hashField(external_id)];
  if (client_ip) ud.client_ip_address = client_ip;
  if (client_ua) ud.client_user_agent = client_ua;
  if (fbc) ud.fbc = fbc;
  if (fbp) ud.fbp = fbp;
  return ud;
}

export async function sendCapiEvent({
  eventName,
  eventId,
  eventSourceUrl,
  userData,
  customData = null,
}) {
  const pixelId = process.env.META_PIXEL_ID || '2113906252798180';
  const accessToken = process.env.META_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    console.warn("CAPI: Missing META_PIXEL_ID or META_ACCESS_TOKEN, skipping CAPI dispatch.");
    return;
  }

  const endpoint = `https://graph.facebook.com/v21.0/${pixelId}/events`;
  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: eventSourceUrl,
        action_source: "website",
        user_data: userData,
        ...(customData ? { custom_data: customData } : {})
      }
    ],
    access_token: accessToken,
  };

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      console.log(`CAPI ${eventName} sent successfully (event_id=${eventId})`);
    } else {
      const text = await res.text();
      console.error(`CAPI ${eventName} failed to send: ${res.status} ${text}`);
    }
  } catch (err) {
    console.error(`CAPI error dispatching ${eventName}:`, err);
  }
}
