import { Resend } from 'resend';
import { FROM_ADDRESS, SUBJECT, buildHtml, buildText } from '../lib/roi-report-email.js';
import { addContact } from '../lib/resend-audiences.js';

const resend = new Resend(process.env.RESEND_API_KEY);

const isValidEmail = (email) =>
  typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const isValidResults = (r) =>
  r && typeof r === 'object' && r.annualSavings != null && r.hoursSaved != null;

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

  const {
    email,
    workflowType,
    companySize,
    currentHours,
    hourlyRate,
    automationPotential,
    results,
  } = req.body || {};

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }

  if (!isValidResults(results)) {
    return res.status(400).json({ error: 'ROI results are required.' });
  }

  const payload = {
    email: email.trim(),
    workflowType,
    companySize,
    currentHours,
    hourlyRate,
    automationPotential,
    results,
  };

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: email.trim(),
      subject: SUBJECT,
      html: buildHtml(payload),
      text: buildText(payload),
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(502).json({ error: 'Could not send the ROI report.' });
    }

    await addContact(resend, { email: email.trim(), source: 'roi' });

    return res.status(200).json({ ok: true, id: data?.id });
  } catch (err) {
    console.error('ROI report handler error:', err);
    return res.status(500).json({ error: 'Unexpected error.' });
  }
}
