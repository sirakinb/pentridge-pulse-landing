const WEBHOOK_URL =
  process.env.MANOR_WEBHOOK_URL ||
  'https://manor.pentridgemedia.com/api/v1/bots/cmt96jc2y001z2krx6hxbv9e9/webhook';

// Contact-intake only. Do not log the token or Authorization header.
export async function submitManorContact({ email, phone }) {
  const token = process.env.MANOR_WEBHOOK_TOKEN;
  if (!token) {
    const err = new Error('Manor webhook is not configured');
    err.status = 500;
    throw err;
  }

  const res = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email,
      phone: typeof phone === 'string' ? phone : '',
      source: 'Website form',
    }),
  });

  if (res.status < 200 || res.status >= 300) {
    const err = new Error('Contact intake failed');
    err.status = res.status;
    throw err;
  }

  return true;
}
