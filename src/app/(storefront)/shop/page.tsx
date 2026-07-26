import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Pagination } from '@/components/Pagination';
import { ShopFilters } from '@/components/ShopFilters';
import { Prisma } from '@/generated/prisma/client';
import { ShoppingBag, SearchX } from 'lucide-react';

interface ShopPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const limit = 12;
  const skip = (currentPage - 1) * limit;

  // Extract all filter parameters
  const categorySlug = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : undefined;
  const size = typeof resolvedSearchParams.size === 'string' ? resolvedSearchParams.size : undefined;
  const color = typeof resolvedSearchParams.color === 'string' ? resolvedSearchParams.color : undefined;
  const material = typeof resolvedSearchParams.material === 'string' ? resolvedSearchParams.material : undefined;

  // Build Prisma where clause
  const whereClause: Prisma.ProductWhereInput = {
    ...(categorySlug && { category: { slug: categorySlug } }),
  };

  if (size || color || material) {
    whereClause.variants = {
      some: {
        ...(size && { size: { equals: size, mode: 'insensitive' } }),
        ...(color && { color: { equals: color, mode: 'insensitive' } }),
        ...(material && { material: { equals: material, mode: 'insensitive' } }),
      }
    };
  }

  const [products, totalProducts, categories, allVariants] = await prisma.$transaction([
    prisma.product.findMany({
      where: whereClause,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.product.count({ where: whereClause }),
    prisma.category.findMany({
      orderBy: { name: 'asc' },
    }),
    prisma.productVariant.findMany({
      select: { size: true, color: true, material: true },
    })
  ]);

  const totalPages = Math.ceil(totalProducts / limit);

  // Extract unique filter options (ignoring nulls)
  const sizes = Array.from(new Set(allVariants.map(v => v.size).filter((s): s is string => Boolean(s)))).sort();
  const colors = Array.from(new Set(allVariants.map(v => v.color).filter((c): c is string => Boolean(c)))).sort();
  const materials = Array.from(new Set(allVariants.map(v => v.material).filter((m): m is string => Boolean(m)))).sort();

  return (
    <div className="bg-brand-offwhite min-h-screen pb-24">
      {/* Shop Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-brand-pink-50"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-purple-200/40 rounded-full blur-[120px]"></div>
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        <div className="relative z-10 text-center px-6">
          <span className="text-xs font-bold tracking-[0.3em] text-brand-pink-500 uppercase mb-4 block">
            Curated Styles
          </span>
          <h1 className="font-heading text-5xl md:text-6xl text-brand-charcoal mb-4">
            The Collection
          </h1>
          <p className="text-brand-charcoal/60 max-w-xl mx-auto font-light text-lg">
            Browse our complete selection of curated pieces. Use the filters below to find exactly what you're looking for.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        {/* Dynamic Filters Component */}
        <div className="mb-12 bg-white p-2 rounded-3xl shadow-sm border border-brand-pink-50">
          <ShopFilters 
            categories={categories} 
            sizes={sizes} 
            colors={colors} 
            materials={materials} 
          />
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-brand-pink-100 shadow-sm text-center px-6">
            <div className="w-24 h-24 bg-brand-pink-50 rounded-full flex items-center justify-center mb-6 text-brand-pink-300">
              <SearchX className="w-10 h-10" />
            </div>
            <h3 className="font-heading text-3xl text-brand-charcoal mb-4">No Matches Found</h3>
            <p className="text-brand-charcoal/60 text-lg mb-8 max-w-md font-light">
              We couldn't find any products matching your current filters. Try adjusting your selections or explore our entire collection.
            </p>
            <Link 
              href="/shop" 
              className="px-8 py-3.5 rounded-full text-sm font-medium bg-brand-charcoal text-white hover:bg-black transition-all duration-300 shadow-lg shadow-brand-charcoal/20 hover:shadow-brand-charcoal/40 hover:-translate-y-0.5"
            >
              Clear All Filters
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product, idx) => (
                <div 
                  key={product.id} 
                  className="group flex flex-col relative animate-fade-in-up"
                  style={{ animationDelay: `${(idx % 12) * 100}ms` }}
                >
                  <Link href={`/shop/${product.slug}`} className="block relative bg-white rounded-[2rem] p-5 h-80 mb-5 overflow-hidden border border-brand-pink-50 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-pink-100/60 hover:border-brand-pink-200">
                    {product.imageUrl && (
                      <div className="absolute inset-0 z-0">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                      </div>
                    )}
                    {/* Glassmorphism Category Badge */}
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md shadow-sm">
                      <span className="text-[9px] font-bold tracking-widest text-brand-charcoal uppercase">
                        {product.category.name}
                      </span>
                    </div>
                    {/* Dark gradient for text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Link>

                  {/* Quick Action Button */}
                  <button 
                    className="absolute bottom-28 right-6 z-20 w-10 h-10 rounded-full bg-white text-brand-charcoal shadow-xl flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-brand-pink-500 hover:text-white"
                    aria-label="Quick Add"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>

                  <div className="text-center px-2">
                    <h3 className="font-heading text-lg text-brand-charcoal mb-2 hover:text-brand-pink-600 transition-colors line-clamp-1">
                      <Link href={`/shop/${product.slug}`}>{product.name}</Link>
                    </h3>
                  </div>
                </div>
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="mt-20 flex justify-center">
                <Pagination totalPages={totalPages} currentPage={currentPage} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
