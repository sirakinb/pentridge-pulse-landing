export const FROM_ADDRESS = 'Pentridge Media <aki.b@pentridgemedia.com>';
export const SUBJECT = 'Your AI Automation ROI Report';

const fmtMoney = (n) =>
  '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

const fmtMonths = (n) => {
  const v = Number(n);
  if (!isFinite(v) || v <= 0) return 'Immediate';
  if (v < 1) return '< 1 month';
  return `${v.toFixed(1)} months`;
};

const fmtHours = (n) => `${Number(n).toFixed(1)} hrs / week`;

const recommendationsFor = (workflowType) => {
  const map = {
    'Missed calls': [
      'Deploy an AI receptionist to answer inbound calls 24/7 with appointment booking.',
      'Route after-hours calls into a smart voicemail with auto-transcription and follow-up.',
      'Trigger SMS follow-up within 60 seconds of any missed call.',
    ],
    'Lead follow-up': [
      'Auto-qualify inbound leads with an AI form/chat that runs in under 60 seconds.',
      'Push qualified leads into your CRM with enrichment and a first-touch email sequence.',
      'Re-engage cold leads with a 30/60/90-day automated nurture flow.',
    ],
    'Admin reporting': [
      'Replace weekly Excel reports with a live dashboard wired to your data sources.',
      'Auto-summarize weekly metrics into a Friday email digest for stakeholders.',
      'Eliminate copy-paste between tools with two-way sync (CRM ↔ accounting ↔ ops).',
    ],
    'CRM cleanup': [
      'Run a one-time enrichment pass to fill missing fields (industry, role, company size).',
      'Auto-flag and merge duplicate contacts using fuzzy match + last-touched rules.',
      'Set up sync rules so the CRM stays clean automatically as new records arrive.',
    ],
    'Proposal generation': [
      'Generate first-draft proposals from a discovery call transcript + your pricing model.',
      'Use a template + variable system so 80% of every proposal is pre-filled.',
      'Auto-send signed contracts straight into your CRM as Closed-Won.',
    ],
    'Customer support': [
      'Deploy an AI agent to handle Tier-1 inquiries (FAQ, status checks, basic troubleshooting).',
      'Route complex tickets to humans with the AI summary + suggested response pre-drafted.',
      'Auto-detect churn signals in support tickets and notify the account owner.',
    ],
  };
  return map[workflowType] || [
    'Start with the workflow taking the most hours per week — that is your highest-leverage automation.',
    'Connect the tools that already hold the data (CRM, calendar, inbox) before building anything new.',
    'Pilot one workflow end-to-end, measure savings for two weeks, then expand.',
  ];
};

export const buildHtml = ({ email, workflowType, companySize, currentHours, hourlyRate, automationPotential, results }) => {
  const recs = recommendationsFor(workflowType);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark only">
  <title>${SUBJECT}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&family=Geist:wght@300;400;500;600&family=Geist+Mono:wght@500&display=swap');
    body { margin:0; padding:0; background:#000; }
    a { text-decoration:none; }
    @media (max-width: 600px) {
      .container { padding:32px 20px !important; }
      .headline { font-size:34px !important; }
      .metric-grid td { display:block !important; width:100% !important; padding:0 0 12px 0 !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background:#000; font-family:'Geist',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif; color:#fafafa;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#000;">
    <tr><td align="center" class="container" style="padding:56px 24px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%;">

        <tr><td style="padding-bottom:32px;">
          <p style="margin:0; font-family:'Geist Mono',ui-monospace,Menlo,monospace; font-size:11px; letter-spacing:0.3em; text-transform:uppercase; color:rgba(255,255,255,0.4);">
            Pentridge Media · AI ROI Report
          </p>
        </td></tr>

        <tr><td style="padding-bottom:24px;">
          <h1 class="headline" style="margin:0 0 6px; font-family:'Fraunces',Georgia,serif; font-weight:500; font-size:42px; line-height:1.1; letter-spacing:-0.01em; color:#fafafa;">
            Your automation could save
          </h1>
          <h2 class="headline" style="margin:0; font-family:'Fraunces',Georgia,serif; font-weight:500; font-size:48px; line-height:1.1; letter-spacing:-0.01em;">
            <span style="background:linear-gradient(90deg,#a855f7,#ec4899); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; color:#c084fc;">
              ${fmtMoney(results.annualSavings)} / year.
            </span>
          </h2>
        </td></tr>

        <tr><td style="padding-bottom:40px;">
          <p style="margin:0; font-size:16px; line-height:1.65; color:rgba(255,255,255,0.6);">
            Based on the numbers you entered for <strong style="color:#fafafa;">${workflowType || 'your workflow'}</strong>${companySize ? ` at a <strong style="color:#fafafa;">${companySize}</strong> employee company` : ''}. Here's the full breakdown and where we'd start.
          </p>
        </td></tr>

        <!-- Metrics grid -->
        <tr><td style="padding-bottom:16px;">
          <p style="margin:0; font-family:'Geist Mono',ui-monospace,Menlo,monospace; font-size:11px; letter-spacing:0.3em; text-transform:uppercase; color:rgba(255,255,255,0.4);">
            The Numbers
          </p>
        </td></tr>
        <tr><td style="padding-bottom:32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="metric-grid">
            <tr>
              <td width="50%" valign="top" style="padding:0 8px 12px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0d0d0d; border:1px solid #1f1f1f; border-radius:14px;">
                  <tr><td style="padding:22px;">
                    <p style="margin:0 0 8px; font-family:'Geist Mono',ui-monospace,monospace; font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:rgba(255,255,255,0.4);">Annual Savings</p>
                    <p style="margin:0; font-family:'Fraunces',Georgia,serif; font-weight:500; font-size:30px; line-height:1; color:#22c55e;">${fmtMoney(results.annualSavings)}</p>
                  </td></tr>
                </table>
              </td>
              <td width="50%" valign="top" style="padding:0 0 12px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0d0d0d; border:1px solid #1f1f1f; border-radius:14px;">
                  <tr><td style="padding:22px;">
                    <p style="margin:0 0 8px; font-family:'Geist Mono',ui-monospace,monospace; font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:rgba(255,255,255,0.4);">Net Annual Savings</p>
                    <p style="margin:0; font-family:'Fraunces',Georgia,serif; font-weight:500; font-size:30px; line-height:1; color:#22c55e;">${fmtMoney(results.netSavings)}</p>
                  </td></tr>
                </table>
              </td>
            </tr>
            <tr>
              <td width="50%" valign="top" style="padding:0 8px 0 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0d0d0d; border:1px solid #1f1f1f; border-radius:14px;">
                  <tr><td style="padding:22px;">
                    <p style="margin:0 0 8px; font-family:'Geist Mono',ui-monospace,monospace; font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:rgba(255,255,255,0.4);">Hours Reclaimed</p>
                    <p style="margin:0; font-family:'Fraunces',Georgia,serif; font-weight:500; font-size:30px; line-height:1; color:#a855f7;">${fmtHours(results.hoursSaved)}</p>
                  </td></tr>
                </table>
              </td>
              <td width="50%" valign="top" style="padding:0 0 0 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0d0d0d; border:1px solid #1f1f1f; border-radius:14px;">
                  <tr><td style="padding:22px;">
                    <p style="margin:0 0 8px; font-family:'Geist Mono',ui-monospace,monospace; font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:rgba(255,255,255,0.4);">Payback Period</p>
                    <p style="margin:0; font-family:'Fraunces',Georgia,serif; font-weight:500; font-size:30px; line-height:1; color:#ec4899;">${fmtMonths(results.paybackPeriod)}</p>
                  </td></tr>
                </table>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Assumptions -->
        <tr><td style="padding-bottom:16px;">
          <p style="margin:0; font-family:'Geist Mono',ui-monospace,Menlo,monospace; font-size:11px; letter-spacing:0.3em; text-transform:uppercase; color:rgba(255,255,255,0.4);">
            What We Used
          </p>
        </td></tr>
        <tr><td style="padding-bottom:32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0d0d0d; border:1px solid #1f1f1f; border-radius:14px;">
            <tr><td style="padding:20px 22px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:14px;">
                ${[
                  ['Workflow', workflowType || '—'],
                  ['Company size', companySize ? `${companySize} employees` : '—'],
                  ['Current weekly hours', currentHours ? `${currentHours} hrs / week` : '—'],
                  ['Hourly rate', hourlyRate ? `$${hourlyRate} / hr` : '—'],
                  ['Automation potential', automationPotential != null ? `${automationPotential}%` : '—'],
                  ['Estimated implementation cost', results.estimatedImplementationCost ? fmtMoney(results.estimatedImplementationCost) : '—'],
                ]
                  .map(
                    ([label, value]) => `
                  <tr>
                    <td style="padding:8px 0; color:rgba(255,255,255,0.5); width:55%;">${label}</td>
                    <td style="padding:8px 0; color:#fafafa; text-align:right; font-family:'Geist Mono',ui-monospace,monospace; font-size:13px;">${value}</td>
                  </tr>`,
                  )
                  .join('')}
              </table>
            </td></tr>
          </table>
        </td></tr>

        <!-- Recommendations -->
        <tr><td style="padding-bottom:16px;">
          <p style="margin:0; font-family:'Geist Mono',ui-monospace,Menlo,monospace; font-size:11px; letter-spacing:0.3em; text-transform:uppercase; color:rgba(255,255,255,0.4);">
            Where We'd Start
          </p>
        </td></tr>
        <tr><td style="padding-bottom:40px;">
          ${recs
            .map(
              (rec, i) => `
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0d0d0d; border:1px solid #1f1f1f; border-radius:14px; margin-bottom:10px;">
              <tr><td style="padding:18px 22px;">
                <p style="margin:0 0 4px; font-family:'Geist Mono',ui-monospace,monospace; font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:#a855f7;">Step ${i + 1}</p>
                <p style="margin:0; font-size:15px; line-height:1.55; color:rgba(255,255,255,0.85);">${rec}</p>
              </td></tr>
            </table>
          `,
            )
            .join('')}
        </td></tr>

        <!-- CTA -->
        <tr><td style="padding-bottom:8px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg, rgba(168,85,247,0.15), rgba(236,72,153,0.1)); border:1px solid rgba(168,85,247,0.3); border-radius:18px;">
            <tr><td align="center" style="padding:32px 24px;">
              <p style="margin:0 0 8px; font-family:'Fraunces',Georgia,serif; font-weight:500; font-size:24px; line-height:1.2; color:#fafafa;">
                Want this built?
              </p>
              <p style="margin:0 0 20px; font-size:14px; line-height:1.55; color:rgba(255,255,255,0.6);">
                Book a 30-minute audit. We'll map the first workflow and price the build.
              </p>
              <a href="https://cal.com/akinyemi-bajulaiye-2jua88/30min" style="display:inline-block; padding:14px 28px; background:linear-gradient(90deg,#a855f7,#ec4899); border-radius:9999px; font-family:'Geist',system-ui,sans-serif; font-size:14px; font-weight:500; color:#fff;">
                Book an Automation Audit
              </a>
            </td></tr>
          </table>
        </td></tr>

        <tr><td style="padding-top:40px; border-top:1px solid rgba(255,255,255,0.08);">
          <p style="margin:24px 0 8px; font-size:12px; line-height:1.6; color:rgba(255,255,255,0.4);">
            These numbers are estimates based on the inputs you provided. Real results depend on data quality, tool access, and how disciplined the rollout is — we adjust during the audit.
          </p>
          <p style="margin:8px 0 0; font-family:'Geist Mono',ui-monospace,Menlo,monospace; font-size:11px; letter-spacing:0.2em; text-transform:uppercase; color:rgba(255,255,255,0.3);">
            — Pentridge Media
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
};

export const buildText = ({ email, workflowType, companySize, currentHours, hourlyRate, automationPotential, results }) => {
  const recs = recommendationsFor(workflowType);
  return `YOUR AI AUTOMATION ROI REPORT — Pentridge Media

Your automation could save ${fmtMoney(results.annualSavings)} / year.

Based on the numbers you entered for ${workflowType || 'your workflow'}${companySize ? ` at a ${companySize} employee company` : ''}.

THE NUMBERS
- Annual Savings: ${fmtMoney(results.annualSavings)}
- Net Annual Savings: ${fmtMoney(results.netSavings)}
- Hours Reclaimed: ${fmtHours(results.hoursSaved)}
- Payback Period: ${fmtMonths(results.paybackPeriod)}

WHAT WE USED
- Workflow: ${workflowType || '—'}
- Company size: ${companySize || '—'}${companySize ? ' employees' : ''}
- Current weekly hours: ${currentHours || '—'}
- Hourly rate: ${hourlyRate ? '$' + hourlyRate + ' / hr' : '—'}
- Automation potential: ${automationPotential != null ? automationPotential + '%' : '—'}
- Estimated implementation cost: ${results.estimatedImplementationCost ? fmtMoney(results.estimatedImplementationCost) : '—'}

WHERE WE'D START
${recs.map((r, i) => `${i + 1}. ${r}`).join('\n')}

WANT THIS BUILT?
Book a 30-minute audit: https://cal.com/akinyemi-bajulaiye-2jua88/30min

These numbers are estimates based on the inputs you provided. Real results depend on data quality, tool access, and disciplined rollout.

— Pentridge Media
`;
};
