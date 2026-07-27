import { Link } from '@/i18n/routing';
import { signOut } from '@/lib/auth';
import { LayoutDashboard, Tags, Package, Settings, LogOut } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations('AdminLayout');

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FDFCFB] relative overflow-hidden lg:h-screen">
      {/* Subtle Premium Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-brand-pink-300/10 blur-[120px] mix-blend-multiply pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-brand-purple-300/10 blur-[120px] mix-blend-multiply pointer-events-none"></div>
      </div>

      {/* Sidebar */}
      <aside className="w-full lg:w-[280px] shrink-0 bg-white/60 backdrop-blur-2xl border-b lg:border-b-0 lg:border-r border-white/50 flex flex-col lg:h-screen shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 relative">
        <div className="p-3 sm:p-4 lg:p-8 lg:pb-6 flex items-center justify-between lg:flex-col lg:justify-center">
          <Link href="/admin" className="flex items-center lg:flex-col group cursor-pointer gap-2 sm:gap-3 lg:gap-0">
            <img src="/brand/logos/logo-hollow.png" alt="20-July" className="h-6 sm:h-8 lg:h-12 w-auto lg:mb-3 opacity-90 group-hover:opacity-100 transition-opacity" />
            <p className="text-center text-brand-pink-500 font-bold text-[8px] sm:text-[10px] tracking-[0.3em] uppercase">
              {t('AdminPortal')}
            </p>
          </Link>
          
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <button
                type="submit"
                className="p-1.5 sm:p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg sm:rounded-xl transition-colors"
                aria-label={t('SignOut')}
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="px-6 py-2">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-pink-200/50 to-transparent" />
        </div>

        <nav className="flex-1 px-2 sm:px-4 flex flex-row lg:flex-col gap-1.5 sm:gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 hide-scrollbar">
          <Link
            href="/admin"
            className="group flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3.5 rounded-xl sm:rounded-2xl text-brand-charcoal/60 hover:text-brand-pink-600 hover:bg-white/80 hover:shadow-sm transition-all duration-300 hover:translate-x-1"
          >
            <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-brand-pink-50 text-brand-pink-400 group-hover:bg-brand-pink-100 group-hover:text-brand-pink-600 transition-colors">
              <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="font-medium whitespace-nowrap text-xs sm:text-base">{t('Overview')}</span>
          </Link>
          <Link
            href="/admin/categories"
            className="group flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3.5 rounded-xl sm:rounded-2xl text-brand-charcoal/60 hover:text-brand-pink-600 hover:bg-white/80 hover:shadow-sm transition-all duration-300 hover:translate-x-1"
          >
            <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-brand-pink-50 text-brand-pink-400 group-hover:bg-brand-pink-100 group-hover:text-brand-pink-600 transition-colors">
              <Tags className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="font-medium whitespace-nowrap text-xs sm:text-base">{t('Categories')}</span>
          </Link>
          <Link
            href="/admin/products"
            className="group flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3.5 rounded-xl sm:rounded-2xl text-brand-charcoal/60 hover:text-brand-pink-600 hover:bg-white/80 hover:shadow-sm transition-all duration-300 hover:translate-x-1"
          >
            <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-brand-pink-50 text-brand-pink-400 group-hover:bg-brand-pink-100 group-hover:text-brand-pink-600 transition-colors">
              <Package className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="font-medium whitespace-nowrap text-xs sm:text-base">{t('Products')}</span>
          </Link>
          {/* <Link
            href="/admin/settings"
            className="group flex items-center gap-3 px-4 py-3.5 rounded-2xl text-brand-charcoal/60 hover:text-brand-pink-600 hover:bg-white/80 hover:shadow-sm transition-all duration-300 hover:translate-x-1"
          >
            <div className="p-2 rounded-xl bg-brand-pink-50 text-brand-pink-400 group-hover:bg-brand-pink-100 group-hover:text-brand-pink-600 transition-colors">
              <Settings className="w-5 h-5" />
            </div>
            <span className="font-medium">Settings</span>
          </Link> */}
        </nav>

        <div className="hidden lg:flex flex-col p-6 gap-4">
          <div className="flex justify-center border-t border-brand-pink-100/40 pt-6">
            <LanguageSwitcher />
          </div>
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button
              type="submit"
              className="group w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-red-400 hover:text-red-600 hover:bg-red-50 hover:shadow-sm transition-all duration-300"
            >
              <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">{t('SignOut')}</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative z-10 p-3 sm:p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
