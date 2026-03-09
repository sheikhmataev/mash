import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const contactFromEmail = process.env.CONTACT_FROM_EMAIL;
const contactToEmail = process.env.CONTACT_TO_EMAIL;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

function toSafeString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(req: Request) {
  try {
    const recipients = (contactToEmail || '')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    if (!resend || !contactFromEmail || recipients.length === 0) {
      return NextResponse.json(
        { error: 'Missing email configuration on server.' },
        { status: 500 },
      );
    }

    const body = (await req.json()) as Record<string, unknown>;
    const name = toSafeString(body.name);
    const email = toSafeString(body.email);
    const company = toSafeString(body.company);
    const vision = toSafeString(body.vision);
    const consent = body.consent === true;

    if (!name || !email || !vision || !consent) {
      return NextResponse.json(
        { error: 'Please fill in required fields and consent.' },
        { status: 400 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: contactFromEmail,
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

    if (error) {
      return NextResponse.json(
        { error: 'Email provider rejected the message. Please try again.' },
        { status: 502 },
      );
    }

    // Best-effort customer confirmation email.
    // If this fails, we still keep the successful internal delivery.
    await resend.emails.send({
      from: contactFromEmail,
      to: email,
      subject: 'We received your message',
      text: [
        `Hi ${name},`,
        '',
        'Thanks for contacting Mash Partners.',
        'We received your message and will get back to you shortly.',
        '',
        'Your submission:',
        `- Name: ${name}`,
        `- Email: ${email}`,
        `- Company: ${company || '-'}`,
        `- Message: ${vision}`,
        '',
        'Best regards,',
        'Mash Partners',
      ].join('\n'),
    });

    return NextResponse.json({ ok: true, messageId: data?.id ?? null });
  } catch {
    return NextResponse.json(
      { error: 'Unable to send message right now. Please try again.' },
      { status: 500 },
    );
  }
}
