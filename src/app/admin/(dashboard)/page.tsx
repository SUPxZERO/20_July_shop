import { verifySession } from '@/lib/dal';
import { prisma } from '@/lib/prisma';
import { Package, Tags, Star } from 'lucide-react';

export default async function AdminDashboard() {
  const session = await verifySession();

  // Fetch some quick stats
  const [productCount, categoryCount, featuredCount] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.product.count({ where: { featured: true } }),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-4xl text-brand-charcoal mb-2">
            Welcome back, {session.user?.name?.split(' ')[0] || 'Admin'}! 👋
          </h1>
          <p className="text-brand-charcoal/60 text-lg">
            Here is what is happening in your boutique today.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat Card 1 */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-white hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-pink-400 to-brand-pink-600 text-white flex items-center justify-center shadow-lg shadow-brand-pink-500/30 group-hover:scale-110 transition-transform">
              <Package className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-medium text-brand-charcoal/50 uppercase tracking-wider">Total Products</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-heading font-bold text-brand-charcoal">{productCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-white hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-purple-400 to-brand-purple-600 text-white flex items-center justify-center shadow-lg shadow-brand-purple-500/30 group-hover:scale-110 transition-transform">
              <Tags className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-medium text-brand-charcoal/50 uppercase tracking-wider">Categories</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-heading font-bold text-brand-charcoal">{categoryCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-white hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
              <Star className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-medium text-brand-charcoal/50 uppercase tracking-wider">Featured Items</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-heading font-bold text-brand-charcoal">{featuredCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
