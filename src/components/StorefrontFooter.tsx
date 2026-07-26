'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function StorefrontFooter() {
  return (
    <footer className="bg-brand-charcoal text-brand-offwhite py-16 border-t-4 border-brand-pink-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex flex-col group mb-6">
              <span className="font-heading text-2xl tracking-widest text-white group-hover:text-brand-pink-400 transition-colors">
                20-July
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-pink-400 font-heading">
                Shop
              </span>
            </Link>
            <p className="text-sm text-brand-offwhite/60 leading-relaxed font-light">
              Elegance in every thread. Discover our curated collection of premium women's fashion designed to elevate your everyday style.
            </p>
          </div>
          
          {/* Links Col */}
          <div>
            <h4 className="font-heading text-lg mb-6 text-white tracking-wide">Quick Links</h4>
            <ul className="space-y-3 text-sm font-light text-brand-offwhite/60">
              <li>
                <Link href="/shop" className="hover:text-brand-pink-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-brand-pink-400 group-hover:w-3 transition-all duration-300"></span> Shop All
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-pink-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-brand-pink-400 group-hover:w-3 transition-all duration-300"></span> Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-brand-pink-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-brand-pink-400 group-hover:w-3 transition-all duration-300"></span> FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Socials Col */}
          <div>
            <h4 className="font-heading text-lg mb-6 text-white tracking-wide">Connect</h4>
            <ul className="space-y-3 text-sm font-light text-brand-offwhite/60">
              <li>
                <a href="#" className="hover:text-brand-pink-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-brand-pink-400 group-hover:w-3 transition-all duration-300"></span> Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-pink-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-brand-pink-400 group-hover:w-3 transition-all duration-300"></span> TikTok
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-pink-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-brand-pink-400 group-hover:w-3 transition-all duration-300"></span> Facebook
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="lg:col-span-1">
            <h4 className="font-heading text-lg mb-6 text-white tracking-wide">Newsletter</h4>
            <p className="text-sm text-brand-offwhite/60 leading-relaxed font-light mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-pink-500 transition-colors"
              />
              <button 
                type="submit" 
                className="absolute right-1 top-1 bottom-1 bg-brand-pink-500 hover:bg-brand-pink-400 text-white rounded-full w-10 flex items-center justify-center transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light text-brand-offwhite/40 tracking-wider">
          <p>&copy; {new Date().getFullYear()} 20-July Shop. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
