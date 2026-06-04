"""
Meta Conversions API (CAPI) — Server-Side Event Tracking
Sends events directly to Meta servers, bypassing browser ad-blockers and ITP.
Deduplicates with browser pixel via shared event_id.
"""
import hashlib
import httpx
import os
import time
import logging
import asyncio

logger = logging.getLogger(__name__)

PIXEL_ID = ""
ACCESS_TOKEN = ""
API_VERSION = "v21.0"

def _get_config():
    global PIXEL_ID, ACCESS_TOKEN
    if not PIXEL_ID:
        PIXEL_ID = os.environ.get("META_PIXEL_ID", "")
    if not ACCESS_TOKEN:
        ACCESS_TOKEN = os.environ.get("META_ACCESS_TOKEN", "")
    return PIXEL_ID, ACCESS_TOKEN


def hash_field(value: str) -> str:
    """SHA-256 hash after lowercase + trim. Meta requirement."""
    if not value:
        return ""
    return hashlib.sha256(value.strip().lower().encode("utf-8")).hexdigest()


def hash_phone(phone: str) -> str:
    """Normalize to E.164 (digits only, no +) then hash."""
    if not phone:
        return ""
    digits = "".join(c for c in phone if c.isdigit())
    if digits.startswith("0"):
        digits = "91" + digits[1:]
    if len(digits) == 10:
        digits = "91" + digits
    return hashlib.sha256(digits.encode("utf-8")).hexdigest()


def build_user_data(
    email: str = "",
    phone: str = "",
    first_name: str = "",
    last_name: str = "",
    city: str = "",
    state: str = "",
    zip_code: str = "",
    country: str = "in",
    external_id: str = "",
    client_ip: str = "",
    client_ua: str = "",
    fbc: str = "",
    fbp: str = "",
) -> dict:
    """Build user_data with all EMQ-boosting fields, properly hashed."""
    ud = {}
    if email:
        ud["em"] = [hash_field(email)]
    if phone:
        ud["ph"] = [hash_phone(phone)]
    if first_name:
        ud["fn"] = [hash_field(first_name)]
    if last_name:
        ud["ln"] = [hash_field(last_name)]
    if city:
        ud["ct"] = [hash_field(city)]
    if state:
        ud["st"] = [hash_field(state)]
    if zip_code:
        ud["zp"] = [hash_field(zip_code)]
    if country:
        ud["country"] = [hash_field(country)]
    if external_id:
        ud["external_id"] = [hash_field(external_id)]
    if client_ip:
        ud["client_ip_address"] = client_ip
    if client_ua:
        ud["client_user_agent"] = client_ua
    if fbc:
        ud["fbc"] = fbc
    if fbp:
        ud["fbp"] = fbp
    return ud


async def send_capi_event(
    event_name: str,
    event_id: str,
    event_source_url: str,
    user_data: dict,
    custom_data: dict = None,
):
    """Fire-and-forget CAPI event to Meta. Never blocks caller."""
    pixel_id, access_token = _get_config()
    if not pixel_id or not access_token:
        logger.warning("CAPI: Missing PIXEL_ID or ACCESS_TOKEN, skipping")
        return

    endpoint = f"https://graph.facebook.com/{API_VERSION}/{pixel_id}/events"
    payload = {
        "data": [
            {
                "event_name": event_name,
                "event_time": int(time.time()),
                "event_id": event_id,
                "event_source_url": event_source_url,
                "action_source": "website",
                "user_data": user_data,
            }
        ],
        "access_token": access_token,
    }

    if custom_data:
        payload["data"][0]["custom_data"] = custom_data

    try:
        async with httpx.AsyncClient(timeout=10) as client:
            resp = await client.post(endpoint, json=payload)
            if resp.status_code == 200:
                logger.info(f"CAPI {event_name} sent OK (event_id={event_id[:12]}...)")
            else:
                logger.error(f"CAPI {event_name} failed: {resp.status_code} {resp.text[:200]}")
    except Exception as e:
        logger.error(f"CAPI {event_name} error: {e}")


def fire_capi(event_name, event_id, event_source_url, user_data, custom_data=None):
    """Schedule CAPI event without awaiting — true fire-and-forget."""
    asyncio.ensure_future(
        send_capi_event(event_name, event_id, event_source_url, user_data, custom_data)
    )
