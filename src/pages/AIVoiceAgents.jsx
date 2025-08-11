import React, { useMemo, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from '../components/Navbar';
import { Phone, Clock, Users, TrendingUp, CheckCircle, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Slider } from "@/components/ui/slider";

const AIVoiceAgents = () => {
  const features = [
    {
      icon: <Phone className="h-8 w-8 text-violet-400" />,
      title: "24/7 Availability",
      description: "Never miss a call again. Our AI voice agents work around the clock to answer customer inquiries."
    },
    {
      icon: <Users className="h-8 w-8 text-violet-400" />,
      title: "Natural Conversations",
      description: "Advanced AI technology that understands context and responds naturally to customer questions."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-violet-400" />,
      title: "Lead Qualification",
      description: "Automatically qualify leads and schedule appointments with qualified prospects."
    },
    {
      icon: <Clock className="h-8 w-8 text-violet-400" />,
      title: "Instant Response",
      description: "Reduce wait times to zero with immediate AI-powered responses to customer calls."
    }
  ];

  const benefits = [
    "Reduce operational costs by up to 70%",
    "Increase customer satisfaction scores",
    "Capture more leads outside business hours",
    "Scale your customer service instantly",
    "Integrate with your existing CRM systems",
    "Custom voice and personality training"
  ];

  const useCases = [
    {
      industry: "Healthcare",
      description: "Appointment scheduling, patient inquiries, and prescription refill requests"
    },
    {
      industry: "Property Management",
      description: "Tenant inquiries, maintenance requests, leasing qualification, and showing scheduling"
    },
    {
      industry: "Professional Services",
      description: "Consultation booking, service inquiries, intake, and client support"
    }
  ];

  // Calculator state
  const [hourlyRate, setHourlyRate] = useState(50); // $/hour value of staff time
  const [callsPerDay, setCallsPerDay] = useState(30);
  const [minutesSavedPerCall, setMinutesSavedPerCall] = useState(2);
  const [workingDaysPerMonth, setWorkingDaysPerMonth] = useState(22);

  const hoursSavedPerMonth = useMemo(() => {
    return (callsPerDay * minutesSavedPerCall * workingDaysPerMonth) / 60;
  }, [callsPerDay, minutesSavedPerCall, workingDaysPerMonth]);

  const moneySavedPerMonth = useMemo(() => {
    return hoursSavedPerMonth * hourlyRate;
  }, [hoursSavedPerMonth, hourlyRate]);

  const moneySavedPerYear = useMemo(() => moneySavedPerMonth * 12, [moneySavedPerMonth]);

  // Dial configuration
  const gaugeMax = 20000; // cap for the dial visualization (monthly)
  const gaugePct = Math.min(100, Math.round((moneySavedPerMonth / gaugeMax) * 100));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B10] via-[#0D0F14] to-[#111827] text-slate-100">
      <Navbar variant="dark" />
      
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-violet-900/30 text-violet-300 hover:bg-violet-900/40">
            AI Voice Technology
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            AI Voice Agents That Never Sleep
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Transform your phone system with intelligent AI voice agents that handle customer calls, 
            qualify leads, and provide 24/7 support with human-like conversations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white" onClick={() => window.open('https://tally.so/r/3NBGBl', '_blank')}>
              Book Call <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" onClick={() => window.open('https://tally.so/r/wgo8Rl', '_blank')}>
              Request Case Study
            </Button>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Why Choose Our AI Voice Agents?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow bg-slate-900 border-slate-800">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Savings Calculator */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Voice AI Savings Calculator</CardTitle>
              <CardDescription className="text-slate-300">
                Estimate hours and money saved per month by handling routine calls with AI.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-10">
                {/* Controls */}
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-300">Hourly value of time ($/hr)</span>
                      <span className="text-sm text-white font-medium">${hourlyRate}</span>
                    </div>
                    <Slider value={[hourlyRate]} min={10} max={300} step={5} onValueChange={(v)=>setHourlyRate(v[0])} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-300">Calls per day handled by AI</span>
                      <span className="text-sm text-white font-medium">{callsPerDay}</span>
                    </div>
                    <Slider value={[callsPerDay]} min={0} max={200} step={5} onValueChange={(v)=>setCallsPerDay(v[0])} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-300">Average minutes saved per call</span>
                      <span className="text-sm text-white font-medium">{minutesSavedPerCall} min</span>
                    </div>
                    <Slider value={[minutesSavedPerCall]} min={0} max={15} step={1} onValueChange={(v)=>setMinutesSavedPerCall(v[0])} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-300">Working days per month</span>
                      <span className="text-sm text-white font-medium">{workingDaysPerMonth}</span>
                    </div>
                    <Slider value={[workingDaysPerMonth]} min={16} max={26} step={1} onValueChange={(v)=>setWorkingDaysPerMonth(v[0])} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                      <div className="text-sm text-slate-400">Hours saved/month</div>
                      <div className="text-2xl font-semibold text-white">{hoursSavedPerMonth.toFixed(1)} h</div>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                      <div className="text-sm text-slate-400">Hours saved/year</div>
                      <div className="text-2xl font-semibold text-white">{(hoursSavedPerMonth*12).toFixed(1)} h</div>
                    </div>
                  </div>
                </div>
                {/* Dial */}
                <div className="flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(#8b5cf6 ${gaugePct}%, rgba(255,255,255,0.08) ${gaugePct}% 100%)`
                      }}
                    />
                    <div className="absolute inset-4 rounded-full bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center">
                      <div className="text-xs uppercase tracking-wide text-slate-400">Monthly Savings</div>
                      <div className="text-3xl font-bold text-white mt-1">${moneySavedPerMonth.toLocaleString(undefined,{maximumFractionDigits:0})}</div>
                      <div className="text-xs text-slate-500 mt-2">Annual: ${moneySavedPerYear.toLocaleString(undefined,{maximumFractionDigits:0})}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Benefits Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="bg-slate-900 rounded-2xl p-8 md:p-12 border border-slate-800">
            <h2 className="text-3xl font-bold text-center text-white mb-8">
              Key Benefits
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-slate-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Use Cases Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Perfect for Every Industry
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">{useCase.industry}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300">{useCase.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Testimonial removed by request */}

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Phone System?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses already using AI voice agents to improve customer service 
            and capture more leads.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-violet-600 hover:bg-violet-700 text-white"
              onClick={() => window.open('https://tally.so/r/3NBGBl', '_blank')}
            >
              Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" onClick={() => window.open('https://tally.so/r/wgo8Rl', '_blank')}>
              Request Case Study
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIVoiceAgents;
