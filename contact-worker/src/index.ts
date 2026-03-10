export interface Env {
  RESEND_API_KEY: string;
  CONTACT_FROM_EMAIL: string;
  CONTACT_TO_EMAIL: string;
  ALLOWED_ORIGIN?: string;
}

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  vision?: unknown;
  consent?: unknown;
};

function toSafeString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function jsonResponse(body: unknown, status = 200, origin = '*') {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST,OPTIONS',
    },
  });
}

async function sendResendEmail(
  env: Env,
  payload: {
    to: string | string[];
    subject: string;
    text: string;
    replyTo?: string;
  },
) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: payload.to,
      subject: payload.subject,
      text: payload.text,
      reply_to: payload.replyTo,
    }),
  });

  const data = (await response.json().catch(() => null)) as
    | { id?: string; message?: string }
    | null;

  if (!response.ok) {
    return {
      ok: false,
      error: data?.message || `Resend failed with status ${response.status}`,
      id: null,
    };
  }

  return { ok: true, error: null, id: data?.id ?? null };
}

export default {
  async fetch(request: Request, env: Env) {
    const allowedOrigin = env.ALLOWED_ORIGIN || '*';
    const requestOrigin = request.headers.get('Origin') || '';
    const origin =
      allowedOrigin === '*' || requestOrigin === allowedOrigin
        ? requestOrigin || allowedOrigin
        : allowedOrigin;

    if (request.method === 'OPTIONS') {
      return jsonResponse({ ok: true }, 204, origin);
    }

    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405, origin);
    }

    if (!env.RESEND_API_KEY || !env.CONTACT_FROM_EMAIL || !env.CONTACT_TO_EMAIL) {
      return jsonResponse({ error: 'Worker email env vars are missing.' }, 500, origin);
    }

    try {
      const body = (await request.json()) as ContactPayload;
      const name = toSafeString(body.name);
      const email = toSafeString(body.email);
      const company = toSafeString(body.company);
      const vision = toSafeString(body.vision);
      const consent = body.consent === true;

      if (!name || !email || !vision || !consent) {
        return jsonResponse(
          { error: 'Please fill in required fields and consent.' },
          400,
          origin,
        );
      }

      const recipients = env.CONTACT_TO_EMAIL.split(',')
        .map((item) => item.trim())
        .filter(Boolean);

      const internalSend = await sendResendEmail(env, {
        to: recipients,
        replyTo: email,
        subject: `New website inquiry from ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Company: ${company || '-'}`,
          '',
          'Vision:',
          vision,
        ].join('\n'),
      });

      if (!internalSend.ok) {
        return jsonResponse(
          { error: internalSend.error || 'Internal notification failed.' },
          502,
          origin,
        );
      }

      const confirmationSend = await sendResendEmail(env, {
        to: email,
        subject: 'We received your message',
        text: [
          `Hi ${name},`,
          '',
          'Thanks for contacting Mash Partners.',
          'We received your message and will get back to you shortly.',
          '',
          'Best regards,',
          'Mash Partners',
        ].join('\n'),
      });

      return jsonResponse(
        {
          ok: true,
          internalMessageId: internalSend.id,
          confirmationMessageId: confirmationSend.id,
          confirmationAccepted: confirmationSend.ok,
          confirmationError: confirmationSend.error,
        },
        200,
        origin,
      );
    } catch {
      return jsonResponse(
        { error: 'Could not process contact form request.' },
        500,
        origin,
      );
    }
  },
};
