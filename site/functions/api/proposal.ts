/**
 * POST /api/proposal — the free-proposal form.
 *
 * Flow (development plan, section 8): form → Pages Function → Turnstile
 * check → D1 (backup) → email alert to the owner → auto-reply to the lead.
 * The CRM step (decision D-10, HubSpot free tier or another provider) is
 * not wired yet — the owner has not picked one. Until then D1 is the store
 * of record and the owner is emailed.
 *
 * Environment (set in the Cloudflare dashboard, never in the repo):
 *   DB                     D1 binding (wrangler.toml) — required
 *   TURNSTILE_SECRET_KEY   Turnstile secret key. When unset, verification
 *                          is skipped and a warning is logged (local dev
 *                          only — production must set it).
 *   RESEND_API_KEY         Resend API key. When unset, no email is sent.
 *   RESEND_FROM_EMAIL      Verified sender address for Resend.
 *   LEAD_NOTIFICATION_EMAIL  Owner address that receives new leads.
 */
import type { D1Database } from '@cloudflare/workers-types';

interface Env {
  DB: D1Database;
  TURNSTILE_SECRET_KEY?: string;
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  LEAD_NOTIFICATION_EMAIL?: string;
}

const SERVICES = ['SEO', 'AI search', 'PPC', 'Social media', 'Web design', 'Content', 'eCommerce', 'Not sure yet'];
const MARKETS = ['United States', 'United Kingdom', 'Australia', 'Canada', 'UAE', 'Singapore', 'Several markets'];
const BUDGETS = ['Under $2k', '$2k–5k', '$5k–10k', '$10k–25k', '$25k+'];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function isNonEmptyString(value: unknown, max = 200): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= max;
}

async function verifyTurnstile(secret: string, token: string, ip: string | null): Promise<boolean> {
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);
  let res: Response;
  try {
    res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: form,
    });
  } catch (error) {
    // Fail closed: if the verification service cannot be reached, the
    // submission is rejected instead of crashing the function.
    console.error('Turnstile verification request failed:', error);
    return false;
  }
  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

async function sendEmail(
  apiKey: string,
  from: string,
  to: string,
  subject: string,
  text: string,
): Promise<boolean> {
  let res: Response;
  try {
    res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, subject, text }),
    });
  } catch (error) {
    console.error('Resend request failed:', error);
    return false;
  }
  return res.ok;
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
  waitUntil: (promise: Promise<unknown>) => void;
}): Promise<Response> {
  const { request, env } = context;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json(400, { ok: false, error: 'Request body must be JSON.' });
  }
  if (!body || typeof body !== 'object') {
    return json(400, { ok: false, error: 'Request body must be JSON.' });
  }
  const data = body as Record<string, unknown>;

  // Validate — only the values the form offers are accepted.
  const services = Array.isArray(data.services) ? data.services : [];
  if (
    services.length === 0 ||
    services.length > SERVICES.length ||
    services.some((s) => typeof s !== 'string' || !SERVICES.includes(s))
  ) {
    return json(400, { ok: false, error: 'Pick at least one service.' });
  }
  const market = data.market;
  if (!isNonEmptyString(market) || !MARKETS.includes(market)) {
    return json(400, { ok: false, error: 'Pick a market.' });
  }
  const budget = data.budget;
  if (budget !== '' && budget !== undefined && (!isNonEmptyString(budget) || !BUDGETS.includes(budget))) {
    return json(400, { ok: false, error: 'Pick a budget.' });
  }
  const name = data.name;
  if (!isNonEmptyString(name, 100)) {
    return json(400, { ok: false, error: 'Enter your name.' });
  }
  const email = data.email;
  if (!isNonEmptyString(email, 254) || !EMAIL_RE.test(email)) {
    return json(400, { ok: false, error: 'Enter a valid work email.' });
  }
  const website = data.website;
  if (website !== '' && website !== undefined) {
    if (!isNonEmptyString(website, 200)) {
      return json(400, { ok: false, error: 'Enter a valid website.' });
    }
    try {
      const url = new URL(website);
      if (url.protocol !== 'https:' && url.protocol !== 'http:') {
        return json(400, { ok: false, error: 'Enter a valid website.' });
      }
    } catch {
      return json(400, { ok: false, error: 'Enter a valid website.' });
    }
  }
  const source = isNonEmptyString(data.source, 200) ? data.source : '/';

  // Turnstile — skipped only when no secret key is configured (local dev).
  if (env.TURNSTILE_SECRET_KEY) {
    const token = data.turnstileToken;
    if (!isNonEmptyString(token, 1000)) {
      return json(400, { ok: false, error: 'Spam check failed. Please try again.' });
    }
    const ip = request.headers.get('cf-connecting-ip');
    const ok = await verifyTurnstile(env.TURNSTILE_SECRET_KEY, token, ip);
    if (!ok) {
      return json(400, { ok: false, error: 'Spam check failed. Please try again.' });
    }
  } else {
    console.warn('TURNSTILE_SECRET_KEY is not set — Turnstile verification skipped (dev only).');
  }

  if (!env.DB) {
    console.error('D1 binding DB is not configured.');
    return json(503, { ok: false, error: 'Lead storage is not configured yet. Please try again later.' });
  }

  const createdAt = new Date().toISOString();
  try {
    await env.DB.prepare(
      'INSERT INTO leads (created_at, name, email, website, services, market, budget, source) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    )
      .bind(
        createdAt,
        name.trim(),
        email.trim().toLowerCase(),
        typeof website === 'string' ? website.trim() : '',
        JSON.stringify(services),
        market,
        typeof budget === 'string' ? budget : '',
        source,
      )
      .run();
  } catch (error) {
    console.error('Failed to store lead in D1:', error);
    return json(503, { ok: false, error: 'Could not save your request. Please try again later.' });
  }

  // Email — skipped when Resend is not configured; the D1 row is the record.
  if (env.RESEND_API_KEY && env.RESEND_FROM_EMAIL && env.LEAD_NOTIFICATION_EMAIL) {
    const detail = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Website: ${typeof website === 'string' ? website : ''}`,
      `Services: ${services.join(', ')}`,
      `Market: ${market}`,
      `Budget: ${typeof budget === 'string' ? budget : ''}`,
      `Page: ${source}`,
      `Received: ${createdAt}`,
    ].join('\n');
    context.waitUntil(
      (async () => {
        const sent = await sendEmail(
          env.RESEND_API_KEY as string,
          env.RESEND_FROM_EMAIL as string,
          env.LEAD_NOTIFICATION_EMAIL as string,
          `New proposal request — ${name} (${market})`,
          `A new free-proposal request came in from dazzlit.com:\n\n${detail}`,
        );
        if (!sent) console.error('Failed to send lead notification email.');
        const replied = await sendEmail(
          env.RESEND_API_KEY as string,
          env.RESEND_FROM_EMAIL as string,
          email,
          'Thanks — your Dazzlit proposal request is in',
          `Hi ${name},\n\nThanks for asking Dazzlit for a free proposal. We have your request and will be in touch soon.\n\nYour request:\n${detail}\n\nDazzlit — Ideas that travel. Brands that grow.`,
        );
        if (!replied) console.error('Failed to send lead auto-reply.');
      })(),
    );
  } else {
    console.warn('Resend is not configured — lead stored in D1 only, no email sent.');
  }

  return json(200, { ok: true });
}
