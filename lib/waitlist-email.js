export const FROM_ADDRESS = 'Pentridge Labs <aki.b@pentridgemedia.com>';

export const SUBJECT = "You're on the Pentridge Labs waitlist";

export const buildHtml = () => `<!doctype html>
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
            <td>
              <p style="margin:0; font-family:'Geist',system-ui,-apple-system,sans-serif; font-size:16px; line-height:1.65; color:rgba(255,255,255,0.6);">
                Thanks for joining the waitlist. We're building a single subscription that unlocks the entire Pentridge Labs suite — we'll share more soon about pricing, timing, and what's next.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

export const buildText = () => `You're on the list. Get in early.

Thanks for joining the Pentridge Labs waitlist. We're building a single subscription that unlocks the entire suite — we'll share more soon about pricing, timing, and what's next.
`;
