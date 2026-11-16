import React from 'react';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import MetaTags from '../components/MetaTags';
import { caseStudies } from '../data/caseStudies';
import { SITE_URL } from '../lib/public-seo-routes';

const BOOKING_URL = 'https://cal.com/akinyemi-bajulaiye-2jua88/30min';

const Label = ({ children }) => (
  <p className="font-mono text-xs tracking-[0.2em] uppercase text-purple-400 mb-4">{children}</p>
);

const Path = ({ path }) => (
  <div className="mt-8">
    <p className="font-mono text-xs tracking-[0.2em] uppercase text-white/40 mb-3">{path.label}</p>
    <ol className="flex flex-wrap items-center gap-2 text-sm">
      {path.steps.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          <span className="rounded-full border border-white/15 px-3 py-1 text-white/80">{step}</span>
          {i < path.steps.length - 1 && <span aria-hidden="true" className="text-white/30">→</span>}
        </li>
      ))}
    </ol>
  </div>
);

const Section = ({ section }) => (
  <section className="border-t border-white/10 pt-12">
    <Label>{section.label}</Label>
    <h2 className="font-display text-2xl md:text-[34px] leading-[1.25] text-[#fafafa] mb-6">{section.heading}</h2>

    {section.body?.map((p) => (
      <p key={p.slice(0, 40)} className="text-white/60 leading-relaxed mb-4">{p}</p>
    ))}

    {section.client && (
      <div className="glass-card rounded-2xl p-6 md:p-8 mt-6">
        <h3 className="text-white font-semibold mb-2">The client</h3>
        <p className="text-white/60 leading-relaxed mb-6">{section.client}</p>
        <dl className="grid sm:grid-cols-2 gap-4">
          {section.facts.map(([k, v]) => (
            <div key={k}>
              <dt className="font-mono text-xs tracking-[0.15em] uppercase text-white/40">{k}</dt>
              <dd className="text-white/80 mt-1">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    )}

    {section.beforeAfter && (
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {[
          [section.beforeAfter.beforeLabel, section.beforeAfter.before, 'glass-card'],
          [section.beforeAfter.afterLabel, section.beforeAfter.after, 'glass-card-purple'],
        ].map(([label, list, card]) => (
          <div key={label} className={`${card} rounded-2xl p-6`}>
            <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-white/50 mb-4">{label}</h3>
            <ul className="space-y-3 text-white/70 text-sm leading-relaxed list-disc pl-5">
              {list.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    )}

    {section.stats && (
      <ul className="grid sm:grid-cols-2 gap-4 mt-6">
        {section.stats.map(([value, label]) => (
          <li key={label} className="glass-card rounded-2xl p-6">
            <p className="font-display text-3xl text-white">{value}</p>
            <p className="text-white/60 text-sm mt-2 leading-relaxed">{label}</p>
          </li>
        ))}
      </ul>
    )}

    {section.items && (
      <ol className="grid sm:grid-cols-2 gap-4 mt-6">
        {section.items.map(([title, text], i) => (
          <li key={title} className="glass-card rounded-2xl p-6">
            <span className="font-mono text-xs text-white/30">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="text-white font-semibold mt-2 mb-2">{title}</h3>
            <p className="text-white/60 text-sm leading-relaxed">{text}</p>
          </li>
        ))}
      </ol>
    )}

    {section.steps && (
      <ol className="space-y-3 mt-2">
        {section.steps.map((step, i) => (
          <li key={step} className="flex gap-4 text-white/70">
            <span className="font-mono text-xs text-purple-400 pt-1">{String(i + 1).padStart(2, '0')}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    )}

    {section.columns && (
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {section.columns.map((col) => (
          <div key={col.heading} className="glass-card rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4">{col.heading}</h3>
            <ul className="space-y-2 text-white/70 text-sm leading-relaxed list-disc pl-5">
              {col.list.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    )}

    {section.path && <Path path={section.path} />}

    {section.note && <p className="text-white/40 text-sm leading-relaxed mt-6">{section.note}</p>}

    {section.figures?.map((fig) => (
      <figure key={fig.src} className="mt-10">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-pink-400 mb-2">{fig.kicker}</p>
        <h3 className="text-white text-xl font-semibold mb-3">{fig.heading}</h3>
        <p className="text-white/60 leading-relaxed mb-6">{fig.body}</p>
        <img
          src={fig.src}
          alt={fig.alt}
          loading="lazy"
          decoding="async"
          className="w-full h-auto rounded-xl border border-white/10 bg-white/5"
        />
        <figcaption className="text-white/40 text-sm mt-3">{fig.caption}</figcaption>
      </figure>
    ))}
  </section>
);

const CaseStudyPage = ({ type }) => {
  const item = caseStudies[type];
  if (!item) return null;

  const url = `${SITE_URL}${item.path}`;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: item.headline,
    description: item.description,
    url,
    mainEntityOfPage: url,
    author: { '@type': 'Organization', name: 'Pentridge', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Pentridge', url: SITE_URL },
  };

  return (
    <main className="bg-black text-white min-h-screen">
      <MetaTags title={item.title} description={item.description} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Navbar />

      <article className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        <header className="mb-14">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/40 mb-4">{item.eyebrow}</p>
          <h1 className="font-display text-4xl md:text-[46px] leading-[1.15] text-[#fafafa] mb-6">{item.headline}</h1>
          <p className="text-white/70 text-lg leading-relaxed mb-8">{item.dek}</p>
          <div className="glass-card-purple rounded-2xl p-6">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-purple-300 mb-2">The starting point</p>
            <p className="text-white/80 leading-relaxed">{item.startingPoint}</p>
          </div>
        </header>

        <div className="space-y-14">
          {item.sections.map((section) => <Section key={section.label} section={section} />)}
        </div>

        <aside className="glass-card-purple rounded-2xl p-8 md:p-12 mt-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-purple-300 mb-4">The next engagement</p>
          <h2 className="font-display text-2xl md:text-[34px] leading-[1.25] text-[#fafafa] mb-4">{item.cta.heading}</h2>
          <p className="text-white/70 leading-relaxed mb-8">{item.cta.body}</p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 font-medium hover:bg-white/90 transition-colors"
          >
            Book a 30-minute call <ArrowRight size={18} />
          </a>
        </aside>
      </article>
    </main>
  );
};

export default CaseStudyPage;
