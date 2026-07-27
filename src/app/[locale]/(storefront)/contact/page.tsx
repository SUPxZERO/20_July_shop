'use client';

import Link from 'next/link';
import { Send, MapPin, Mail, Phone, MessageSquare, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { sendTelegramMessage } from './actions';

export default function ContactPage() {
  const t = useTranslations('ContactPage');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

  async function handleAction(formData: FormData) {
    setStatus({ type: null, message: '' });
    startTransition(async () => {
      const result = await sendTelegramMessage(formData);
      if (result.success) {
        setStatus({ type: 'success', message: t('MessageSentSuccess') });
      } else {
        setStatus({ type: 'error', message: result.error || t('MessageSentError') });
      }
    });
  }

  const faqs = [
    { q: t('FAQ1_Q'), a: t('FAQ1_A') },
    { q: t('FAQ2_Q'), a: t('FAQ2_A') },
    { q: t('FAQ3_Q'), a: t('FAQ3_A') },
    { q: t('FAQ4_Q'), a: t('FAQ4_A') }
  ];

  return (
    <div className="bg-brand-offwhite min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-32 pb-8 sm:pb-20 overflow-hidden bg-brand-pink-50/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-pink-100 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-purple-100 rounded-full blur-3xl opacity-60 translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="text-xs font-bold tracking-[0.3em] text-brand-pink-500 uppercase mb-4 block">
            {t('HeroSubtitle')}
          </span>
          <h1 className="font-heading text-2xl sm:text-5xl md:text-6xl text-brand-charcoal mb-3 sm:mb-6">
            {t('HeroTitle')}
          </h1>
          <p className="text-xs sm:text-lg text-brand-charcoal/60 font-light leading-relaxed max-w-xl mx-auto">
            {t('HeroDesc')}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div className="bg-white p-4 sm:p-8 md:p-10 rounded-xl sm:rounded-[2rem] shadow-sm border border-brand-pink-50 h-full">
              <h3 className="font-heading text-xl sm:text-3xl text-brand-charcoal mb-4 sm:mb-8">{t('ContactInfoTitle')}</h3>
              
              <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-brand-pink-50 flex items-center justify-center shrink-0 text-brand-pink-500">
                    <Phone className="w-3 h-3 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-sm font-bold tracking-widest text-brand-charcoal uppercase mb-0.5 sm:mb-1">{t('CallUs')}</p>
                    <a href="tel:+855973008594" className="text-brand-charcoal/60 font-light text-sm sm:text-lg hover:text-brand-pink-600 transition-colors block leading-none">
                      +855 97 300 8594
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-brand-pink-50 flex items-center justify-center shrink-0 text-brand-pink-500">
                    <Mail className="w-3 h-3 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-sm font-bold tracking-widest text-brand-charcoal uppercase mb-0.5 sm:mb-1">{t('EmailUs')}</p>
                    <a href="mailto:thearasreynuth@gmail.com" className="text-brand-charcoal/60 font-light text-sm sm:text-lg hover:text-brand-pink-600 transition-colors block leading-none">
                      thearasreynuth@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-brand-pink-50 flex items-center justify-center shrink-0 text-brand-pink-500">
                    <MessageSquare className="w-3 h-3 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-sm font-bold tracking-widest text-brand-charcoal uppercase mb-0.5 sm:mb-1">{t('TelegramChat')}</p>
                    <a href="https://t.me/+855973008594" target="_blank" rel="noopener noreferrer" className="text-brand-charcoal/60 font-light text-sm sm:text-lg hover:text-brand-pink-600 transition-colors block leading-none">
                      +855 97 300 8594
                    </a>
                  </div>
                </div>
              </div>

              <h3 className="font-heading text-lg sm:text-2xl text-brand-charcoal mb-3 sm:mb-6 border-t border-brand-pink-50 pt-4 sm:pt-8">{t('SocialChannels')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                <a 
                  href="https://www.facebook.com/share/19D6MFPvDg/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 sm:gap-4 p-2 sm:p-4 bg-brand-offwhite rounded-lg sm:rounded-2xl border border-brand-pink-50 hover:border-[#1877F2] hover:bg-[#1877F2]/5 transition-all duration-300"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-brand-charcoal/40 group-hover:text-[#1877F2] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="font-medium text-xs sm:text-sm text-brand-charcoal group-hover:text-[#1877F2] transition-colors">Facebook</span>
                </a>
                
                <a 
                  href="https://www.tiktok.com/@20julyshop2?_r=1&_t=ZS-98MJlGMwiEi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 sm:gap-4 p-2 sm:p-4 bg-brand-offwhite rounded-lg sm:rounded-2xl border border-brand-pink-50 hover:border-black hover:bg-black/5 transition-all duration-300"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-brand-charcoal/40 group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                  <span className="font-medium text-xs sm:text-sm text-brand-charcoal group-hover:text-black transition-colors">TikTok</span>
                </a>

                <a 
                  href="https://t.me/SreynuthTheara02" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 sm:gap-4 p-2 sm:p-4 bg-brand-offwhite rounded-lg sm:rounded-2xl border border-brand-pink-50 hover:border-[#0088cc] hover:bg-[#0088cc]/5 transition-all duration-300 sm:col-span-2"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-brand-charcoal/40 group-hover:text-[#0088cc] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.04.01.24 0 .24z"/>
                  </svg>
                  <span className="font-medium text-xs sm:text-sm text-brand-charcoal group-hover:text-[#0088cc] transition-colors">Telegram Channel</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-4 sm:p-8 md:p-12 rounded-xl sm:rounded-[2rem] shadow-xl shadow-brand-pink-100/50 border border-brand-pink-100 h-full flex flex-col justify-center">
              {status.type === 'success' ? (
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-brand-pink-50 rounded-full flex items-center justify-center mx-auto text-brand-pink-500 mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-heading text-4xl text-brand-charcoal">{t('MessageSentTitle')}</h3>
                  <p className="text-brand-charcoal/60 font-light text-lg max-w-md mx-auto">
                    {status.message}
                  </p>
                  <button 
                    onClick={() => setStatus({ type: null, message: '' })}
                    className="mt-8 px-8 py-4 bg-brand-charcoal text-white rounded-xl font-medium tracking-widest uppercase hover:bg-brand-pink-600 transition-all duration-300"
                  >
                    {t('SendAnotherMessage')}
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-heading text-xl sm:text-3xl text-brand-charcoal mb-2">{t('SendMessageTitle')}</h3>
                  <p className="text-xs sm:text-base text-brand-charcoal/60 font-light mb-4 sm:mb-8">{t('SendMessageDesc')}</p>
                  
                  {status.type === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm">
                      {status.message}
                    </div>
                  )}
                  
                  <form className="space-y-4 sm:space-y-6" action={handleAction}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-1.5 sm:space-y-2">
                        <label htmlFor="name" className="text-[10px] sm:text-sm font-bold tracking-widest text-brand-charcoal uppercase">{t('FullName')}</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name"
                          required
                          placeholder={t('FullNamePlaceholder')}
                          className="w-full bg-brand-offwhite border border-brand-pink-50 rounded-lg sm:rounded-xl px-3 sm:px-5 py-2.5 sm:py-4 text-xs sm:text-base text-brand-charcoal placeholder:text-brand-charcoal/30 focus:outline-none focus:border-brand-pink-400 focus:ring-1 focus:ring-brand-pink-400 transition-all"
                        />
                      </div>
                      <div className="space-y-1.5 sm:space-y-2">
                        <label htmlFor="email" className="text-[10px] sm:text-sm font-bold tracking-widest text-brand-charcoal uppercase">{t('EmailAddress')}</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email"
                          required
                          placeholder={t('EmailPlaceholder')}
                          className="w-full bg-brand-offwhite border border-brand-pink-50 rounded-lg sm:rounded-xl px-3 sm:px-5 py-2.5 sm:py-4 text-xs sm:text-base text-brand-charcoal placeholder:text-brand-charcoal/30 focus:outline-none focus:border-brand-pink-400 focus:ring-1 focus:ring-brand-pink-400 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <label htmlFor="subject" className="text-[10px] sm:text-sm font-bold tracking-widest text-brand-charcoal uppercase">{t('Subject')}</label>
                      <div className="relative">
                        <select 
                          id="subject"
                          name="subject"
                          className="w-full bg-brand-offwhite border border-brand-pink-50 rounded-lg sm:rounded-xl px-3 sm:px-5 py-2.5 sm:py-4 text-xs sm:text-base text-brand-charcoal appearance-none focus:outline-none focus:border-brand-pink-400 focus:ring-1 focus:ring-brand-pink-400 transition-all"
                        >
                          <option value="General Inquiry">{t('SubjectGeneral')}</option>
                          <option value="Order Inquiry">{t('SubjectOrder')}</option>
                          <option value="Sizing & Fit">{t('SubjectSizing')}</option>
                          <option value="Returns & Exchanges">{t('SubjectReturns')}</option>
                          <option value="Other">{t('SubjectOther')}</option>
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-charcoal/40 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <label htmlFor="message" className="text-[10px] sm:text-sm font-bold tracking-widest text-brand-charcoal uppercase">{t('Message')}</label>
                      <textarea 
                        id="message" 
                        name="message"
                        required
                        rows={4}
                        placeholder={t('MessagePlaceholder')}
                        className="w-full bg-brand-offwhite border border-brand-pink-50 rounded-lg sm:rounded-xl px-3 sm:px-5 py-2.5 sm:py-4 text-xs sm:text-base text-brand-charcoal placeholder:text-brand-charcoal/30 focus:outline-none focus:border-brand-pink-400 focus:ring-1 focus:ring-brand-pink-400 transition-all resize-none"
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isPending}
                      className="w-full inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-8 py-3 sm:py-5 bg-brand-charcoal text-white rounded-lg sm:rounded-xl text-xs sm:text-base font-medium tracking-widest uppercase hover:bg-brand-pink-600 transition-all duration-300 shadow-lg shadow-brand-charcoal/20 hover:shadow-brand-pink-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isPending ? (
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        <Send className="w-5 h-5" /> 
                      )}
                      <span>{isPending ? t('Sending') : t('SendMessageButton')}</span>
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-10 sm:mt-32 max-w-3xl mx-auto px-1">
          <div className="text-center mb-6 sm:mb-12">
            <h2 className="font-heading text-xl sm:text-4xl text-brand-charcoal mb-2 sm:mb-4">{t('FAQTitle')}</h2>
            <p className="text-brand-charcoal/60 font-light text-xs sm:text-lg">{t('FAQDesc')}</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`bg-white rounded-2xl border transition-colors duration-300 ${activeFaq === idx ? 'border-brand-pink-200' : 'border-brand-pink-50 hover:border-brand-pink-100'}`}
              >
                <button 
                  className="w-full flex items-center justify-between p-3 sm:p-6 text-left gap-3"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                >
                  <span className="font-heading text-sm sm:text-xl text-brand-charcoal leading-tight">{faq.q}</span>
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${activeFaq === idx ? 'bg-brand-pink-500 text-white' : 'bg-brand-pink-50 text-brand-pink-500'}`}>
                    <ChevronDown className={`w-3 h-3 sm:w-5 sm:h-5 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                <div 
                  className={`px-3 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === idx ? 'max-h-40 pb-3 sm:pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-xs sm:text-base text-brand-charcoal/60 font-light leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
