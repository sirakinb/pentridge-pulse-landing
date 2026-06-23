import React, { useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowRight, CalendarCheck, CheckCircle2, ClipboardList, FileText, Gauge, ShieldCheck, Workflow } from 'lucide-react';
import Navbar from '../components/Navbar';
import MetaTags from '../components/MetaTags';
import { bookingUrl, getLawFirmPage, getRelatedPages, lawFirmNavLinks } from '../data/lawFirmAutomationPages';

const siteUrl = 'https://www.pentridgemedia.com';

const iconMap = {
  hub: Workflow,
  intake: ClipboardList,
  aiReceptionist: ShieldCheck,
  crm: Gauge,
  documents: CalendarCheck,
  video: FileText,
  checklist: CheckCircle2,
};

const labelForPage = (page) => page.eyebrow || page.h1;

const routeUrl = (path) => `${siteUrl}${path}`;

const schemaForPage = (page) => {
  const url = routeUrl(page.path);
  const organization = {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'Pentridge Media',
    url: siteUrl,
    email: 'aki.b@pentridgemedia.com',
    description: 'Pentridge Media builds practical AI workflow automation systems for service businesses and independent law firms.',
  };

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: page.h1, item: url },
    ],
  };

  const faq = page.faqs?.length
    ? {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: page.faqs.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: answer,
          },
        })),
      }
    : null;

  const webPage = {
    '@type': page.type === 'article' ? 'Article' : 'Service',
    '@id': `${url}#primary`,
    name: page.h1,
    headline: page.h1,
    description: page.description,
    url,
    provider: { '@id': `${siteUrl}/#organization` },
    publisher: { '@id': `${siteUrl}/#organization` },
    datePublished: '2026-06-22',
    dateModified: '2026-06-22',
    mainEntityOfPage: url,
  };

  if (page.type === 'service') {
    webPage.serviceType = ['AI workflow automation', 'Law firm automation'];
    webPage.areaServed = { '@type': 'Country', name: 'United States' };
    webPage.audience = {
      '@type': 'Audience',
      audienceType: 'Independent law firms',
    };
  }

  const video = page.video
    ? {
        '@type': 'VideoObject',
        '@id': `${url}#video`,
        name: page.video.title,
        description: page.description,
        thumbnailUrl: [page.video.thumbnailUrl],
        uploadDate: page.video.uploadDate,
        duration: page.video.duration,
        embedUrl: page.video.embedUrl,
        contentUrl: page.video.url,
        publisher: { '@id': `${siteUrl}/#organization` },
      }
    : null;

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, breadcrumb, webPage, faq, video].filter(Boolean),
  };
};

const LawFirmSchema = ({ page }) => {
  const schema = useMemo(() => schemaForPage(page), [page]);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

const Section = ({ section }) => {
  return (
    <section className="border-t border-white/10 py-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-5">{section.title}</h2>
      {section.body?.map((paragraph) => (
        <p key={paragraph} className="text-base md:text-lg text-slate-300 leading-8 mb-4">
          {paragraph}
        </p>
      ))}
      {section.bullets && (
        <ul className="grid gap-3 mt-5">
          {section.bullets.map((item) => (
            <li key={item} className="flex gap-3 text-slate-300 leading-7">
              <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-cyan-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
      {section.steps && (
        <ol className="grid gap-3 mt-5">
          {section.steps.map((item, index) => (
            <li key={item} className="flex gap-3 text-slate-300 leading-7">
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-md bg-cyan-400/15 text-sm font-semibold text-cyan-200">
                {index + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      )}
      {section.table && (
        <div className="mt-6 overflow-x-auto rounded-md border border-white/10">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead className="bg-white/5 text-slate-200">
              <tr>
                {section.table.headers.map((header) => (
                  <th key={header} className="px-4 py-3 font-semibold">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {section.table.rows.map((row) => (
                <tr key={row.join('|')}>
                  {row.map((cell) => (
                    <td key={cell} className="px-4 py-4 text-slate-300 align-top">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

const WorkflowDiagram = ({ items }) => {
  if (!items?.length) return null;
  return (
    <section className="py-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">How The Workflow Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((item, index) => (
          <div key={item} className="relative rounded-md border border-cyan-300/20 bg-cyan-300/10 p-4">
            <div className="text-xs font-mono uppercase tracking-[0.16em] text-cyan-200/70 mb-2">
              Step {index + 1}
            </div>
            <div className="text-white font-medium">{item}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const BeforeAfter = ({ rows }) => {
  if (!rows?.length) return null;
  return (
    <section className="border-t border-white/10 py-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">Before And After Workflow</h2>
      <div className="overflow-x-auto rounded-md border border-white/10">
        <table className="min-w-full divide-y divide-white/10 text-left text-sm">
          <thead className="bg-white/5 text-slate-200">
            <tr>
              <th className="px-4 py-3 font-semibold">Workflow area</th>
              <th className="px-4 py-3 font-semibold">Before</th>
              <th className="px-4 py-3 font-semibold">After</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.map(([area, before, after]) => (
              <tr key={area}>
                <td className="px-4 py-4 text-white font-medium align-top">{area}</td>
                <td className="px-4 py-4 text-slate-300 align-top">{before}</td>
                <td className="px-4 py-4 text-slate-300 align-top">{after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const SampleAutomations = ({ automations }) => {
  if (!automations?.length) return null;
  return (
    <section className="border-t border-white/10 py-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">Sample Automations</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {automations.map((automation) => (
          <div key={automation.trigger} className="rounded-md border border-white/10 bg-white/[0.04] p-5">
            <div className="text-xs font-mono uppercase tracking-[0.16em] text-cyan-200/70 mb-3">Trigger</div>
            <h3 className="text-lg font-semibold text-white mb-3">{automation.trigger}</h3>
            <p className="text-sm text-slate-300 mb-3"><span className="text-slate-100">Actions:</span> {automation.actions}</p>
            <p className="text-sm text-slate-300"><span className="text-slate-100">Output:</span> {automation.output}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Timeline = ({ items }) => {
  if (!items?.length) return null;
  return (
    <section className="border-t border-white/10 py-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">Implementation Timeline Ranges</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.scope} className="rounded-md border border-white/10 bg-slate-950 p-5">
            <div className="text-cyan-200 font-mono text-sm mb-2">{item.range}</div>
            <h3 className="text-lg font-semibold text-white mb-2">{item.scope}</h3>
            <p className="text-sm leading-6 text-slate-300">{item.details}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Needs = ({ items }) => {
  if (!items?.length) return null;
  return (
    <section className="border-t border-white/10 py-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">What Pentridge Needs From You</h2>
      <ul className="grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-slate-300 leading-7">
            <ClipboardList className="mt-1 h-5 w-5 flex-none text-amber-200" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

const Faqs = ({ faqs }) => {
  if (!faqs?.length) return null;
  return (
    <section className="border-t border-white/10 py-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
      <div className="grid gap-4">
        {faqs.map(([question, answer]) => (
          <div key={question} className="rounded-md border border-white/10 bg-white/[0.04] p-5">
            <h3 className="text-lg font-semibold text-white mb-2">{question}</h3>
            <p className="text-slate-300 leading-7">{answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const VideoEmbed = ({ video }) => {
  if (!video) return null;
  return (
    <section className="py-10">
      <div className="aspect-video overflow-hidden rounded-md border border-white/10 bg-black">
        <iframe
          className="h-full w-full"
          src={video.embedUrl}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </section>
  );
};

const ReadinessChecklist = ({ page }) => {
  const [answers, setAnswers] = useState({});
  const score = page.checklistQuestions.reduce((total, question) => total + (answers[question] || 0), 0);
  const answered = Object.keys(answers).length;
  const band = score <= 12 ? page.scoreBands[0] : score <= 24 ? page.scoreBands[1] : page.scoreBands[2];
  const choices = [
    { label: 'Not handled', value: 0 },
    { label: 'Partially handled', value: 2 },
    { label: 'Systematized', value: 3 },
  ];

  return (
    <section className="border-t border-white/10 py-10">
      <div className="mb-8 rounded-md border border-cyan-300/20 bg-cyan-300/10 p-5">
        <div className="font-mono text-sm uppercase tracking-[0.16em] text-cyan-200/80 mb-2">
          Current Score
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-5xl font-semibold text-white">{score}<span className="text-xl text-slate-400">/36</span></div>
            <p className="text-slate-300 mt-2">{answered} of {page.checklistQuestions.length} questions answered.</p>
          </div>
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold text-white">{band.title}</h2>
            <p className="text-slate-300 mt-2">{band.details}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {page.checklistQuestions.map((question, index) => (
          <div key={question} className="rounded-md border border-white/10 bg-white/[0.04] p-5">
            <div className="text-xs font-mono uppercase tracking-[0.16em] text-slate-400 mb-2">Question {index + 1}</div>
            <h2 className="text-lg font-semibold text-white mb-4">{question}</h2>
            <div className="grid gap-2 sm:grid-cols-3">
              {choices.map((choice) => {
                const selected = answers[question] === choice.value;
                return (
                  <button
                    type="button"
                    key={choice.label}
                    onClick={() => setAnswers((current) => ({ ...current, [question]: choice.value }))}
                    className={`rounded-md border px-4 py-3 text-left text-sm transition ${
                      selected
                        ? 'border-cyan-300 bg-cyan-300/15 text-white'
                        : 'border-white/10 bg-black/20 text-slate-300 hover:border-white/30'
                    }`}
                  >
                    {choice.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {page.scoreBands.map((item) => (
          <div key={item.range} className="rounded-md border border-white/10 bg-slate-950 p-5">
            <div className="text-cyan-200 font-mono text-sm mb-2">{item.range}</div>
            <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
            <p className="text-sm leading-6 text-slate-300">{item.details}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const RelatedPages = ({ page }) => {
  const related = getRelatedPages(page);
  if (!related.length) return null;
  return (
    <section className="border-t border-white/10 py-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">Related Workflows</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {related.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="group rounded-md border border-white/10 bg-white/[0.04] p-5 transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-mono uppercase tracking-[0.16em] text-cyan-200/70 mb-2">
                  {labelForPage(item)}
                </div>
                <h3 className="text-xl font-semibold text-white">{item.h1}</h3>
              </div>
              <ArrowRight className="h-5 w-5 flex-none text-slate-400 transition group-hover:text-cyan-200" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

const ClusterNav = () => (
  <div className="border-y border-white/10 bg-black/35">
    <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-3">
      {lawFirmNavLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className="whitespace-nowrap rounded-md border border-white/10 px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] text-slate-300 hover:border-cyan-300/40 hover:text-white"
        >
          {link.label}
        </Link>
      ))}
    </div>
  </div>
);

const LawFirmAutomationPage = ({ pageId }) => {
  const page = getLawFirmPage(pageId);

  if (!page) {
    return <Navigate to="/law-firm-automation/" replace />;
  }

  const Icon = iconMap[page.id] || Workflow;

  return (
    <div className="min-h-screen bg-[#080c10] text-white">
      <MetaTags
        title={page.title}
        description={page.description}
        keywords={page.keywords}
        canonicalUrl={routeUrl(page.path)}
        pageType={page.type === 'article' ? 'article' : 'website'}
      />
      <LawFirmSchema page={page} />
      <Navbar />

      <main className="pt-24">
        <ClusterNav />
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="max-w-5xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-md border border-cyan-300/20 bg-cyan-300/10 px-4 py-2">
              <Icon className="h-4 w-4 text-cyan-200" />
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-100/80">{page.eyebrow}</span>
            </div>
            <h1 className="max-w-5xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
              {page.h1}
            </h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300 md:text-xl">
              {page.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center justify-center gap-2">
                {page.cta} <ArrowRight className="h-4 w-4" />
              </a>
              {page.secondaryCta && (
                <Link to={page.secondaryCta.path} className="btn-outline inline-flex items-center justify-center">
                  {page.secondaryCta.label}
                </Link>
              )}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 pb-20">
          <VideoEmbed video={page.video} />
          <WorkflowDiagram items={page.workflowDiagram} />
          {page.sections?.map((section) => <Section key={section.title} section={section} />)}
          {page.checklistQuestions && <ReadinessChecklist page={page} />}
          <BeforeAfter rows={page.beforeAfter} />
          <SampleAutomations automations={page.sampleAutomations} />
          <Timeline items={page.timeline} />
          <Needs items={page.needs} />
          <Faqs faqs={page.faqs} />
          <RelatedPages page={page} />

          <section className="mt-6 rounded-md border border-cyan-300/20 bg-cyan-300/10 p-6 md:p-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-semibold text-white">Book a Law Firm Automation Audit</h2>
              <p className="mt-3 text-slate-300 leading-7">
                Bring the workflow that feels messy today. Pentridge will map the bottleneck, identify the first practical automation, and give you a custom implementation path.
              </p>
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 inline-flex items-center gap-2">
                Book The Audit <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LawFirmAutomationPage;
