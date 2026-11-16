// Case study content, served as HTML on pentridgemedia.com so search engines,
// link previews and AI tools can read it. Moved here from the two standalone
// Vercel case-study builds that used to be embedded in an iframe.

const img = (id) => `https://lh3.googleusercontent.com/d/${id}=w2000`;

export const caseStudies = {
  law: {
    path: '/case-studies/michigan-law-firm-intake',
    title: 'Michigan Law Firm Intake and Workflow Automation | Pentridge',
    description:
      'How Pentridge helped a Michigan-based full-service law firm structure intake, qualification, follow-up, booking, and the handoff from lead to client.',
    eyebrow: 'Case study · Legal operations',
    headline: 'From fragmented intake to a connected operating flow.',
    dek: 'How Pentridge helped a Michigan law firm bring structure to intake, qualification, follow-up, booking, signing, and the transition from lead to client.',
    startingPoint:
      'We began with practical workflow automation. That work exposed a larger issue: the team needed a clear view of what was happening across its systems.',
    sections: [
      {
        label: '01 / Context',
        heading: 'A firm with capable tools, but no shared operating view.',
        body: [
          'The firm worked across Law Ruler for lead and intake management, Clio for case management, and a mix of forms, calendars, email, SMS, and staff tasks. The pieces existed. The path between them was inconsistent.',
        ],
        client:
          'A Michigan-based full-service law firm working across driver’s-license restoration, personal injury, criminal defense, and family law.',
        facts: [
          ['Core systems', 'Law Ruler + Clio'],
          ['Primary need', 'A clearer path from inquiry to client'],
          ['Initial wedge', 'Driver’s-license restoration'],
          ['Expansion', 'Personal injury + criminal defense'],
        ],
      },
      {
        label: '02 / The shift',
        heading: 'Move from scattered coordination to defined paths.',
        body: [
          'The goal was not to add complexity. It was to make the important handoffs explicit, repeatable, and easier for the team to manage.',
        ],
        beforeAfter: {
          beforeLabel: 'Before / fragmented',
          before: [
            'Processes existed in separate tools and partial workflows.',
            'Practice areas needed different intake and routing logic.',
            'Staff carried repetitive coordination between systems.',
            'The path from lead to retained client was difficult to see end to end.',
          ],
          afterLabel: 'After / structured',
          after: [
            'Practice-specific intake templates created a reusable pattern.',
            'Qualification answers routed viable and non-viable paths.',
            'Email, SMS, booking, signing, and payment follow-up were organized.',
            'Retained matters could move from Law Ruler into Clio with a defined handoff.',
          ],
        },
      },
      {
        label: '03 / Delivery',
        heading: 'What Pentridge built.',
        body: [
          'A reusable intake and follow-up structure, beginning with driver’s-license restoration and extending the pattern to personal injury and criminal defense.',
        ],
        items: [
          ['Practice-area intake', 'Repeatable templates with practice-specific routing and communication.'],
          ['Lead qualification', 'Answers routed leads into viable and non-viable paths.'],
          ['Email + SMS', 'Structured responses for booking, follow-up, signing, and payment.'],
          ['CRM handoff', 'Retained leads moved toward Clio for case management.'],
          ['Calendar + tasks', 'Events were enriched and tasks assigned based on lead activity.'],
          ['Payment follow-up', 'Pay-in-full and payment-plan paths were organized into sequences.'],
        ],
        path: { label: 'The operating path', steps: ['Forms', 'Law Ruler', 'Qualification', 'Booking', 'Clio'] },
      },
      {
        label: '04 / Proof',
        heading: 'The work is visible in the workflow evidence.',
        body: ['These are the workflow artifacts from the work, next to the parts of the case study they support.'],
        figures: [
          {
            kicker: 'Calendar enrichment',
            heading: 'Booking became an operational handoff.',
            body: 'Calendar events could carry the relevant lead context and trigger the next staff action, reducing the gap between a booked appointment and the work it required.',
            src: img('1RTy3oLLuvejanvD0XTEQBVqgwNRPMU8c'),
            width: 1366,
            height: 1396,
            alt: 'Driver’s-license restoration lead booking calendar enrichment workflow',
            caption: 'Driver’s-license restoration lead → booking calendar enrichment',
          },
          {
            kicker: 'Practice-area pattern',
            heading: 'The same operating logic extended across matters.',
            body: 'Personal-injury and criminal-defense flows used the same underlying structure while preserving practice-specific differences in intake and routing.',
            src: img('1qRJTb70ShLUGpw4GX-ZZwtpLjNUYIAhR'),
            width: 1324,
            height: 1430,
            alt: 'Personal injury lead booking calendar enrichment workflow',
            caption: 'Personal-injury lead → booking calendar enrichment',
          },
          {
            kicker: 'Matter handoff',
            heading: 'Retention created a defined next system.',
            body: 'When a lead became a client, the workflow supported the move from Law Ruler into Clio. That was the point where intake became case management.',
            src: img('1N9nSahD82LXjC05uMwI4_E7uDefTj9sZ'),
            width: 1516,
            height: 1414,
            alt: 'Law Ruler retained personal injury lead to Clio matter workflow',
            caption: 'Retained personal-injury lead → Clio matter',
          },
          {
            kicker: 'Task coordination',
            heading: 'Operational work became easier to assign.',
            body: 'Calendar events and portal messages could become visible staff tasks, making follow-up less dependent on someone remembering the next step.',
            src: img('1VicJ57kHg7Jth3Xzr0gpSTe9x_jGIdVG'),
            width: 1542,
            height: 1422,
            alt: 'Calendar event to task list assignment workflow',
            caption: 'Calendar event → task-list assignment',
          },
          {
            kicker: 'Client communication',
            heading: 'Inbound work could enter the same operating system.',
            body: 'New portal messages created another path into task coordination, helping the team respond to work arriving outside the initial intake flow.',
            src: img('1kdz6_czrVkYL4x60h6jxt11u_HeTas9u'),
            width: 1518,
            height: 1400,
            alt: 'New portal message to task list assignment workflow',
            caption: 'New portal message → task-list assignment',
          },
        ],
      },
      {
        label: '05 / Lesson',
        heading: 'Automation solved pieces. It also made the infrastructure gap obvious.',
        body: [
          'The next challenge was not another isolated automation.',
          'Relevant context lived across Law Ruler, Clio, calendars, marketing activity, forms, staff tasks, and other tools. Each system could do its job, but no single layer understood how the pieces related to one another.',
          'That made it harder to see how leads moved through the business, where work was being lost, and which operational improvement mattered most.',
        ],
      },
      {
        label: '06 / What’s next',
        heading: 'A shared workspace would give the team one place to see and manage the work.',
        body: [
          'The work completed here focused on workflow automation and streamlining. A future Agent Workspace could connect the relevant systems and help the team manage follow-up with better context.',
        ],
        items: [
          ['Follow the flow', 'See how leads move through intake, qualification, booking, signing, and conversion.'],
          ['Bring the details together', 'Give the team the information needed for follow-up and coordination.'],
          ['Keep records current', 'Update tasks, notes, and statuses in the original systems with control.'],
          ['Find the next priority', 'Review workflow performance and identify where the team can make the next improvement.'],
        ],
        path: { label: 'One connected view', steps: ['Law Ruler + Clio + Marketing', 'Agent Workspace', 'Team action'] },
      },
      {
        label: '07 / Method',
        heading: 'A practical path to better operations.',
        steps: [
          'Fix and streamline the workflows already in use.',
          'Identify the gaps automation alone does not solve.',
          'Centralize relevant context and make it observable.',
          'Introduce agents where they can safely perform useful work.',
        ],
      },
    ],
    cta: {
      heading: 'Make the way work moves through your business visible.',
      body: 'Start with an audit of the workflows, systems, and gaps that shape how work moves through your company.',
    },
  },

  property: {
    path: '/case-studies/property-management-operations',
    title: 'Property Management Voice Agent and Operations | Pentridge',
    description:
      'How Pentridge helped a Philadelphia-based property management company answer inbound calls, qualify rental interest, and connect leasing operations.',
    eyebrow: 'Case study · Property management · Jackson Rental Homes',
    headline: 'From missed calls to a working leasing pipeline.',
    dek: 'How Pentridge helped Jackson Rental Homes answer inbound calls, qualify rental interest, keep applicants informed, and connect property-management work across its systems.',
    startingPoint:
      'The work began with a voice agent. It expanded into a connected set of systems for leasing, applications, utilities, and follow-up.',
    sections: [
      {
        label: '01 / Context',
        heading: 'Demand was arriving faster than the team could handle it by phone.',
        body: [
          'Jackson Rental Homes serves Philadelphia-area owners, tenants, market-rate renters, and Section 8 applicants. People call about available properties, applications, showings, move-ins, utility bills, and tenant questions.',
        ],
        client:
          'A property management and leasing company with a steady flow of renter inquiries and ongoing owner and tenant operations.',
        facts: [
          ['Primary market', 'Philadelphia and surrounding counties'],
          ['Core demand', 'Property availability and rental search'],
          ['Applicant groups', 'Market-rate and Section 8 renters'],
          ['Core systems', 'Buildium, Zoho, Make, and Workspace'],
        ],
      },
      {
        label: '02 / The shift',
        heading: 'The phone became the first working layer of the leasing process.',
        body: [
          'Before Zuri, calls had to be answered by the team. Many callers wanted the same basic information, but every missed call could mean a lost rental inquiry or a delayed application conversation.',
        ],
        beforeAfter: {
          beforeLabel: 'Before / limited coverage',
          before: [
            'Calls arrived during business hours, evenings, and weekends.',
            'Staff had to answer repetitive questions about availability and requirements.',
            'Property links, follow-ups, and callback requests were handled manually.',
            'Applicants could wait for status updates or a response from the team.',
          ],
          afterLabel: 'After / Zuri on the line',
          after: [
            'Zuri answered calls around the clock.',
            'Callers received property information and listing links immediately.',
            'Names, numbers, intent, and callback requests could be captured.',
            'Human follow-up became focused on the calls that actually needed it.',
          ],
        },
      },
      {
        label: '03 / Zuri',
        heading: 'A voice agent that handled the first conversation.',
        body: [
          'Zuri was built to answer common rental questions, help callers find relevant properties, send listing links, and collect information for the team when a human response was needed.',
        ],
        figures: [
          {
            kicker: 'Voice agent',
            heading: 'The first response no longer depended on someone picking up the phone.',
            body: 'Zuri could answer questions about availability, Section 8, showings, applications, move-in requirements, and basic tenant policies. When a caller wanted a person or needed help beyond the available information, Zuri recorded the request for follow-up. The agent also handled specific renter needs, including bedroom count, budget, voucher status, accessibility questions, and requests for property links.',
            src: img('1xDxxidlvYQnI5tSHMrOCft3Cto8a3YoU'),
            width: 2000,
            height: 926,
            alt: 'Voice AI backend automation workflow',
            caption: 'Voice AI backend automation',
          },
        ],
      },
      {
        label: '04 / Results',
        heading: 'The call data shows the scale of the new coverage.',
        body: ['The July 2026 performance report records the volume Zuri handled and the types of demand entering the business.'],
        stats: [
          ['1,532', 'Total calls handled in July 2026'],
          ['938', 'Calls handled independently by Zuri'],
          ['1,172', 'Qualified leasing inquiries'],
          ['427', 'After-hours and weekend calls'],
        ],
        path: { label: 'The call path', steps: ['Call', 'Intent', 'Property or answer', 'Text link', 'Human follow-up when needed'] },
        note: 'The July report also records 334 qualified after-hours and weekend inquiries. Total after-hours and weekend volume and qualified leasing inquiries are reported separately.',
      },
      {
        label: '05 / Call demand',
        heading: 'Most callers were looking for a property.',
        body: ['Zuri was not handling abstract questions. The largest share of calls came from people actively looking for rental homes.'],
        stats: [
          ['43.5%', 'Property search: 667 calls about available properties and rental options'],
          ['20.4%', 'Section 8 and vouchers: 313 calls involving voucher questions and eligibility'],
          ['7.1%', 'Applications: 109 calls about applications or application status'],
          ['5.3%', 'Showings: 81 calls about appointments, showings, or property access'],
          ['61%', 'Independent handling: 938 of 1,532 calls required no human intervention'],
          ['24/7', 'Coverage: after-hours and weekend demand captured instead of waiting for the office to reopen'],
        ],
      },
      {
        label: '06 / Applicant workflow',
        heading: 'Rental application status became a communication workflow.',
        body: [
          'The application system moved status changes into a consistent email and text-message process, so applicants did not have to rely on a manual update each time something changed.',
        ],
        figures: [
          {
            kicker: 'Applicant status',
            heading: 'Each status had a next message.',
            body: 'When an applicant was deferred, rejected, approved, or withdrew, the workflow sent an email and a text message. Once an applicant was approved, the workflow moved into the next phase: reminders leading up to the move-in date after the lease was signed.',
            src: img('14lw_2ny579FqUaDx1TikxjNTEpEB3hAd'),
            width: 1988,
            height: 1280,
            alt: 'Rental application automation system',
            caption: 'Rental application automation system',
          },
          {
            kicker: 'Move-in follow-up',
            heading: 'Approval continued into move-in.',
            body: 'The second half of the workflow sent reminders as the new tenant approached the move-in date. The process connected the application decision to the work that followed it.',
            src: img('1tjhf0hnyECcgKfbOvo2ZDPQJpsH9e64j'),
            width: 2000,
            height: 905,
            alt: 'Move-in reminder workflow',
            caption: 'Move-in reminder workflow',
          },
        ],
      },
      {
        label: '07 / Property operations',
        heading: 'Utility work moved from a long chain of automations toward code and shared data.',
        body: [
          'The utility system began as a Make.com build with approximately 12 workflows. Later work moved toward Claude Code, scripts, a data pipeline, InsForge, and the Agent Workspace.',
        ],
        figures: [
          {
            kicker: 'Utility automation',
            heading: 'Billing logic became something the team could see and extend.',
            body: 'The system supports utility billing workflows for properties and tenants. It uses property and tenant data, applies the relevant billing logic, and creates a path for updates and notifications. The newer architecture connects the property management platform, CRM, and related business data through a pipeline into InsForge and the Agent Workspace.',
            src: img('1D2QF0m1APB-9scKdG_s210HX_8dpMAfR'),
            width: 2000,
            height: 969,
            alt: 'Agent Workspace utilities view',
            caption: 'Agent Workspace utilities view',
          },
        ],
      },
      {
        label: '08 / Additional workflows',
        heading: 'The operating system grew beyond one automation.',
        body: ['The Jackson work also included workflows for recurring property-management tasks and the visibility needed to keep improving them.'],
        items: [
          ['Tenant recertification', 'Recurring tenant and voucher-related work organized into a repeatable process.'],
          ['Surge notifications', 'Properties with water-bill increases above the defined 15% threshold were surfaced for review.'],
          ['Agent activity', 'Completed work can be written back to the Workspace so the team can see what happened.'],
          ['Agent skills', 'Reusable skills and instructions provide a place to improve how the system handles work.'],
          ['Email campaigns', 'Campaign work can be created programmatically and recorded in the Workspace.'],
          ['Shared context', 'Buildium, Zoho, Instagram, Section 8 information, and operations data can be viewed together.'],
        ],
        figures: [
          {
            kicker: 'Workspace activity',
            heading: 'The work now leaves a visible record.',
            body: 'The Agent Workspace provides a shared view of data, agent skills, activity, and completed work. That gives the team a place to inspect what happened instead of relying on disconnected automation histories.',
            src: img('1hmu-Fl_YKxr5KSZUNWwtc3et-QIyuemM'),
            width: 2000,
            height: 971,
            alt: 'Agent Workspace activity view',
            caption: 'Agent Workspace activity view',
          },
        ],
      },
      {
        label: '09 / Economics',
        heading: 'The business case starts with Jackson’s actual economics.',
        body: ['The following figures were provided directly by Jackson Rental Homes.'],
        columns: [
          {
            heading: 'Owner side',
            list: [
              'Management fee: 5% of collected monthly rent',
              'Average rent: approximately $1,600 per month',
              'Typical range: about $1,200 to $2,300',
              'Owner relationship: approximately 5 to 7 years',
              'Setup fee: none',
              'Placement fee: 75% of one month’s rent',
              'Estimated property lifetime value: $7,500 to $10,000',
            ],
          },
          {
            heading: 'Tenant side',
            list: [
              'Average stay: approximately 2 to 3 years',
              'Average rent: approximately $1,600 per month',
              'Serious inquiry to signed lease: approximately 20% to 25%',
              'Serious inquiries completing a showing: about 60% to 70%',
              'Tour to signed lease: approximately 35% to 45%',
            ],
          },
        ],
      },
      {
        label: '10 / The lesson',
        heading: 'The voice agent solved the first bottleneck. The Workspace made the next ones visible.',
        body: [
          'The work moved from answering calls to coordinating the business around the calls.',
          'Zuri created a reliable first response for rental demand. Applicant workflows kept people informed. Utility and property workflows reduced repeated work. The newer Workspace architecture created a shared place for the data, scripts, skills, and activity behind those systems.',
          'The result is not one isolated automation. It is a path from inbound demand to a more observable leasing and property-management operation.',
        ],
      },
      {
        label: '11 / What comes next',
        heading: 'Improve the handoffs that happen after the call.',
        body: ['The July report shows that the next opportunities are not only about answering more calls. They are about making the next step faster and more reliable.'],
        items: [
          ['Give callers more immediate options', 'Offer listings, open-house information, application guidance, or a confirmed callback request.'],
          ['Confirm the link arrived', 'Use phone verification and email backup when a caller does not receive a text.'],
          ['Expand self-service answers', 'Give voucher-related callers more complete information before human follow-up is needed.'],
          ['Keep property information current', 'Connect the agent to an updated listing source so every recommendation reflects current availability.'],
        ],
      },
    ],
    cta: {
      heading: 'More conversations answered. More work connected.',
      body: 'Jackson’s work with Pentridge shows how a service business can start with a practical voice agent and continue toward a connected operating system. Start with a 30-minute call about where your work gets stuck.',
    },
  },
};
