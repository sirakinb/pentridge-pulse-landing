import { readFileSync, writeFileSync } from 'node:fs';
import { Resend } from 'resend';
import { FROM_ADDRESS, SUBJECT, buildHtml, buildText } from '../lib/waitlist-email.js';

const envFile = readFileSync(new URL('../.env', import.meta.url), 'utf8');
const apiKey = envFile.match(/RESEND_API_KEY=(.+)/)?.[1]?.trim();
if (!apiKey) {
  console.error('RESEND_API_KEY missing from .env');
  process.exit(1);
}

const to = process.argv[2] || 'aki.b@pentridgemedia.com';
const html = buildHtml();
const text = buildText();

writeFileSync(new URL('./last-test-email.html', import.meta.url), html);

console.log('───────── Sending waitlist test email ─────────');
console.log('From    :', FROM_ADDRESS);
console.log('To      :', to);
console.log('Subject :', SUBJECT);
console.log('HTML    : scripts/last-test-email.html (' + html.length + ' chars)');
console.log('Text len:', text.length, 'chars');
console.log('───────────────────────────────────────────────');

const resend = new Resend(apiKey);
const { data, error } = await resend.emails.send({
  from: FROM_ADDRESS,
  to,
  subject: SUBJECT,
  html,
  text,
});

if (error) {
  console.error('Send failed:', error);
  process.exit(1);
}
console.log('Sent. Resend id:', data?.id);
