'use client';

import { useTransition } from 'react';
import { useRouter, usePathname } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string;

  function switchLocale(nextLocale: string) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript complains about params, but it's valid for next-intl
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <div className="flex items-center p-1 bg-brand-charcoal/5 rounded-full border border-brand-pink-100/50 backdrop-blur-sm relative min-w-[90px]">
      <button
        onClick={() => switchLocale('en')}
        disabled={isPending || currentLocale === 'en'}
        className={`flex-1 relative z-10 px-3 py-1.5 text-xs font-bold tracking-widest rounded-full transition-all duration-300 text-center ${
          currentLocale === 'en' 
            ? 'text-white' 
            : 'text-brand-charcoal/40 hover:text-brand-charcoal'
        }`}
      >
        EN
      </button>
      
      <button
        onClick={() => switchLocale('km')}
        disabled={isPending || currentLocale === 'km'}
        className={`flex-1 relative z-10 px-3 py-1.5 text-xs font-bold tracking-widest rounded-full transition-all duration-300 text-center ${
          currentLocale === 'km' 
            ? 'text-white' 
            : 'text-brand-charcoal/40 hover:text-brand-charcoal'
        }`}
      >
        KM
      </button>

      {/* Animated active background pill */}
      <div 
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-brand-charcoal shadow-sm transition-transform duration-300 ease-out z-0 ${
          currentLocale === 'en' ? 'translate-x-0' : 'translate-x-[100%]'
        }`}
      />
    </div>
  );
}
