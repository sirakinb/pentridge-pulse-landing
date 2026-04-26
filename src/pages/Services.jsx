import React from 'react';
import Navbar from '../components/Navbar';
import MetaTags from '../components/MetaTags';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, CalendarClock, ClipboardList, FileText, Phone, Workflow } from 'lucide-react';

const services = [
  {
    title: 'Workflow Automation Audit',
    description: 'Map the manual workflows costing time and identify the first automations worth building.',
    icon: ClipboardList,
    color: 'bg-purple-600',
    action: '/contact',
  },
  {
    title: 'AI Voice Agents',
    description: 'Answer calls, qualify leads, book appointments, and trigger the next workflow step.',
    icon: Phone,
    color: 'bg-violet-600',
    action: '/services/ai-voice-agents',
  },
  {
    title: 'Lead Capture & Follow-Up Automation',
    description: 'Turn form fills, missed calls, and inquiries into instant SMS, email, booking, and CRM actions.',
    icon: CalendarClock,
    color: 'bg-pink-600',
    action: '/resources/ai-process-automation-examples',
  },
  {
    title: 'CRM & Operations Automation',
    description: 'Connect your CRM, calendar, inbox, documents, and internal tasks so data moves automatically.',
    icon: Workflow,
    color: 'bg-blue-600',
    action: '/resources/ai-process-automation-examples',
  },
  {
    title: 'Document, Proposal & Reporting Automation',
    description: 'Generate proposals, reports, summaries, and admin documents from structured workflow inputs.',
    icon: FileText,
    color: 'bg-emerald-600',
    action: '/resources/ai-process-automation-examples',
  },
  {
    title: 'Custom Internal Tools',
    description: 'Build dashboards, portals, MVPs, and internal apps when off-the-shelf automation is not enough.',
    icon: Bot,
    color: 'bg-orange-600',
    action: 'https://build.pentridgemedia.com',
    external: true,
  },
];

const Services = () => {
  const openAction = (service) => {
    if (service.external) {
      window.open(service.action, '_blank', 'noopener,noreferrer');
      return;
    }

    window.location.href = service.action;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      <MetaTags
        title="AI Workflow Automation Services | Pentridge"
        description="Automate manual business workflows with AI voice agents, CRM automation, lead follow-up, document automation, integrations, and custom internal tools."
        keywords="AI workflow automation services, AI voice agents, CRM automation, lead follow-up automation, document automation, custom internal tools"
        canonicalUrl="https://pentridgemedia.com/services"
      />
      <Navbar />

      <section className="pt-32 pb-16 md:pb-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-purple-200/70 mb-4">
              AI Workflow Automation Services
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6">
              AI workflow automation services for growing businesses.
            </h1>
            <p className="text-lg md:text-xl text-purple-200 mb-8 max-w-4xl mx-auto px-4">
              We find the manual workflows costing you time, then build AI systems that automate them across your calls, CRM, calendar, inbox, documents, and internal tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://cal.com/akinyemi-bajulaiye-2jua88/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block"
              >
                Book an Automation Audit
              </a>
              <a href="/resources/ai-process-automation-examples" className="btn-outline inline-block">
                See Automation Examples
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                >
                  <Card className="h-full bg-purple-400/30 backdrop-blur-xl border border-purple-300/50 text-white hover:bg-purple-400/40 transition-all duration-300" style={{backgroundColor: 'rgba(168, 85, 247, 0.3)', borderColor: 'rgba(196, 181, 253, 0.5)'}}>
                    <CardHeader className="text-center">
                      <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl text-white">{service.title}</CardTitle>
                      <CardDescription className="text-purple-200">
                        AI workflow automation module
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-purple-100 mb-6">
                        {service.description}
                      </p>
                      <Button
                        variant="outline"
                        className="border-white text-white hover:bg-white hover:text-purple-600"
                        onClick={() => openAction(service)}
                      >
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
              Not sure where to start?
            </h2>
            <p className="text-lg md:text-xl text-purple-200 mb-8 px-4">
              Pick three workflows that feel manual today. We will map the automation plan, integrations, and first implementation path.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => window.location.href = '/contact'}
              >
                Request Automation Audit
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-purple-600"
                onClick={() => window.location.href = '/roi-calculator'}
              >
                Calculate ROI
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
