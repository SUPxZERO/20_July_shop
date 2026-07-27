import Link from 'next/link';
import { signOut } from '@/lib/auth';
import { LayoutDashboard, Tags, Package, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-[#FDFCFB] relative overflow-hidden">
      {/* Subtle Premium Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-brand-pink-300/10 blur-[120px] mix-blend-multiply pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-brand-purple-300/10 blur-[120px] mix-blend-multiply pointer-events-none"></div>
      </div>

      {/* Sidebar */}
      <aside className="w-[280px] bg-white/60 backdrop-blur-2xl border-r border-white/50 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 relative">
        <div className="p-8 pb-6">
          <Link href="/admin" className="flex flex-col items-center group cursor-pointer">
            <img src="/brand/logos/logo-hollow.png" alt="20-July" className="h-12 w-auto mb-3 opacity-90 group-hover:opacity-100 transition-opacity" />
            <p className="text-center text-brand-pink-500 font-bold text-[10px] tracking-[0.3em] uppercase">
              Admin Portal
            </p>
          </Link>
        </div>

        <div className="px-6 py-2">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-pink-200/50 to-transparent" />
        </div>

        <nav className="flex-1 px-4 flex flex-col gap-2">
          <Link
            href="/admin"
            className="group flex items-center gap-3 px-4 py-3.5 rounded-2xl text-brand-charcoal/60 hover:text-brand-pink-600 hover:bg-white/80 hover:shadow-sm transition-all duration-300 hover:translate-x-1"
          >
            <div className="p-2 rounded-xl bg-brand-pink-50 text-brand-pink-400 group-hover:bg-brand-pink-100 group-hover:text-brand-pink-600 transition-colors">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <span className="font-medium">Overview</span>
          </Link>
          <Link
            href="/admin/categories"
            className="group flex items-center gap-3 px-4 py-3.5 rounded-2xl text-brand-charcoal/60 hover:text-brand-pink-600 hover:bg-white/80 hover:shadow-sm transition-all duration-300 hover:translate-x-1"
          >
            <div className="p-2 rounded-xl bg-brand-pink-50 text-brand-pink-400 group-hover:bg-brand-pink-100 group-hover:text-brand-pink-600 transition-colors">
              <Tags className="w-5 h-5" />
            </div>
            <span className="font-medium">Categories</span>
          </Link>
          <Link
            href="/admin/products"
            className="group flex items-center gap-3 px-4 py-3.5 rounded-2xl text-brand-charcoal/60 hover:text-brand-pink-600 hover:bg-white/80 hover:shadow-sm transition-all duration-300 hover:translate-x-1"
          >
            <div className="p-2 rounded-xl bg-brand-pink-50 text-brand-pink-400 group-hover:bg-brand-pink-100 group-hover:text-brand-pink-600 transition-colors">
              <Package className="w-5 h-5" />
            </div>
            <span className="font-medium">Products</span>
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

        <div className="p-6">
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
              <span className="font-medium">Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto relative z-10 p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
