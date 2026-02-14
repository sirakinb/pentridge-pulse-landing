import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Phone, MessageSquare, Clock, Users, CheckCircle, Star } from 'lucide-react';
import BookingOptions from '../../components/BookingOptions';

const CityAIPhoneAnsweringPage = () => {
  const { city } = useParams();
  
  // Format city name for display
  const cityName = city ? city.charAt(0).toUpperCase() + city.slice(1).replace(/-/g, ' ') : '';
  
  // City-specific data (this could be moved to a separate config file)
  const cityData = {
    population: '500,000+',
    businesses: '15,000+',
    industries: ['Healthcare', 'Real Estate', 'Legal Services', 'Home Services', 'Retail']
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
              AI Phone Answering Services
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              AI Phone Answering Services in <span className="text-blue-600">{cityName}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your {cityName} business with intelligent AI phone answering that never misses a call. 
              24/7 professional call handling, appointment booking, and customer service automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BookingOptions />
              <Button variant="outline" size="lg" className="px-8">
                <Phone className="mr-2 h-5 w-5" />
                Call (555) 123-4567
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why {cityName} Businesses Choose Our AI Phone Answering
            </h2>
            <p className="text-lg text-gray-600">
              Join {cityData.businesses} businesses in {cityName} already using AI to enhance their customer service
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Clock className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>24/7 Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Never miss another call in {cityName}. Our AI answers every call, day or night, 
                  ensuring your business is always accessible to customers.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <MessageSquare className="h-12 w-12 mx-auto text-green-600 mb-4" />
                <CardTitle>Natural Conversations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Advanced AI technology that understands local {cityName} dialects and business needs, 
                  providing natural, professional conversations every time.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 mx-auto text-purple-600 mb-4" />
                <CardTitle>Lead Capture & Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Automatically capture leads, schedule appointments, and qualify prospects 
                  while you focus on serving {cityName} customers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Serving All Industries in {cityName}
            </h2>
            <p className="text-lg text-gray-600">
              Our AI phone answering adapts to your specific industry needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-6">
            {cityData.industries.map((industry, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <h3 className="font-semibold text-gray-900 mb-2">{industry}</h3>
                  <p className="text-sm text-gray-600">
                    Specialized AI responses for {industry.toLowerCase()} businesses
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-green-100 text-green-800">
                Advanced Features
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Complete AI Phone Solution for {cityName} Businesses
              </h2>
              <div className="space-y-4">
                {[
                  'Intelligent call routing and screening',
                  'Appointment scheduling integration',
                  'Customer information capture',
                  'Multi-language support',
                  'CRM integration',
                  'Real-time analytics and reporting',
                  'Custom scripts for your business',
                  'Seamless human handoff when needed'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <Card className="p-8">
                <div className="text-center">
                  <Phone className="h-16 w-16 mx-auto text-blue-600 mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Ready to Get Started?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Join businesses across {cityName} that have transformed their customer service with AI.
                  </p>
                  <div className="space-y-4">
                    <BookingOptions />
                    <p className="text-sm text-gray-500">
                      Free consultation • No setup fees • 30-day money-back guarantee
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What {cityName} Businesses Are Saying
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "The AI phone answering has been a game-changer for our {cityName} practice. 
                We never miss appointments anymore and our staff can focus on patient care."
              </p>
              <div className="font-semibold text-gray-900">
                Dr. Sarah Johnson - Medical Practice
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Our lead conversion has increased by 40% since implementing AI phone answering. 
                It's like having a perfect receptionist that never takes a break."
              </p>
              <div className="font-semibold text-gray-900">
                Mike Rodriguez - Home Services Company
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your {cityName} Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get started with AI phone answering today and never miss another opportunity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookingOptions />
            <Button variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Download Free Guide
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CityAIPhoneAnsweringPage;