import { Resend } from 'resend';
import { FROM_ADDRESS, SUBJECT, buildHtml, buildText } from '../lib/newsletter-email.js';
import { addContact } from '../lib/resend-audiences.js';

const resend = new Resend(process.env.RESEND_API_KEY);

const isValidEmail = (email) =>
  typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

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

  const { email } = req.body || {};

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: email.trim(),
      subject: SUBJECT,
      html: buildHtml(),
      text: buildText(),
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(502).json({ error: 'Could not send confirmation email.' });
    }

    await addContact(resend, { email: email.trim(), source: 'newsletter' });

    // Also add the subscriber to the CRM (AlignoCRM → Pentridge Media),
    // tagged source:newsletter. Best-effort — never fail the signup over it.
    try {
      const crmUrl =
        process.env.CRM_CONTACT_URL ||
        'https://uvf4r7ds.function2.insforge.app/crm-contact';
      const crmRes = await fetch(crmUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source: 'newsletter' }),
      });
      if (!crmRes.ok) {
        console.warn('CRM contact add failed:', crmRes.status, await crmRes.text());
      }
    } catch (crmErr) {
      console.warn('CRM contact add threw:', crmErr);
    }

    return res.status(200).json({ ok: true, id: data?.id });
  } catch (err) {
    console.error('Newsletter handler error:', err);
    return res.status(500).json({ error: 'Unexpected error.' });
  }
}
