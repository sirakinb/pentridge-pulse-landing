import { readFileSync, writeFileSync } from 'node:fs';
import { Resend } from 'resend';
import * as waitlist from '../lib/waitlist-email.js';
import * as newsletter from '../lib/newsletter-email.js';
import * as roi from '../lib/roi-report-email.js';
import { addContact, PENTRIDGE_AUDIENCE_ID } from '../lib/resend-audiences.js';

const envFile = readFileSync(new URL('../.env', import.meta.url), 'utf8');
const apiKey = envFile.match(/RESEND_API_KEY=(.+)/)?.[1]?.trim();
if (!apiKey) {
  console.error('RESEND_API_KEY missing from .env');
  process.exit(1);
}

const resend = new Resend(apiKey);
const to = process.argv[2] || 'aki.b@pentridgemedia.com';
const which = process.argv[3] || 'all'; // 'waitlist' | 'newsletter' | 'roi' | 'all'

const sampleRoiPayload = {
  email: to,
  workflowType: 'Missed calls',
  companySize: '1-10',
  currentHours: '15',
  hourlyRate: '35',
  automationPotential: 75,
  results: {
    currentCost: '27300.00',
    annualSavings: '24570.00',
    netSavings: '20475.00',
    roi: '500.0',
    paybackPeriod: '2.0',
    hoursSaved: '13.5',
    estimatedImplementationCost: '4095.00',
  },
};

async function sendOne(kind, mod, args) {
  const html = mod.buildHtml(args);
  const text = mod.buildText(args);
  writeFileSync(new URL(`./last-${kind}-email.html`, import.meta.url), html);
  console.log(`\n──── ${kind.toUpperCase()} ────`);
  console.log('From    :', mod.FROM_ADDRESS);
  console.log('To      :', to);
  console.log('Subject :', mod.SUBJECT);
  console.log('HTML    :', `scripts/last-${kind}-email.html (${html.length} chars)`);
  const { data, error } = await resend.emails.send({
    from: mod.FROM_ADDRESS,
    to,
    subject: mod.SUBJECT,
    html,
    text,
  });
  if (error) {
    console.error('Send failed:', error);
    return;
  }
  console.log('Sent. Resend id:', data?.id);
}

if (which === 'all' || which === 'waitlist') await sendOne('waitlist', waitlist);
if (which === 'all' || which === 'newsletter') await sendOne('newsletter', newsletter);
if (which === 'all' || which === 'roi') await sendOne('roi', roi, sampleRoiPayload);

console.log(`\n──── AUDIENCE: ${PENTRIDGE_AUDIENCE_ID} ────`);
const sources = which === 'all' ? ['waitlist', 'newsletter', 'roi'] : [which];
for (const source of sources) {
  const result = await addContact(resend, { email: to, source });
  console.log(`addContact(${source}):`, result.ok ? `ok ${result.id}` : `skipped (${result.error?.name || 'unknown'})`);
}
