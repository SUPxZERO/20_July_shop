import { verifySession } from '@/lib/dal';
import { prisma } from '@/lib/prisma';
import { Package, Tags, Star, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
  const session = await verifySession();

  // Fetch stats and recent data
  const [productCount, categoryCount, featuredCount, recentProducts] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.product.count({ where: { featured: true } }),
    prisma.product.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' },
      include: { category: true }
    })
  ]);

  return (
    <div className="space-y-6 sm:space-y-10">
      {/* Welcome Banner */}
      <div className="relative rounded-[2rem] overflow-hidden bg-brand-charcoal shadow-lg border border-brand-pink-100/20">
        <div className="absolute inset-0">
          <img src="/brand/covers/cover.png" alt="Dashboard Cover" className="w-full h-full object-cover opacity-40 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal via-brand-charcoal/80 to-transparent"></div>
          <div className="absolute inset-0 bg-brand-pink-500/10 mix-blend-overlay"></div>
        </div>
        
        <div className="relative z-10 p-4 sm:p-10 md:p-14 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div>
            <span className="text-brand-pink-400 font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase mb-2 sm:mb-3 block">Dashboard Overview</span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white mb-2 tracking-wide leading-tight">
              Welcome back,<br/>
              <span className="text-brand-pink-100">{session.user?.name?.split(' ')[0] || 'Admin'} 👋</span>
            </h1>
            <p className="text-white/60 text-sm sm:text-lg max-w-lg mt-3 sm:mt-4 font-light">
              Here is what is happening in your boutique today. Manage inventory, curate collections, and oversee your store's performance.
            </p>
          </div>
          
          <div className="flex gap-4">
            <Link 
              href="/admin/products/new" 
              className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-white text-brand-charcoal text-sm sm:text-base font-medium hover:bg-brand-pink-50 transition-colors shadow-xl flex items-center gap-2"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              New Product
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="flex md:grid md:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-2 md:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
        {/* Stat Card 1 */}
        <div className="w-[85vw] sm:w-[300px] shrink-0 md:w-auto snap-center bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 shadow-sm border border-brand-pink-50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-brand-pink-400 to-brand-pink-600 text-white flex items-center justify-center shadow-lg shadow-brand-pink-500/30 group-hover:scale-110 transition-transform">
              <Package className="w-5 h-5 sm:w-7 sm:h-7" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs font-bold text-brand-charcoal/50 uppercase tracking-widest mb-0.5 sm:mb-1">Total Products</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl sm:text-4xl font-heading text-brand-charcoal">{productCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="w-[85vw] sm:w-[300px] shrink-0 md:w-auto snap-center bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 shadow-sm border border-brand-pink-50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-brand-purple-400 to-brand-purple-600 text-white flex items-center justify-center shadow-lg shadow-brand-purple-500/30 group-hover:scale-110 transition-transform">
              <Tags className="w-5 h-5 sm:w-7 sm:h-7" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs font-bold text-brand-charcoal/50 uppercase tracking-widest mb-0.5 sm:mb-1">Categories</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl sm:text-4xl font-heading text-brand-charcoal">{categoryCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="w-[85vw] sm:w-[300px] shrink-0 md:w-auto snap-center bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 shadow-sm border border-brand-pink-50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
              <Star className="w-5 h-5 sm:w-7 sm:h-7" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs font-bold text-brand-charcoal/50 uppercase tracking-widest mb-0.5 sm:mb-1">Featured Items</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl sm:text-4xl font-heading text-brand-charcoal">{featuredCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Additions Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
          <h2 className="font-heading text-xl sm:text-2xl text-brand-charcoal">Recently Added</h2>
          <Link href="/admin/products" className="text-xs sm:text-sm font-medium text-brand-pink-600 hover:text-brand-pink-700 flex items-center gap-1 group w-fit">
            View all products <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6">
          {recentProducts.length === 0 ? (
            <div className="col-span-full bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] p-6 sm:p-12 text-center border border-brand-pink-50 shadow-sm">
              <p className="text-brand-charcoal/50 text-sm sm:text-base">No products added yet.</p>
            </div>
          ) : (
            recentProducts.map((product) => (
              <Link key={product.id} href={`/admin/products/${product.id}/edit`} className="group bg-white rounded-xl sm:rounded-[2rem] p-2 sm:p-4 shadow-sm border border-brand-pink-50 hover:shadow-xl hover:shadow-brand-pink-100/50 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                <div className="w-full aspect-[4/5] rounded-lg sm:rounded-xl overflow-hidden bg-brand-offwhite relative mb-2 sm:mb-4">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-brand-charcoal/20">
                      <Package className="w-4 h-4 sm:w-8 sm:h-8" />
                    </div>
                  )}
                  {product.featured && (
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm p-1 sm:p-1.5 rounded-full text-amber-500 shadow-sm">
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-[10px] sm:text-base text-brand-charcoal line-clamp-1 group-hover:text-brand-pink-600 transition-colors leading-tight">{product.name}</h3>
                    <p className="text-[8px] sm:text-xs text-brand-charcoal/50 mt-0.5 sm:mt-1">{product.category.name}</p>
                  </div>
                  <div className="mt-1 sm:mt-4 text-[7px] sm:text-xs font-bold tracking-widest text-brand-charcoal/30 uppercase group-hover:text-brand-pink-400 transition-colors">
                    Edit
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
