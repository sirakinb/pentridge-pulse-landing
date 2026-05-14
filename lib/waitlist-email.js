export const FROM_ADDRESS = 'Pentridge Labs <aki.b@pentridgemedia.com>';

export const SUBJECT = "You're on the Pentridge Labs waitlist";

export const PRODUCTS = [
  {
    name: 'Voiyce',
    tagline: 'Write at the speed of thought. Native macOS voice-to-text that turns your voice into formatted text in any app.',
    cta: 'Visit Voiyce',
    url: 'https://voiyce.us',
  },
  {
    name: 'Still',
    tagline: 'Generate your own meditation music. Personalized soundscapes designed for focus, rest, and clarity.',
    cta: 'Visit Still',
    url: 'https://stillmeditation.app',
  },
  {
    name: 'DropCard',
    tagline: 'Your networking, upgraded. AI-powered business card capture, selfie contact memory, and NFC tap-to-share.',
    cta: 'Visit DropCard',
    url: 'https://www.dropcard.app',
  },
];

const productCard = (p) => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0d0d0d; border:1px solid #1f1f1f; border-radius:16px; margin-bottom:12px;">
    <tr>
      <td style="padding:24px;">
        <p style="margin:0 0 6px; font-family:'Fraunces',Georgia,serif; font-weight:500; font-size:22px; line-height:1.2; color:#fafafa;">
          ${p.name}
        </p>
        <p style="margin:0 0 18px; font-family:'Geist',system-ui,-apple-system,sans-serif; font-size:14px; line-height:1.55; color:rgba(255,255,255,0.55);">
          ${p.tagline}
        </p>
        <a href="${p.url}" style="display:inline-block; font-family:'Geist Mono',ui-monospace,Menlo,monospace; font-size:11px; letter-spacing:0.2em; text-transform:uppercase; color:#ec4899; text-decoration:none; border-bottom:1px solid rgba(236,72,153,0.4); padding-bottom:3px;">
          ${p.cta} &nbsp;→
        </a>
      </td>
    </tr>
  </table>
`;

export const buildHtml = (products = PRODUCTS) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark only">
  <meta name="supported-color-schemes" content="dark only">
  <title>You're on the Pentridge Labs waitlist</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&family=Geist:wght@300;400;500&family=Geist+Mono:wght@500&display=swap');
    body { margin:0; padding:0; background:#000; }
    a { text-decoration: none; }
    @media (max-width: 600px) {
      .container { padding: 32px 20px !important; }
      .headline { font-size: 34px !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background:#000; font-family:'Geist',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif; color:#fafafa;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#000;">
    <tr>
      <td align="center" class="container" style="padding:56px 24px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px; width:100%;">

          <!-- Brand label -->
          <tr>
            <td style="padding-bottom:32px;">
              <p style="margin:0; font-family:'Geist Mono',ui-monospace,Menlo,monospace; font-size:11px; letter-spacing:0.3em; text-transform:uppercase; color:rgba(255,255,255,0.4);">
                Pentridge Labs
              </p>
            </td>
          </tr>

          <!-- Headline -->
          <tr>
            <td style="padding-bottom:24px;">
              <h1 class="headline" style="margin:0 0 6px; font-family:'Fraunces',Georgia,serif; font-weight:500; font-size:42px; line-height:1.1; letter-spacing:-0.01em; color:#fafafa;">
                You're on the list.
              </h1>
              <h2 class="headline" style="margin:0; font-family:'Fraunces',Georgia,serif; font-weight:500; font-size:42px; line-height:1.1; letter-spacing:-0.01em;">
                <span style="background:linear-gradient(90deg,#a855f7,#ec4899); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; color:#c084fc;">
                  Get in early.
                </span>
              </h2>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding-bottom:40px;">
              <p style="margin:0 0 16px; font-family:'Geist',system-ui,-apple-system,sans-serif; font-size:16px; line-height:1.65; color:rgba(255,255,255,0.6);">
                Thanks for joining the waitlist. We're building a single subscription that unlocks the entire Pentridge Labs suite — we'll share more soon about pricing, timing, and what's next.
              </p>
              <p style="margin:0; font-family:'Geist',system-ui,-apple-system,sans-serif; font-size:16px; line-height:1.65; color:rgba(255,255,255,0.6);">
                A few of our products are still in development. These three are already live and worth a look in the meantime:
              </p>
            </td>
          </tr>

          <!-- Section divider label -->
          <tr>
            <td style="padding-bottom:16px;">
              <p style="margin:0; font-family:'Geist Mono',ui-monospace,Menlo,monospace; font-size:11px; letter-spacing:0.3em; text-transform:uppercase; color:rgba(255,255,255,0.4);">
                Already Live
              </p>
            </td>
          </tr>

          <!-- Product cards -->
          <tr>
            <td>
              ${products.map(productCard).join('')}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:40px; border-top:1px solid rgba(255,255,255,0.08); margin-top:24px;">
              <p style="margin:24px 0 8px; font-family:'Geist',system-ui,-apple-system,sans-serif; font-size:13px; line-height:1.65; color:rgba(255,255,255,0.4);">
                We'll only email you with meaningful updates. No spam — just real progress on the suite.
              </p>
              <p style="margin:24px 0 0; font-family:'Geist Mono',ui-monospace,Menlo,monospace; font-size:11px; letter-spacing:0.2em; text-transform:uppercase; color:rgba(255,255,255,0.3);">
                — Pentridge Labs
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

export const buildText = (products = PRODUCTS) => `You're on the list. Get in early.

Thanks for joining the Pentridge Labs waitlist. We're building a single subscription that unlocks the entire suite — we'll share more soon about pricing, timing, and what's next.

A few of our products are still in development. These three are already live:

${products.map((p) => `${p.name}\n${p.tagline}\n${p.url}`).join('\n\n')}

We'll only email you with meaningful updates. No spam.

— Pentridge Labs
`;
