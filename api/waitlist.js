import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS = 'Pentridge Labs <aki.b@pentridgemedia.com>';

const PRODUCTS = [
  { name: 'Voiyce', tagline: 'Write at the speed of thought', url: 'https://voiyce.us' },
  { name: 'Still', tagline: 'Meditation that meets you where you are', url: 'https://stillmeditation.app' },
  { name: 'DropCard', tagline: 'Your networking, upgraded', url: 'https://www.dropcard.app' },
];

const isValidEmail = (email) =>
  typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const buildHtml = (productList) => `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px; color: #1a1a1a;">
    <p style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: #888; margin: 0 0 16px;">Pentridge Labs</p>
    <h1 style="font-size: 28px; line-height: 1.2; margin: 0 0 16px; color: #111;">You're on the list.</h1>
    <p style="font-size: 16px; line-height: 1.6; color: #444; margin: 0 0 16px;">
      Thanks for joining the Pentridge Labs waitlist. We're excited to share more soon about a single subscription that unlocks the full suite of tools.
    </p>
    <p style="font-size: 16px; line-height: 1.6; color: #444; margin: 0 0 24px;">
      A few products are still in development. In the meantime, these are already live and ready for you to try:
    </p>
    <div style="border: 1px solid #eee; border-radius: 12px; overflow: hidden; margin: 0 0 32px;">
      ${productList
        .map(
          (p, i) => `
        <div style="padding: 20px 24px; ${i > 0 ? 'border-top: 1px solid #eee;' : ''}">
          <div style="font-size: 18px; font-weight: 600; color: #111; margin: 0 0 4px;">${p.name}</div>
          <div style="font-size: 14px; color: #666; margin: 0 0 12px;">${p.tagline}</div>
          <a href="${p.url}" style="display: inline-block; font-size: 14px; font-weight: 500; color: #7c3aed; text-decoration: none;">
            Visit ${p.name} &nbsp;&rarr;
          </a>
        </div>`,
        )
        .join('')}
    </div>
    <p style="font-size: 14px; line-height: 1.6; color: #888; margin: 0;">
      We'll only email you with meaningful updates. No spam — just real progress.
    </p>
    <p style="font-size: 14px; line-height: 1.6; color: #888; margin: 24px 0 0;">
      — The Pentridge Labs team
    </p>
  </div>
`;

const buildText = (productList) => `
You're on the list.

Thanks for joining the Pentridge Labs waitlist. We're excited to share more soon about a single subscription that unlocks the full suite of tools.

A few products are still in development. In the meantime, these are already live and ready for you to try:

${productList.map((p) => `${p.name} — ${p.tagline}\n${p.url}`).join('\n\n')}

We'll only email you with meaningful updates.

— The Pentridge Labs team
`;

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
      subject: "You're on the Pentridge Labs waitlist",
      html: buildHtml(PRODUCTS),
      text: buildText(PRODUCTS),
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
