import { Resend } from 'resend';
import { FROM_ADDRESS, SUBJECT, buildHtml, buildText } from '../lib/newsletter-email.js';
import { addContact } from '../lib/resend-audiences.js';
import { submitManorContact } from '../lib/manor-lead.js';

const resend = new Resend(process.env.RESEND_API_KEY);

const FRIENDLY_ERROR = 'Something went wrong submitting the form. Please try again.';

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

  const { email, phone } = req.body || {};
  const trimmedEmail = typeof email === 'string' ? email.trim() : '';
  const trimmedPhone = typeof phone === 'string' ? phone.trim() : '';

  if (!isValidEmail(trimmedEmail)) {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }

  try {
    await submitManorContact({ email: trimmedEmail, phone: trimmedPhone });
  } catch (err) {
    console.error('Manor contact intake failed:', err.status || 'request error');
    return res.status(502).json({ error: FRIENDLY_ERROR });
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
    } else {
      await addContact(resend, { email: trimmedEmail, source: 'newsletter' });
    }

    return res.status(200).json({ ok: true, id: data?.id });
  } catch (err) {
    console.error('Newsletter handler error:', err);
    // Contact already landed in Manor; do not fail the form over email.
    return res.status(200).json({ ok: true });
  }
}
