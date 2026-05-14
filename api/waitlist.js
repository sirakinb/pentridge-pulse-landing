import { Resend } from 'resend';
import { FROM_ADDRESS, SUBJECT, buildHtml, buildText } from '../lib/waitlist-email.js';

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

    return res.status(200).json({ ok: true, id: data?.id });
  } catch (err) {
    console.error('Waitlist handler error:', err);
    return res.status(500).json({ error: 'Unexpected error.' });
  }
}
