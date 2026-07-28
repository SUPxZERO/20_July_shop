'use client';

import { Link, usePathname } from '@/i18n/routing';
import { useParams } from 'next/navigation';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string;

  return (
    <div className="flex items-center p-1 bg-brand-charcoal/5 rounded-full border border-brand-pink-100/50 backdrop-blur-sm relative min-w-[90px]">
      <Link
        href={pathname}
        locale="en"
        className={`flex-1 relative z-10 px-3 py-1.5 text-xs font-bold tracking-widest rounded-full transition-all duration-300 text-center ${
          currentLocale === 'en' 
            ? 'text-white pointer-events-none' 
            : 'text-brand-charcoal/40 hover:text-brand-charcoal'
        }`}
      >
        EN
      </Link>
      
      <Link
        href={pathname}
        locale="km"
        className={`flex-1 relative z-10 px-3 py-1.5 text-xs font-bold tracking-widest rounded-full transition-all duration-300 text-center ${
          currentLocale === 'km' 
            ? 'text-white pointer-events-none' 
            : 'text-brand-charcoal/40 hover:text-brand-charcoal'
        }`}
      >
        KM
      </Link>

      {/* Animated active background pill */}
      <div 
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-brand-charcoal shadow-sm transition-transform duration-300 ease-out z-0 pointer-events-none ${
          currentLocale === 'en' ? 'translate-x-0' : 'translate-x-[100%]'
        }`}
      />
    </div>
  );
}
