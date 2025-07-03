import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';

// Environment variables
const PLACEHOLDER_LOGO = '/assets/logo.png';
const VITE_STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const VITE_API_URL = import.meta.env.VITE_API_URL;
const stripePromise = loadStripe(VITE_STRIPE_PUBLISHABLE_KEY);

// Features data
const features = [
  { title: 'Instant SMS Confirmation', desc: 'Send automated booking texts and confirmations instantly.' },
  { title: 'Calendar Sync', desc: 'Seamlessly integrate with Google Calendar and Outlook.' },
  { title: 'Multi-Agent Support', desc: 'Manage multiple teams or locations effortlessly.' },
  { title: 'Analytics Dashboard', desc: 'Track key metrics like no-shows and confirmations.' }
];

// Testimonials data
const testimonials = [
  { name: 'Smog Shop', logo: PLACEHOLDER_LOGO, quote: 'Our bookings jumped 40% with instant text confirmations!' },
  { name: 'Tire Shop', logo: PLACEHOLDER_LOGO, quote: 'Customers love the fast SMS follow-up—no more missed leads.' },
  { name: 'HVAC Services', logo: PLACEHOLDER_LOGO, quote: 'Simple setup, polished results—workflow’s never been smoother!' },
  { name: 'Local Plumber', logo: PLACEHOLDER_LOGO, quote: 'Saved us hours weekly and boosted sales—highly recommend!' }
];

export default function HomePage() {
  const [selectedPlan, setSelectedPlan] = useState('');

  const scrollToContact = (plan) => {
    setSelectedPlan(plan);
    const section = document.getElementById('contact');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const PlanButton = ({ label, plan, className }) => (
    <button
      onClick={() => scrollToContact(plan)}
      className={`${className} font-semibold rounded hover:opacity-90 transition-opacity`}
    >
      {label}
    </button>
  );

  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* Navbar */}
      <header className="sticky top-0 bg-white bg-opacity-95 backdrop-blur-sm shadow-md z-50">
        <div className="container mx-auto flex flex-col py-4 px-4">
          {/* Mobile Row1 & Desktop all */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={PLACEHOLDER_LOGO} alt="Company Logo" className="h-16 md:h-20 w-auto" />
              <div>
                <span className="text-2xl font-bold text-blue-600">Personalized AI Solutions</span>
                <p className="text-sm text-gray-500">for Small & Micro Businesses</p>
              </div>
            </div>
            {/* Desktop CTA */}
            <div className="hidden md:block">
              <PlanButton label="Get Started" plan="single-agent" className="px-5 py-2 bg-teal-500 text-white" />
            </div>
          </div>
          {/* Mobile Row2: Features, Pricing, Contact, About Us */}
          <nav className="mt-4 flex justify-around md:hidden">
            <a href="#features" onClick={() => scrollToContact('')} className="hover:text-teal-500 transition">Features</a>
            <a href="#pricing" className="hover:text-teal-500 transition">Pricing</a>
            <a href="#contact" className="hover:text-teal-500 transition">Contact</a>
            <a href="/about" className="hover:text-teal-500 transition">About Us</a>
          </nav>
          {/* Mobile Row3: How It Works */}
          <nav className="mt-2 flex justify-around md:hidden">
            <a href="/how-it-works" className="hover:text-teal-500 transition">How It Works</a>
          </nav>
          {/* Mobile Row4 CTA */}
          <div className="mt-4 flex justify-center md:hidden">
            <PlanButton label="Get Started" plan="single-agent" className="px-5 py-2 bg-teal-500 text-white" />
          </div>
          {/* Desktop Nav */}
          <div className="mt-4 hidden md:flex md:items-center md:justify-center md:space-x-6">
            <a href="#features" onClick={() => scrollToContact('')} className="hover:text-teal-500 transition">Features</a>
            <a href="#pricing" className="hover:text-teal-500 transition">Pricing</a>
            <a href="/how-it-works" className="hover:text-teal-500 transition">How It Works</a>
            <a href="/about" className="hover:text-teal-500 transition">About Us</a>
            <a href="#contact" className="hover:text-teal-500 transition">Contact</a>
            <PlanButton label="Get Started" plan="single-agent" className="ml-4 px-5 py-2 bg-teal-500 text-white" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-50 via-blue-50 to-indigo-50 py-20">
        <div className="container mx-auto text-center px-4">
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            AI-Powered Text-Back & Booking
          </motion.h1>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Ensure <span className="font-semibold text-teal-500">you never miss a sale</span>—automate SMS confirmations and streamline bookings.
          </p>
          <PlanButton label="Start at $99/mo" plan="single-agent" className="mt-4 px-8 py-3 bg-gradient-to-r from-teal-400 to-blue-400 text-white rounded-full" />
        </div>
      </section>

      {/* ...rest of page unchanged... */}
    </div>
  );
}