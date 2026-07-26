'use client';

import Link from 'next/link';
import { Send, MapPin, Mail, Phone, MessageSquare, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How long does shipping take?",
      a: "Standard shipping typically takes 3-5 business days within the domestic US. International shipping can take 7-14 business days. Expedited options are available at checkout."
    },
    {
      q: "What is your return policy?",
      a: "We accept returns within 14 days of delivery for unworn items with all original tags attached. Custom pieces and sale items are final sale."
    },
    {
      q: "Do you offer custom sizing?",
      a: "Yes, we offer custom sizing for select pieces. Please reach out to our team using the contact form below with your measurements, and we will guide you through the process."
    },
    {
      q: "How can I track my order?",
      a: "Once your order has shipped, you will receive an email with a tracking number and a link to monitor its progress."
    }
  ];

  return (
    <div className="bg-brand-offwhite min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-brand-pink-50/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-pink-100 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-purple-100 rounded-full blur-3xl opacity-60 translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="max-w-3xl w-full mx-auto px-6 text-center relative z-10">
          <span className="text-xs font-bold tracking-[0.3em] text-brand-pink-500 uppercase mb-4 block">
            We're here for you
          </span>
          <h1 className="font-heading text-5xl md:text-6xl text-brand-charcoal mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-brand-charcoal/60 font-light leading-relaxed max-w-xl mx-auto">
            Whether you have a question about our collections, need styling advice, or want to inquire about a custom piece, we'd love to hear from you.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-brand-pink-50 h-full">
              <h3 className="font-heading text-3xl text-brand-charcoal mb-8">Contact Information</h3>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-pink-50 flex items-center justify-center shrink-0 text-brand-pink-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold tracking-widest text-brand-charcoal uppercase mb-1">Email Us</p>
                    <p className="text-brand-charcoal/60 font-light text-lg">hello@20julyshop.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-pink-50 flex items-center justify-center shrink-0 text-brand-pink-500">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold tracking-widest text-brand-charcoal uppercase mb-1">Call Us</p>
                    <p className="text-brand-charcoal/60 font-light text-lg">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-pink-50 flex items-center justify-center shrink-0 text-brand-pink-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold tracking-widest text-brand-charcoal uppercase mb-1">Visit Us</p>
                    <p className="text-brand-charcoal/60 font-light text-lg">123 Fashion Avenue<br/>New York, NY 10012</p>
                  </div>
                </div>
              </div>

              <h3 className="font-heading text-2xl text-brand-charcoal mb-6 border-t border-brand-pink-50 pt-8">Social Channels</h3>
              <div className="grid grid-cols-2 gap-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center justify-center p-6 bg-brand-offwhite rounded-2xl border border-brand-pink-50 hover:border-[#1877F2] hover:bg-[#1877F2]/5 transition-all duration-300"
                >
                  <svg className="w-8 h-8 mb-3 text-brand-charcoal/40 group-hover:text-[#1877F2] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="font-medium text-sm text-brand-charcoal group-hover:text-[#1877F2] transition-colors">Facebook</span>
                </a>
                <a 
                  href="https://tiktok.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center justify-center p-6 bg-brand-offwhite rounded-2xl border border-brand-pink-50 hover:border-black hover:bg-black/5 transition-all duration-300"
                >
                  <MessageSquare className="w-8 h-8 mb-3 text-brand-charcoal/40 group-hover:text-black transition-colors" />
                  <span className="font-medium text-sm text-brand-charcoal group-hover:text-black transition-colors">TikTok</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl shadow-brand-pink-100/50 border border-brand-pink-100">
              <h3 className="font-heading text-3xl text-brand-charcoal mb-2">Send a Message</h3>
              <p className="text-brand-charcoal/60 font-light mb-8">We aim to respond to all inquiries within 24 hours.</p>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold tracking-widest text-brand-charcoal uppercase">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      placeholder="Jane Doe"
                      className="w-full bg-brand-offwhite border border-brand-pink-50 rounded-xl px-5 py-4 text-brand-charcoal placeholder:text-brand-charcoal/30 focus:outline-none focus:border-brand-pink-400 focus:ring-1 focus:ring-brand-pink-400 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold tracking-widest text-brand-charcoal uppercase">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      placeholder="jane@example.com"
                      className="w-full bg-brand-offwhite border border-brand-pink-50 rounded-xl px-5 py-4 text-brand-charcoal placeholder:text-brand-charcoal/30 focus:outline-none focus:border-brand-pink-400 focus:ring-1 focus:ring-brand-pink-400 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-bold tracking-widest text-brand-charcoal uppercase">Subject</label>
                  <div className="relative">
                    <select 
                      id="subject"
                      className="w-full bg-brand-offwhite border border-brand-pink-50 rounded-xl px-5 py-4 text-brand-charcoal appearance-none focus:outline-none focus:border-brand-pink-400 focus:ring-1 focus:ring-brand-pink-400 transition-all"
                    >
                      <option value="">Select a subject</option>
                      <option value="order">Order Inquiry</option>
                      <option value="sizing">Sizing & Fit</option>
                      <option value="returns">Returns & Exchanges</option>
                      <option value="other">Other</option>
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-charcoal/40 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-bold tracking-widest text-brand-charcoal uppercase">Message</label>
                  <textarea 
                    id="message" 
                    rows={6}
                    placeholder="How can we help you?"
                    className="w-full bg-brand-offwhite border border-brand-pink-50 rounded-xl px-5 py-4 text-brand-charcoal placeholder:text-brand-charcoal/30 focus:outline-none focus:border-brand-pink-400 focus:ring-1 focus:ring-brand-pink-400 transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 bg-brand-charcoal text-white rounded-xl font-medium tracking-widest uppercase hover:bg-brand-pink-600 transition-all duration-300 shadow-lg shadow-brand-charcoal/20 hover:shadow-brand-pink-500/30"
                >
                  <Send className="w-5 h-5" /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-32 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl text-brand-charcoal mb-4">Frequently Asked Questions</h2>
            <p className="text-brand-charcoal/60 font-light text-lg">Quick answers to questions you may have.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`bg-white rounded-2xl border transition-colors duration-300 ${activeFaq === idx ? 'border-brand-pink-200' : 'border-brand-pink-50 hover:border-brand-pink-100'}`}
              >
                <button 
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                >
                  <span className="font-heading text-xl text-brand-charcoal">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${activeFaq === idx ? 'bg-brand-pink-500 text-white' : 'bg-brand-pink-50 text-brand-pink-500'}`}>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === idx ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-brand-charcoal/60 font-light leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
