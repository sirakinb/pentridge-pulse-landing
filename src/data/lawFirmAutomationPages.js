export const bookingUrl = 'https://cal.com/akinyemi-bajulaiye-2jua88/30min';

export const lawFirmNavLinks = [
  { label: 'Overview', path: '/law-firm-automation/' },
  { label: 'Intake', path: '/law-firm-client-intake-automation/' },
  { label: 'AI Receptionist', path: '/law-firm-ai-receptionist/' },
  { label: 'CRM', path: '/law-firm-crm-automation/' },
  { label: 'Documents', path: '/law-firm-document-collection-scheduling-automation/' },
  { label: 'Video', path: '/law-firm-automation-workflow-video/' },
  { label: 'Checklist', path: '/law-firm-automation-readiness-checklist/' },
];

const commonNeeds = [
  'Current intake, CRM, calendar, and document workflows.',
  'Access to the relevant tools or a screen-share walkthrough.',
  'Firm-approved rules for routing, escalation, messaging, and legal-review boundaries.',
  'Examples of the messy handoffs staff deal with today.',
];

const commonTimeline = [
  { scope: 'Simple workflow', range: '10-14 days', details: 'One lead source, one CRM handoff, one staff alert path, and a short follow-up sequence.' },
  { scope: 'Moderate workflow', range: '2-4 weeks', details: 'Multiple lead sources, CRM stages, reminders, document status, and staff assignment rules.' },
  { scope: 'Complex workflow', range: '4-8+ weeks', details: 'Legacy tools, API work, reporting, multiple practice areas, or deeper agent-enabled infrastructure.' },
];

export const lawFirmPages = {
  hub: {
    id: 'hub',
    path: '/law-firm-automation/',
    type: 'service',
    title: 'AI Workflow Automation for Law Firms | Pentridge',
    description: 'Pentridge helps independent law firms automate intake, CRM updates, scheduling, documents, reporting, and lead follow-up.',
    keywords: 'AI workflow automation for law firms, law firm automation, legal workflow automation, law firm intake automation, legal CRM automation',
    h1: 'AI Workflow Automation for Independent Law Firms',
    eyebrow: 'Law Firm Automation',
    intro: 'Pentridge Media helps independent law firms audit messy operations, identify bottlenecks, and build practical AI-enabled workflows across intake, CRM, scheduling, documents, reporting, and follow-up. The goal is not another disconnected tool. The goal is a clearer operating system for the work your firm already does.',
    cta: 'Book a Law Firm Automation Audit',
    secondaryCta: { label: 'Take the readiness checklist', path: '/law-firm-automation-readiness-checklist/' },
    workflowDiagram: ['Lead captured', 'Qualified', 'Routed', 'Scheduled', 'Documents requested', 'CRM updated', 'Follow-up monitored'],
    sections: [
      {
        title: 'Who This Is For',
        body: [
          'This service is for independent law firms from solo attorneys to small teams where the owner, managing partner, intake coordinator, receptionist, VA, or paralegal is still carrying too much operational memory.',
          'It is especially useful when the firm already uses tools like Clio, Lawmatics, MyCase, Law Ruler, Google Workspace, Zapier, Make, n8n, HubSpot, or Airtable but the workflow is still not a well-oiled machine.',
        ],
        bullets: [
          'Solo attorneys who need a clearer first workflow before hiring more admin help.',
          'Small firms where intake, CRM updates, documents, and follow-up are spread across staff memory.',
          'Firms that want AI support but need process clarity before connecting agents or APIs.',
          'Owners who want an audit-first custom quote instead of buying another SaaS subscription first.',
        ],
      },
      {
        title: 'The Pentridge Workflow Automation Method',
        body: [
          'Pentridge starts by auditing how the firm actually works. That means looking at lead sources, intake paths, CRM stages, current automations, case-management tools, document requests, staff roles, and reporting gaps.',
          'Then Pentridge designs, builds, tests, launches, monitors, and improves a narrow workflow that can create a practical first win.',
        ],
        steps: [
          'Audit the operations and identify the bottlenecks.',
          'Design the workflow.',
          'Build and integrate across the tools the firm already uses.',
          'Test edge cases and legal-risk boundaries.',
          'Launch with monitoring.',
          'Maintain and improve the workflow over time.',
        ],
      },
      {
        title: 'When To Automate First',
        body: [
          'Automate when the workflow is repetitive, defined, high enough volume to matter, and tied to a real bottleneck. Clean the process first when the rules are unclear, the data is messy, or no one agrees who owns the next action.',
        ],
        bullets: [
          'Good first projects: intake routing, CRM updates, consultation booking, document requests, lead-source reporting, and staff alerts.',
          'Poor first projects: legal judgment, legal advice, unclear exceptions, or workflows where the firm has not approved the rules.',
        ],
      },
    ],
    sampleAutomations: [
      { trigger: 'New intake form submitted', actions: 'Create CRM record, tag source, assign owner, send next-step message', output: 'Lead has a status, owner, and follow-up path.' },
      { trigger: 'Consultation booked', actions: 'Update stage, create calendar event, send confirmation, request documents', output: 'Staff can see the appointment and pre-consult status.' },
      { trigger: 'Documents incomplete after 24 hours', actions: 'Send reminder, update document status, create staff task', output: 'No one has to manually check every file request.' },
    ],
    timeline: commonTimeline,
    needs: commonNeeds,
    faqs: [
      ['What is AI workflow automation for law firms?', 'It is the use of software, integrations, and AI-enabled workflows to move operational work across intake, CRM records, calendars, documents, follow-up, and reporting under firm-approved rules.'],
      ['What should a law firm automate first?', 'Start with a workflow that is repetitive, easy to define, and tied to lost time or lost leads. Intake, CRM updates, scheduling, document requests, and reporting are common first candidates.'],
      ['Does automation replace staff?', 'No. The goal is to reduce repetitive handoffs and make the operation clearer. Staff and attorneys still handle legal judgment, edge cases, client-sensitive communication, and final decisions.'],
      ['Can Pentridge work with our current tools?', 'Often, yes. Pentridge can audit tools such as Clio, Lawmatics, MyCase, Law Ruler, HubSpot, Airtable, Google Workspace, Zapier, Make, n8n, APIs, and webhooks.'],
      ['How fast can an audit happen?', 'Audit findings can be delivered in as little as 48 hours once access and context are available. A first workflow often takes 10 to 14 days after scope is confirmed.'],
      ['How much does law firm workflow automation cost?', 'Pricing depends on workflow scope, tool access, platform limits, and whether the firm wants a one-time build or ongoing support. Pentridge starts with an audit-first custom quote.'],
    ],
    related: ['intake', 'aiReceptionist', 'crm', 'documents', 'checklist', 'video'],
  },

  intake: {
    id: 'intake',
    path: '/law-firm-client-intake-automation/',
    type: 'service',
    title: 'Law Firm Client Intake Automation | Pentridge',
    description: 'Automate legal intake forms, lead qualification, CRM records, staff alerts, booking, document requests, and follow-up.',
    keywords: 'law firm client intake automation, legal intake automation, law firm intake workflow, AI intake workflow for law firms',
    h1: 'Law Firm Client Intake Automation',
    eyebrow: 'Client Intake Automation',
    intro: 'Law firm client intake automation connects forms, calls, chat, calendars, CRMs, document requests, and follow-up sequences so new leads are captured and routed consistently. Pentridge helps independent firms qualify prospects, alert staff, schedule consultations, and create cleaner records inside the tools the firm already uses.',
    cta: 'Book an Intake Automation Audit',
    workflowDiagram: ['Lead source', 'Form/call/chat', 'Qualification', 'CRM record', 'Staff alert', 'Calendar booking', 'Document request', 'Follow-up sequence'],
    sections: [
      {
        title: 'Intake Is More Than A Form',
        body: [
          'A form is only one entry point. A real intake workflow needs capture, qualification, CRM updates, staff alerts, booking, document requests, follow-up, and reporting.',
          'The workflow should have an owner, a trigger, a record, and a next action at each step.',
        ],
      },
      {
        title: 'Operational Workflow',
        steps: [
          'Lead source is captured from organic search, referrals, ads, direct calls, chat, email, or website forms.',
          'The prospect provides contact information, case type, location, urgency, and preferred contact method.',
          'Firm-approved qualification questions collect structured facts without giving legal advice.',
          'The CRM record is created or updated with source, status, notes, and next action.',
          'Staff receives an alert when action or review is needed.',
          'The prospect receives a booking path where appropriate.',
          'Document requests and reminders are triggered when the firm needs more information.',
          'Follow-up continues until the status changes or staff takes over.',
        ],
      },
      {
        title: 'Decision Criteria',
        body: ['Automate intake when the process is repetitive and firm-approved. Clean the process first when staff disagree about qualification rules, required fields, escalation language, or what happens after a lead responds.'],
      },
    ],
    beforeAfter: [
      ['Lead capture', 'Leads live in forms, inboxes, call notes, chat transcripts, or staff memory.', 'Every lead creates or updates a structured record.'],
      ['Qualification', 'Staff asks questions inconsistently or forgets key details.', 'The workflow asks firm-approved questions in a repeatable order.'],
      ['CRM updates', 'Notes and stages are updated when someone remembers.', 'Records, stages, tags, tasks, and next steps update where the platform allows.'],
      ['Scheduling', 'Staff goes back and forth by email or phone.', 'The lead receives an approved booking path and confirmation sequence.'],
    ],
    timeline: commonTimeline,
    needs: commonNeeds,
    faqs: [
      ['What does law firm client intake automation cost?', 'Cost depends on tools, integrations, lead sources, CRM setup, document collection, and whether the firm wants a one-time build or ongoing support.'],
      ['How long does a client intake workflow take to build?', 'A narrow first workflow can often be built in 10 to 14 days after scope, access, and requirements are confirmed.'],
      ['Can intake automation qualify legal leads?', 'It can collect structured information and tag leads based on firm-approved rules. It should not decide legal merit or give legal advice.'],
      ['Can this connect to Clio, Lawmatics, or MyCase?', 'Often, yes. The exact build depends on permissions, available integrations, API access, and the data the firm needs to move.'],
      ['What does staff still handle?', 'Staff and attorneys still handle conflict review, legal judgment, unusual situations, client-sensitive communication, and final decisions.'],
      ['Is intake automation just an online form?', 'No. A form is only one part of capture. The operational workflow includes qualification, CRM handoff, booking, document requests, alerts, and follow-up.'],
    ],
    related: ['hub', 'aiReceptionist', 'crm', 'documents', 'checklist'],
  },

  aiReceptionist: {
    id: 'aiReceptionist',
    path: '/law-firm-ai-receptionist/',
    type: 'service',
    title: 'AI Receptionist for Law Firms | Pentridge',
    description: 'Design AI receptionist workflows for intake questions, lead routing, booking, CRM handoff, escalation, and human review.',
    keywords: 'AI receptionist for law firms, legal AI receptionist, AI intake assistant, law firm virtual receptionist automation',
    h1: 'AI Receptionist for Law Firms',
    eyebrow: 'AI Receptionist',
    intro: 'An AI receptionist for law firms can answer basic intake questions, collect information, route leads, book calls, and escalate urgent issues when it is built with clear guardrails. Pentridge designs cautious AI reception workflows that support intake without giving legal advice or replacing attorney judgment.',
    cta: 'Book an AI Receptionist Audit',
    workflowDiagram: ['Inquiry received', 'Approved greeting', 'Basic facts collected', 'Escalation checked', 'CRM updated', 'Staff notified', 'Booking path offered'],
    sections: [
      {
        title: 'What An AI Receptionist Can Do',
        bullets: [
          'Answer firm-approved intake questions.',
          'Collect contact information, practice-area interest, urgency, and preferred contact method.',
          'Route new leads to the right intake path.',
          'Book consultations or send a booking link.',
          'Create or update CRM records.',
          'Summarize conversations for staff review.',
          'Escalate urgent, sensitive, or unclear situations.',
        ],
      },
      {
        title: 'What It Should Not Do',
        bullets: [
          'Give legal advice.',
          'Tell someone whether they have a valid case.',
          'Create an attorney-client relationship.',
          'Decide whether the firm will accept a matter.',
          'Answer case-specific legal questions without firm-approved rules.',
          'Handle emergencies without escalation.',
        ],
      },
      {
        title: 'Escalation Map',
        table: {
          headers: ['Situation', 'AI can do', 'Human escalation'],
          rows: [
            ['Urgent lead', 'Collect basic facts and contact details.', 'Immediate staff alert based on firm rules.'],
            ['Existing client', 'Ask for identifying information if approved.', 'Route to staff for case-specific updates.'],
            ['Wrong practice area', 'Use approved no-fit language.', 'Escalate edge cases or referral decisions.'],
            ['After-hours inquiry', 'Capture details and create the CRM record.', 'Staff reviews when available or immediately if urgent.'],
            ['Conflict-risk language', 'Collect names and relationship details requested by the firm.', 'Staff or attorney runs the conflict process.'],
          ],
        },
      },
    ],
    beforeAfter: [
      ['Availability', 'Prospects wait until staff are available.', 'Routine intake support can respond after hours or during busy periods.'],
      ['Routing', 'Staff manually sorts each inquiry.', 'Firm-approved rules route inquiries to the right next step.'],
      ['CRM handoff', 'Conversation details sit in notes or transcripts.', 'A summary, source, and next action are stored where the team can review them.'],
      ['Risk control', 'Everyone handles edge cases differently.', 'Escalation rules define where humans take over.'],
    ],
    timeline: commonTimeline,
    needs: commonNeeds,
    faqs: [
      ['What can an AI receptionist do for a law firm?', 'It can answer basic intake questions, collect information, route leads, book consultations, create CRM records, send staff alerts, and trigger approved follow-up.'],
      ['Can an AI receptionist qualify legal leads?', 'It can ask firm-approved qualification questions and tag answers. It should not decide legal merit or final acceptance.'],
      ['Can an AI receptionist give legal advice?', 'No. It should collect information and route the prospect to the approved next step without giving legal advice.'],
      ['How does the handoff to staff work?', 'The handoff can happen through CRM tasks, email alerts, calendar events, Google Workspace notifications, or another approved channel.'],
      ['What scripts should it use?', 'Scripts should cover greeting, intake questions, booking, no-fit language, legal-advice refusal, escalation language, and after-hours next steps.'],
      ['Is an AI receptionist compliant for law firms?', 'Compliance depends on jurisdiction, scripts, supervision, data handling, and firm rules. Pentridge builds operational guardrails while the firm approves legal and ethical language.'],
    ],
    related: ['hub', 'intake', 'crm', 'checklist'],
  },

  crm: {
    id: 'crm',
    path: '/law-firm-crm-automation/',
    type: 'service',
    title: 'Law Firm CRM Automation for Clio & Lawmatics',
    description: 'Automate law firm CRM records, pipeline stages, staff assignments, reminders, consultation outcomes, documents, and reporting.',
    keywords: 'law firm CRM automation, Clio automation consultant, Lawmatics automation consultant, Zapier automation for law firms, Make automation for law firms, n8n automation for law firms',
    h1: 'Law Firm CRM Automation',
    eyebrow: 'CRM Automation',
    intro: 'Law firm CRM automation keeps new lead records, pipeline stages, staff assignments, reminders, consultation outcomes, document status, and reporting visible instead of scattered across inboxes, forms, calendars, notes, and staff memory. Pentridge helps independent firms connect CRM workflows across the tools they already use.',
    cta: 'Book a CRM Automation Audit',
    workflowDiagram: ['New inquiry', 'CRM record', 'Source tagged', 'Owner assigned', 'Stage updated', 'Reminder created', 'Outcome logged', 'Report updated'],
    sections: [
      {
        title: 'CRM Hygiene',
        body: ['CRM automation starts with hygiene. If fields, stages, lead sources, owners, and next actions are inconsistent, adding another automation can make the mess move faster.'],
        bullets: ['Lead source fields.', 'Duplicate records.', 'Pipeline stages.', 'Practice-area tags.', 'Staff assignment rules.', 'Required notes and missing information.', 'Document request status.', 'Reporting fields.'],
      },
      {
        title: 'Tool Examples',
        body: ['Tools are examples, not products Pentridge owns or resells. The right setup depends on the firm, the permissions available, and the workflow that needs to move.'],
        bullets: ['Clio and Clio Grow.', 'Lawmatics.', 'HubSpot.', 'Airtable.', 'Zapier.', 'Make.', 'n8n.', 'Google Workspace.'],
      },
      {
        title: 'When Custom Automation Is Better Than Another SaaS Subscription',
        body: ['Buying another platform can help when the current system truly cannot support the workflow. But many firms do not need another subscription first. They need the current process audited, cleaned up, and connected.'],
        bullets: [
          'The firm already has the right CRM but the workflow is not configured well.',
          'Staff enter the same data into multiple systems.',
          'A standard connector does not expose the field or trigger the firm needs.',
          'Reports require data from forms, CRM records, calendars, and documents.',
          'The firm needs a narrow workflow, not a full platform migration.',
        ],
      },
    ],
    beforeAfter: [
      ['Lead records', 'Contact details live in forms, inboxes, and notes.', 'New inquiries create or update a lead record with source, owner, and next step.'],
      ['Pipeline stages', 'Staff disagree about where each lead sits.', 'Stage changes reflect booking, consultation outcome, document status, and follow-up.'],
      ['Assignments', 'No one is sure who owns the next action.', 'Rules assign staff and create tasks.'],
      ['Reporting', 'The owner reconstructs pipeline health manually.', 'Reports show source, status, bottlenecks, and overdue follow-up.'],
    ],
    timeline: commonTimeline,
    needs: commonNeeds,
    faqs: [
      ['What is law firm CRM automation?', 'It connects intake forms, lead records, pipeline stages, staff assignments, reminders, consultation outcomes, document status, and reporting.'],
      ['Can Pentridge automate Clio workflows?', 'Pentridge can audit and build Clio-related workflows where access, permissions, and platform capabilities allow.'],
      ['Can Pentridge automate Lawmatics workflows?', 'Pentridge can design and implement Lawmatics workflows where the account and permissions support the needed build.'],
      ['Should I use Zapier, Make, n8n, or custom API work?', 'Use the simplest reliable option that supports the workflow. Custom API work is useful when standard connectors do not expose the needed data or action.'],
      ['Can automation clean up scattered intake data?', 'Automation can prevent new messes and move data into the right places, but old records may need cleanup first.'],
      ['Do CRM workflows need ongoing maintenance?', 'Often, yes. Staff behavior, lead sources, software settings, fields, and reporting needs change over time.'],
    ],
    related: ['hub', 'intake', 'documents', 'checklist', 'video'],
  },

  documents: {
    id: 'documents',
    path: '/law-firm-document-collection-scheduling-automation/',
    type: 'service',
    title: 'Law Firm Document Collection & Scheduling Automation',
    description: 'Automate consultation scheduling, confirmations, reminders, intake forms, upload links, staff alerts, and CRM status updates.',
    keywords: 'law firm document collection automation, automated consultation scheduling for law firms, legal document request workflow, law firm scheduling automation',
    h1: 'Law Firm Document Collection and Consultation Scheduling Automation',
    eyebrow: 'Documents And Scheduling',
    intro: 'Law firm document collection and consultation scheduling automation covers the operational follow-through after a lead is ready for the next step. Pentridge helps firms connect consultation requests, booking links, confirmations, reminders, intake forms, upload links, staff notifications, and CRM status updates.',
    cta: 'Book a Document Workflow Audit',
    workflowDiagram: ['Consultation request', 'Calendar link', 'Confirmation', 'Reminders', 'Intake form', 'Upload link', 'Staff notification', 'CRM status update'],
    sections: [
      {
        title: 'The Workflow After A Lead Says Yes',
        steps: [
          'Consultation request is received from intake, chat, phone, referral, or CRM.',
          'Calendar link is sent or the appointment is booked based on approved rules.',
          'Confirmation goes to the prospect and the firm.',
          'Reminders go out before the appointment.',
          'Intake form collects structured information before the consult.',
          'Upload link requests documents the firm needs before review.',
          'Staff notification fires when action is needed.',
          'CRM status updates so the team can see what is complete and what is still waiting.',
        ],
      },
      {
        title: 'Examples By Practice Context',
        body: ['These examples are operational only. They do not give legal advice or replace attorney review.'],
        bullets: [
          'Family law: send a pre-consult questionnaire, request relevant documents, and alert staff when the packet is incomplete.',
          'Immigration: request identity documents, forms, and appointment reminders while staff handles review and legal judgment.',
          'Estate planning: send booking confirmation, intake questionnaire, family-information requests, and reminder tasks.',
          'Personal injury: collect basic incident information, request available documents or photos, and update CRM status for staff review.',
        ],
      },
      {
        title: 'No-Show Reduction And Staff Time Saved',
        body: [
          'No-shows and incomplete files create operational drag. Automation can send confirmations, reminders, forms, upload links, and staff alerts so the team is not manually chasing every next step.',
          'The workflow should stop or change when the prospect books, reschedules, submits documents, opts out, or needs human review.',
        ],
      },
    ],
    beforeAfter: [
      ['Consultation booking', 'Staff emails times back and forth.', 'Booking link, calendar sync, and confirmation are triggered.'],
      ['Reminder cadence', 'Staff sends manual reminders or forgets.', 'Approved email or SMS reminders go out before the appointment.'],
      ['Document request', 'Staff writes custom requests each time.', 'Template request with upload link is sent.'],
      ['Staff visibility', 'Updates are hidden in inboxes or portals.', 'CRM task, stage, and note updates show what needs action.'],
    ],
    timeline: commonTimeline,
    needs: commonNeeds,
    faqs: [
      ['How can law firms automate consultation scheduling?', 'The workflow can send a booking link, confirm the appointment, create calendar events, send reminders, and update the CRM stage.'],
      ['How can law firms automate document collection?', 'The workflow can send approved request templates, upload links, reminder messages, and staff alerts when files are missing or complete.'],
      ['Can reminders reduce no-shows?', 'Reminders can reduce avoidable no-shows, but they do not guarantee attendance. Timing, tone, and escalation should be approved by the firm.'],
      ['Can this work with Google Workspace?', 'Often, yes. Google Calendar, Gmail, Drive, and Sheets can support lightweight workflows depending on the firm setup and security requirements.'],
      ['What happens when clients do not respond?', 'The workflow can send approved reminders, create staff tasks, change CRM status, or escalate the lead for human review.'],
      ['What should still be handled manually?', 'Staff should review sensitive documents, legal questions, exceptions, and final client decisions.'],
    ],
    related: ['hub', 'intake', 'crm', 'checklist'],
  },

  video: {
    id: 'video',
    path: '/law-firm-automation-workflow-video/',
    type: 'article',
    title: 'Law Firm Workflow Automation Walkthrough | Pentridge',
    description: 'Watch a practical law firm workflow automation walkthrough covering MCPs, CLIs, connected tools, and operational AI transformation.',
    keywords: 'law firm workflow automation walkthrough, legal AI workflow video, law firm automation video, agent-native law firm operations',
    h1: 'Law Firm Workflow Automation: A Practical Walkthrough',
    eyebrow: 'Video Walkthrough',
    intro: 'This walkthrough uses Pentridge Media\'s law-firm automation video to explain how connected systems, MCPs, CLIs, and AI-assisted build tools can support a more modern legal operation. The practical takeaway is still operations-first: define the workflow, connect the systems, test the edge cases, and keep humans in control of legal judgment.',
    cta: 'Book a Law Firm Automation Audit',
    video: {
      title: 'If you are a forward-thinking law firm but overwhelmed by AI, watch this',
      url: 'https://www.youtube.com/watch?v=gLk_HekvJLo&t=2s',
      embedUrl: 'https://www.youtube.com/embed/gLk_HekvJLo?start=2',
      thumbnailUrl: 'https://i.ytimg.com/vi/gLk_HekvJLo/maxresdefault.jpg',
      uploadDate: '2026-05-25',
      duration: 'PT15M20S',
    },
    sections: [
      {
        title: 'Summary',
        body: [
          'The video is about building a more agent-native operating layer around law-firm systems. It points toward a future where case-management platforms, command-line tools, MCPs, and AI coding tools can work together instead of forcing the attorney or staff to manually bridge every gap.',
        ],
      },
      {
        title: 'Key Takeaways',
        bullets: [
          'AI transformation is not just a chatbot. It is the modernization of how work moves through the firm.',
          'Legacy systems may still matter, but the data needs cleaner paths into automations and agents.',
          'The first practical step is usually a narrow workflow, not a full software rebuild.',
          'Human review, testing, and approved rules are still required for legal operations.',
        ],
      },
      {
        title: 'Workflow Shown',
        steps: [
          'Identify the current legal operations workflow.',
          'Find where the case-management platform or CRM is limiting the process.',
          'Use APIs, MCPs, CLIs, or AI-assisted build tools where the native UI is not enough.',
          'Create a workflow that can move data, trigger tasks, and support staff visibility.',
          'Test the workflow before treating it as production infrastructure.',
        ],
      },
      {
        title: 'Tools Mentioned Or Implied',
        bullets: ['MCPs.', 'CLIs.', 'Codex.', 'Claude Code.', 'Cursor.', 'Case-management systems.', 'APIs and workflow automation layers.'],
      },
      {
        title: 'What I Would Improve',
        body: [
          'The next video should show one concrete workflow from start to finish: intake request, qualification, CRM update, staff alert, calendar booking, document request, and reporting.',
          'That would make the transformation idea easier for a law-firm owner to evaluate without needing to understand all of the underlying tooling.',
        ],
      },
      {
        title: 'Related Pentridge Services',
        bullets: ['Law firm intake automation.', 'AI receptionist implementation.', 'Law firm CRM automation.', 'Document collection and consultation scheduling automation.', 'Workflow automation audit.'],
      },
    ],
    faqs: [
      ['What is the video about?', 'It explains how law firms can think about AI transformation through connected systems, MCPs, CLIs, and workflow automation rather than isolated AI tools.'],
      ['Is this legal advice?', 'No. The video and page discuss operational automation, not legal advice or case-specific legal strategy.'],
      ['How does this connect to Pentridge services?', 'It supports the broader offer: auditing law-firm operations and building practical workflows across intake, CRM, documents, scheduling, and reporting.'],
      ['What should a law firm automate first?', 'Start with a narrow workflow where the rules are clear and the bottleneck is visible, such as intake, CRM updates, booking, document requests, or reporting.'],
      ['Do firms need custom software?', 'Not always. Some workflows can use existing tools. Custom work is useful when native automations or standard connectors cannot move the required data.'],
    ],
    related: ['hub', 'intake', 'crm', 'aiReceptionist'],
  },

  checklist: {
    id: 'checklist',
    path: '/law-firm-automation-readiness-checklist/',
    type: 'article',
    title: 'Law Firm Automation Readiness Checklist | Pentridge',
    description: 'Score your law firm intake, CRM, documents, scheduling, reporting, and tool sprawl to choose the first workflow to automate.',
    keywords: 'law firm automation readiness checklist, what should a law firm automate first, law firm automation audit, legal workflow automation checklist',
    h1: 'Law Firm Automation Readiness Checklist',
    eyebrow: 'Readiness Checklist',
    intro: 'Use this checklist to score whether your law firm should clean up the process first, automate one narrow workflow, or move into more advanced workflow automation. The goal is to pick the first practical workflow, not to automate everything at once.',
    cta: 'Send Us Your Score',
    sections: [
      {
        title: 'How To Use The Score',
        body: ['Answer each question as Not handled, Partially handled, or Systematized. The score is a planning tool, not a guaranteed ROI calculator. A high score means the workflow may be ready for automation if the firm has approved rules and tool access.'],
      },
    ],
    checklistQuestions: [
      'When a call or inquiry is not answered live, is there a documented next-step workflow?',
      'Do new leads receive a fast response with the right next step?',
      'Are CRM records updated consistently when new leads arrive?',
      'Do intake forms collect the information staff actually need?',
      'Are document requests sent, tracked, and followed up without manual chasing?',
      'Are consultation confirmations and reminders handled consistently?',
      'Is there an approved follow-up cadence for leads who do not respond?',
      'Do staff receive alerts when a lead, document, or task needs review?',
      'Can the owner see lead source, stage, and next action in reporting?',
      'Are tools connected, or is the same data copied into several places?',
      'Is manual data entry still required for routine intake or CRM updates?',
      'Does one person own automation rules, access, and maintenance?',
    ],
    scoreBands: [
      { range: '0-12', title: 'Urgent cleanup', details: 'Document the workflow and clean the process before building much automation.' },
      { range: '13-24', title: 'Strong automation opportunity', details: 'Pick one narrow workflow with clear rules, owners, and measurable next actions.' },
      { range: '25-36', title: 'Ready for advanced workflow automation', details: 'The firm may be ready for deeper CRM, document, reporting, or agent-enabled workflows.' },
    ],
    faqs: [
      ['What score means we should automate first?', 'A score of 13-24 usually points to one narrow automation opportunity. A score of 25-36 suggests the firm may be ready for a more advanced workflow.'],
      ['What if our score is low?', 'Start by documenting the process, cleaning the CRM, defining owners, and deciding what rules staff actually follow.'],
      ['Can a solo attorney use this checklist?', 'Yes. Solo firms often benefit because the owner can identify which manual handoff creates the most drag.'],
      ['Is this an ROI calculator?', 'No. It is a prioritization tool. Actual ROI depends on lead volume, staff time, tool access, data quality, and implementation scope.'],
      ['What should we send Pentridge after completing it?', 'Send the score, the weakest categories, the tools you use, and the workflow that feels most painful today.'],
    ],
    related: ['hub', 'intake', 'crm', 'documents', 'aiReceptionist'],
  },
};

export const getLawFirmPage = (id) => lawFirmPages[id];

export const getRelatedPages = (page) => {
  return (page.related || []).map((id) => lawFirmPages[id]).filter(Boolean);
};
