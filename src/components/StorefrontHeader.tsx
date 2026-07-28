'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export function StorefrontHeader() {
  const t = useTranslations('Header');
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
            ? 'bg-white/80 backdrop-blur-lg border-b border-brand-pink-100 shadow-sm py-2 md:py-4' 
            : 'bg-transparent py-3 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group relative z-50">
            <img src="/brand/logos/logo-hollow.png" alt="20-July Shop" className="h-6 sm:h-8 md:h-12 w-auto object-contain group-hover:opacity-80 transition-opacity drop-shadow-sm" />
            <div className="flex flex-col">
              <span className="font-heading text-base sm:text-lg md:text-xl text-brand-charcoal tracking-widest group-hover:text-brand-pink-500 transition-colors leading-none">
                20-July
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-brand-pink-400 font-heading mt-0.5 sm:mt-1">
                Shop
              </span>
            </div>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {[
              { label: t('Home'), href: '/' },
              { label: t('Collection'), href: '/shop' },
              { label: t('Contact'), href: '/contact' },
            ].map((link) => (
              <Link 
                key={link.label}
                href={link.href} 
                className="relative text-sm font-medium text-brand-charcoal/80 hover:text-brand-pink-500 transition-colors uppercase tracking-[0.15em] group"
              >
                <span>{link.label}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-pink-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <div className="pl-4 border-l border-brand-pink-100/50 flex items-center">
              <LanguageSwitcher />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 -mr-2 text-brand-charcoal relative z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={t('AriaToggleMenu')}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-[#FDFCFB] transition-transform duration-500 ease-in-out md:hidden flex flex-col pt-24 px-6 ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[80%] h-[40%] rounded-full bg-brand-pink-200/20 blur-[80px] pointer-events-none"></div>
        
        <nav className="flex flex-col w-full gap-2 relative z-10 mt-4">
          {[
            { label: t('Home'), href: '/' },
            { label: t('Collection'), href: '/shop' },
            { label: t('Contact'), href: '/contact' },
          ].map((link, idx) => (
            <Link 
              key={link.label}
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-4 py-4 border-b border-brand-pink-100/40 group"
            >
              <span className="text-[10px] font-bold text-brand-pink-300 tracking-[0.2em] group-hover:text-brand-pink-500 transition-colors">0{idx + 1}</span>
              <span className="font-heading text-xl text-brand-charcoal group-hover:text-brand-pink-500 transition-colors">{link.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="mt-8 flex justify-center z-10 border-t border-brand-pink-100/40 pt-8">
           <LanguageSwitcher />
        </div>
        
        <div className="mt-auto mb-8 relative z-10 flex flex-col items-center opacity-60">
          <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-brand-charcoal mb-2">20-July Shop</p>
          <p className="text-xs font-light text-brand-charcoal">{t('Elegance')}</p>
        </div>
      </div>
    </>
  );
}
