export const FROM_ADDRESS = 'Aki from Pentridge <aki.b@pentridgemedia.com>';
export const SUBJECT = "You're subscribed to Pentridge updates";

export const buildHtml = () => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark only">
  <title>${SUBJECT}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&family=Geist:wght@300;400;500&family=Geist+Mono:wght@500&display=swap');
    body { margin:0; padding:0; background:#000; }
    a { text-decoration:none; }
    @media (max-width: 600px) {
      .container { padding:32px 20px !important; }
      .headline { font-size:34px !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background:#000; font-family:'Geist',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif; color:#fafafa;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#000;">
    <tr><td align="center" class="container" style="padding:56px 24px;">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px; width:100%;">
        <tr><td style="padding-bottom:32px;">
          <p style="margin:0; font-family:'Geist Mono',ui-monospace,Menlo,monospace; font-size:11px; letter-spacing:0.3em; text-transform:uppercase; color:rgba(255,255,255,0.4);">
            Pentridge Media
          </p>
        </td></tr>

        <tr><td style="padding-bottom:24px;">
          <h1 class="headline" style="margin:0 0 6px; font-family:'Fraunces',Georgia,serif; font-weight:500; font-size:42px; line-height:1.1; letter-spacing:-0.01em; color:#fafafa;">
            You're in the loop.
          </h1>
          <h2 class="headline" style="margin:0; font-family:'Fraunces',Georgia,serif; font-weight:500; font-size:42px; line-height:1.1; letter-spacing:-0.01em;">
            <span style="background:linear-gradient(90deg,#a855f7,#ec4899); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; color:#c084fc;">
              Welcome aboard.
            </span>
          </h2>
        </td></tr>

        <tr><td style="padding-bottom:32px;">
          <p style="margin:0; font-size:16px; line-height:1.65; color:rgba(255,255,255,0.6);">
            Thanks for subscribing to Pentridge. You'll hear from me on becoming AI- and agent-ready, building systems that actually work, and growing your business in this new AI world. From my real, in-the-trenches experience.
          </p>
        </td></tr>

        <tr><td style="padding-top:40px; border-top:1px solid rgba(255,255,255,0.08);">
          <p style="margin:24px 0 0; font-family:'Geist Mono',ui-monospace,Menlo,monospace; font-size:11px; letter-spacing:0.2em; text-transform:uppercase; color:rgba(255,255,255,0.3);">
            — Pentridge Media
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

export const buildText = () => `You're in the loop. Welcome aboard.

Thanks for subscribing to Pentridge. You'll hear from me on becoming AI- and agent-ready, building systems that actually work, and growing your business in this new AI world. From my real, in-the-trenches experience.

— Pentridge Media
`;
