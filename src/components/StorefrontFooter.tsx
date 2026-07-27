'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState, useTransition } from 'react';
import { subscribeNewsletter } from './actions';

export function StorefrontFooter() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

  async function handleSubscribe(formData: FormData) {
    setStatus({ type: null, message: '' });
    startTransition(async () => {
      const result = await subscribeNewsletter(formData);
      if (result.success) {
        setStatus({ type: 'success', message: 'Subscribed!' });
      } else {
        setStatus({ type: 'error', message: result.error || 'Failed to subscribe' });
      }
    });
  }

  return (
    <footer className="bg-brand-charcoal text-brand-offwhite py-8 md:py-16 border-t-4 border-brand-pink-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 lg:gap-8 mb-8 md:mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 group mb-4">
              <img src="/brand/logos/logo-hollow.png" alt="20-July Shop" className="h-8 md:h-12 w-auto object-contain brightness-0 invert group-hover:opacity-80 transition-opacity" />
              <div className="flex flex-col">
                <span className="font-heading text-base md:text-xl tracking-widest text-white group-hover:text-brand-pink-400 transition-colors leading-none">
                  20-July
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-brand-pink-400 font-heading mt-1">
                  Shop
                </span>
              </div>
            </Link>
            <p className="text-sm text-brand-offwhite/60 leading-relaxed font-light">
              Elegance in every thread. Discover our curated collection of premium women's fashion designed to elevate your everyday style.
            </p>
          </div>
          
          {/* Links Col */}
          <div>
            <h4 className="font-heading text-base md:text-lg mb-3 md:mb-6 text-white tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-sm font-light text-brand-offwhite/60">
              <li>
                <Link href="/shop" className="hover:text-brand-pink-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-brand-pink-400 group-hover:w-3 transition-all duration-300"></span> <span>Shop All</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-pink-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-brand-pink-400 group-hover:w-3 transition-all duration-300"></span> <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-pink-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-brand-pink-400 group-hover:w-3 transition-all duration-300"></span> <span>FAQ</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Socials Col */}
          <div>
            <h4 className="font-heading text-base md:text-lg mb-3 md:mb-6 text-white tracking-wide">Connect</h4>
            <ul className="space-y-2 text-sm font-light text-brand-offwhite/60">
              <li>
                <a href="https://t.me/SreynuthTheara02" target="_blank" rel="noopener noreferrer" className="hover:text-brand-pink-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-brand-pink-400 group-hover:w-3 transition-all duration-300"></span> <span>Telegram</span>
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@20julyshop2?_r=1&_t=ZS-98MJlGMwiEi" target="_blank" rel="noopener noreferrer" className="hover:text-brand-pink-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-brand-pink-400 group-hover:w-3 transition-all duration-300"></span> <span>TikTok</span>
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/share/19D6MFPvDg/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-pink-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-brand-pink-400 group-hover:w-3 transition-all duration-300"></span> <span>Facebook</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="lg:col-span-1">
            <h4 className="font-heading text-base md:text-lg mb-3 md:mb-6 text-white tracking-wide">Newsletter</h4>
            <p className="text-xs sm:text-sm text-brand-offwhite/60 leading-relaxed font-light mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            {status.type === 'success' ? (
              <div className="flex items-center gap-2 text-brand-pink-400 text-sm mt-4">
                <CheckCircle2 className="w-5 h-5" /> Subscribed successfully!
              </div>
            ) : (
              <form className="relative" action={handleSubscribe}>
                <input 
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email address" 
                  className="w-full bg-white/5 border border-white/10 rounded-full px-4 md:px-5 py-2.5 md:py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-pink-500 transition-colors"
                />
                <button 
                  type="submit" 
                  disabled={isPending}
                  className="absolute right-1 top-1 bottom-1 bg-brand-pink-500 hover:bg-brand-pink-400 text-white rounded-full w-10 flex items-center justify-center transition-colors disabled:opacity-50"
                  aria-label="Subscribe"
                >
                  {isPending ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
                {status.type === 'error' && (
                  <p className="text-red-400 text-xs mt-2">{status.message}</p>
                )}
              </form>
            )}
          </div>
        </div>
        
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] sm:text-xs font-light text-brand-offwhite/40 tracking-wider">
          <p>&copy; {new Date().getFullYear()} 20-July Shop. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
