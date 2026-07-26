import { StorefrontHeader } from '@/components/StorefrontHeader';
import { StorefrontFooter } from '@/components/StorefrontFooter';

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col font-body bg-brand-cream selection:bg-brand-pink-200 selection:text-brand-charcoal">
      <StorefrontHeader />

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full">
        {/* We add page transition wrappers or just let the pages handle their own padding */}
        {children}
      </main>

      <StorefrontFooter />
    </div>
  );
}
