import React from 'react';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';

// Environment variables
const PLACEHOLDER_LOGO = '/assets/logo.png'; // logo saved under public/assets/logo.png
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
  const handleCheckout = async (plan) => {
    try {
      const stripe = await stripePromise;
      const res = await fetch(`${VITE_API_URL}/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan })
      });
      const { sessionId } = await res.json();
      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      console.error('Checkout error:', err);
    }
  };

  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* Navbar */}
      <header className="container mx-auto flex items-center justify-between py-6 px-4 md:px-0">
        <div className="flex items-center space-x-3">
          <img
            src={PLACEHOLDER_LOGO}
            alt="Company Logo"
            className="h-10 w-auto"
          />
          <div>
            <span className="text-2xl font-bold text-blue-600">Personalized AI Solutions</span>
            <p className="text-sm text-gray-500">for Small &amp; Micro Businesses</p>
          </div>
        </div>
        <nav className="space-x-6 text-gray-600">
          <a href="#features" className="hover:text-teal-500 transition">Features</a>
          <a href="#pricing" className="hover:text-teal-500 transition">Pricing</a>
          <a href="#contact" className="hover:text-teal-500 transition">Contact</a>
          <button
            onClick={() => handleCheckout('single-agent')}
            className="px-4 py-2 bg-teal-400 text-white rounded hover:bg-teal-500 transition"
          >
            Get Started
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-50 via-blue-50 to-indigo-50 py-20">
        <div className="container mx-auto text-center px-4">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
          >
            AI-Powered Text-Back & Booking
          </motion.h1>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Ensure <span className="font-semibold text-teal-500">you never miss a sale</span>—automate SMS confirmations and streamline bookings.
          </p>
          <button
            onClick={() => handleCheckout('single-agent')}
            className="mt-4 px-8 py-3 bg-gradient-to-r from-teal-400 to-blue-400 text-white rounded-full hover:opacity-90 transition-opacity"
          >
            Start at $99/mo
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 container mx-auto px-4 md:px-0">
        <h2 className="text-3xl font-bold text-center text-teal-500 mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 bg-teal-100 text-teal-500 flex items-center justify-center rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 py-16">
        <div className="container mx-auto text-center px-4 md:px-0">
          <h2 className="text-3xl font-bold text-teal-500 mb-4">Pricing Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Single Agent */}
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-2xl font-semibold mb-4 text-teal-500">Single Agent</h3>
              <p className="text-4xl font-bold mb-4 text-gray-900">$99/mo</p>
              <ul className="text-gray-600 mb-6 space-y-2 text-left">
                <li>1 AI Text-Back Agent</li>
                <li>Unlimited SMS Confirmations</li>
                <li>Calendar Sync</li>
              </ul>
              <button
                onClick={() => handleCheckout('single-agent')}
                className="w-full py-3 bg-teal-500 text-white rounded hover:opacity-90 transition-opacity"
              >
                Choose Plan
              </button>
            </div>
            {/* Multi-Agent */}
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-2xl font-semibold mb-4 text-blue-500">Multi-Agent</h3>
              <p className="text-4xl font-bold mb-4 text-gray-900">$199/mo</p>
              <ul className="text-gray-600 mb-6 space-y-2 text-left">
                <li>Up to 5 AI Agents</li>
                <li>Team Collaboration</li>
                <li>Priority Support</li>
              </ul>
              <button
                onClick={() => handleCheckout('multi-agent')}
                className="w-full py-3 bg-blue-500 text-white rounded hover:opacity-90 transition-opacity"
              >
                Choose Plan
              </button>
            </div>
            {/* Enterprise */}
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-2xl font-semibold mb-4 text-orange-500">Enterprise</h3>
              <p className="text-2xl font-bold mb-4 text-gray-900">Custom Pricing</p>
              <p className="text-gray-600 mb-6">Volume discounts &amp; custom integrations</p>
              <button
                onClick={() => window.location.href = '#contact'}
                className="w-full py-3 bg-orange-500 text-white rounded hover:opacity-90 transition-opacity"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 container mx-auto px-4 md:px-0">
        <h2 className="text-3xl font-bold text-center text-purple-500 mb-8">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-6">
              <p className="italic text-gray-700 mb-4">“{t.quote}”</p>
              <div className="flex items-center justify-center">
                <img src={t.logo} alt={t.name} className="h-8 w-8 rounded-full mr-2" />
                <span className="font-semibold text-gray-900">{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-50 py-16">
        <div className="container mx-auto text-center px-4 md:px-0">
          <h2 className="text-3xl font-bold text-purple-500 mb-4">Ready to Get Started?</h2>
          <form action="/api/leads" method="POST" className="max-w-md mx-auto grid grid-cols-1 gap-4">
            <input name="name" placeholder="Name" className="w-full p-3 border border-gray-300 rounded-lg" required />
            <input name="business" placeholder="Business Name" className="w-full p-3 border border-gray-300 rounded-lg" required />
            <input name="industry" placeholder="Industry (e.g., Tire Shop)" className="w-full p-3 border border-gray-300 rounded-lg" required />
            <input type="email" name="email" placeholder="Email" className="w-full p-3 border border-gray-300 rounded-lg" required />
            <input name="phone" placeholder="Phone" className="w-full p-3 border border-gray-300 rounded-lg" required />
            <button type="submit" className="py-3 bg-purple-500 text-white rounded hover:bg-purple-600 transition">Submit</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-white text-center text-gray-500">&copy; {new Date().getFullYear()} Personalized AI Solutions</footer>
    </div>
  );
}
