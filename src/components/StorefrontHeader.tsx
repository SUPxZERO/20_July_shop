'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function StorefrontHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-lg border-b border-brand-pink-100 shadow-sm py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group relative z-50">
            <img src="/brand/logos/logo-hollow.png" alt="20-July Shop" className="h-12 w-auto object-contain group-hover:opacity-80 transition-opacity drop-shadow-sm" />
            <div className="flex flex-col">
              <span className="font-heading text-xl text-brand-charcoal tracking-widest group-hover:text-brand-pink-500 transition-colors leading-none">
                20-July
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-brand-pink-400 font-heading mt-1">
                Shop
              </span>
            </div>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {[
              { label: 'Home', href: '/' },
              { label: 'Collection', href: '/shop' },
              { label: 'Contact', href: '/contact' },
            ].map((link) => (
              <Link 
                key={link.label}
                href={link.href} 
                className="relative text-sm font-medium text-brand-charcoal/80 hover:text-brand-pink-500 transition-colors uppercase tracking-[0.15em] group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-pink-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 -mr-2 text-brand-charcoal relative z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-white transition-transform duration-500 ease-in-out md:hidden flex flex-col items-center justify-center ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {[
            { label: 'Home', href: '/' },
            { label: 'Collection', href: '/shop' },
            { label: 'Contact', href: '/contact' },
          ].map((link) => (
            <Link 
              key={link.label}
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-heading text-3xl text-brand-charcoal hover:text-brand-pink-500 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
