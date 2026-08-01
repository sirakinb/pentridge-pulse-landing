import { Resend } from 'resend';
import { FROM_ADDRESS, SUBJECT, buildHtml, buildText } from '../lib/waitlist-email.js';
import { addContact } from '../lib/resend-audiences.js';

const resend = new Resend(process.env.RESEND_API_KEY);

const isValidEmail = (email) =>
  typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const str = (value) =>
  typeof value === 'string' && value.trim() ? value.trim() : null;

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name, phone } = req.body || {};
  const trimmedEmail = typeof email === 'string' ? email.trim() : '';
  const trimmedName = str(name);
  const trimmedPhone = str(phone);

  if (!isValidEmail(trimmedEmail)) {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: trimmedEmail,
      subject: SUBJECT,
      html: buildHtml(),
      text: buildText(),
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(502).json({ error: 'Could not send confirmation email.' });
    }

    // Fire-and-forget contact add; email already sent successfully.
    await addContact(resend, { email: trimmedEmail, source: 'waitlist' });

    // Also add the lead to AlignoCRM (Pentridge Media), tagged source:labs-waitlist.
    // Best-effort — never fail the signup over it.
    try {
      const crmUrl =
        process.env.CRM_CONTACT_URL ||
        'https://uvf4r7ds.function2.insforge.app/crm-contact';
      const crmRes = await fetch(crmUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmedEmail,
          name: trimmedName || undefined,
          phone: trimmedPhone || undefined,
          source: 'labs-waitlist',
          notes: trimmedPhone ? `Phone: ${trimmedPhone}` : undefined,
        }),
      });
      if (!crmRes.ok) {
        console.warn('CRM contact add failed:', crmRes.status, await crmRes.text());
      }
    } catch (crmErr) {
      console.warn('CRM contact add threw:', crmErr);
    }

    return res.status(200).json({ ok: true, id: data?.id });
  } catch (err) {
    console.error('Waitlist handler error:', err);
    return res.status(500).json({ error: 'Unexpected error.' });
  }
}
