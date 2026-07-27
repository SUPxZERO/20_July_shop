import { verifySession } from '@/lib/dal';
import { prisma } from '@/lib/prisma';
import { deleteProduct, toggleFeatured } from './actions';
import { Trash2, Plus, Star, Edit, Package } from 'lucide-react';
import Link from 'next/link';
import { Pagination } from '@/components/Pagination';

interface AdminProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({ searchParams }: AdminProductsPageProps) {
  await verifySession();

  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const limit = 10;
  const skip = (currentPage - 1) * limit;

  const [products, totalProducts] = await prisma.$transaction([
    prisma.product.findMany({
      include: {
        category: true,
        _count: { select: { variants: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.product.count(),
  ]);

  const totalPages = Math.ceil(totalProducts / limit);

  return (
    <div className="space-y-3 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl text-brand-charcoal mb-0 sm:mb-2">
            Products
          </h1>
          <p className="text-brand-charcoal/60 text-sm sm:text-lg">
            Manage your boutique's catalog and variants.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="group px-3 sm:px-6 py-2 sm:py-3.5 rounded-lg sm:rounded-2xl text-xs sm:text-base font-medium text-white flex items-center justify-center gap-1.5 sm:gap-2 w-fit
                     bg-gradient-to-r from-brand-pink-400 to-brand-purple-400
                     hover:from-brand-pink-500 hover:to-brand-purple-500
                     focus:outline-none focus:ring-2 focus:ring-brand-pink-400 focus:ring-offset-2
                     transition-all duration-300 shadow-md shadow-brand-pink-200/50
                     hover:shadow-lg hover:shadow-brand-pink-300/50 hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-90" />
          Add Product
        </Link>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] shadow-sm border border-brand-pink-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="bg-brand-pink-50/30 text-brand-charcoal/50 text-[9px] sm:text-xs font-bold uppercase tracking-widest border-b border-brand-pink-50/50">
                <th className="px-2 sm:px-6 py-2 sm:py-5">Product</th>
                <th className="px-2 sm:px-6 py-2 sm:py-5">Category</th>
                <th className="px-2 sm:px-6 py-2 sm:py-5 text-center">Variants</th>
                <th className="px-2 sm:px-6 py-2 sm:py-5 text-center">Featured</th>
                <th className="px-2 sm:px-6 py-2 sm:py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-brand-charcoal/50">
                    No products found. Add your first product to the catalog.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="group hover:bg-white/90 transition-colors border-b border-brand-pink-50/50 last:border-0">
                    <td className="px-2 sm:px-6 py-2 sm:py-4">
                      <div className="flex items-center gap-2 sm:gap-4">
                        {product.imageUrl ? (
                          <div className="w-6 h-8 sm:w-12 sm:h-16 rounded-md sm:rounded-xl overflow-hidden shrink-0 border border-brand-pink-50 shadow-sm">
                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-6 h-8 sm:w-12 sm:h-16 rounded-md sm:rounded-xl bg-brand-offwhite shrink-0 border border-brand-pink-50 flex items-center justify-center">
                            <Package className="w-3 h-3 sm:w-5 sm:h-5 text-brand-charcoal/20" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-[10px] sm:text-base text-brand-charcoal group-hover:text-brand-pink-600 transition-colors line-clamp-1">{product.name}</p>
                          <p className="text-[8px] sm:text-xs text-brand-charcoal/40 mt-0.5 sm:mt-1 font-mono">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 sm:px-6 py-2 sm:py-4 text-brand-charcoal/60 text-[10px] sm:text-sm">{product.category.name}</td>
                    <td className="px-2 sm:px-6 py-2 sm:py-4 text-center">
                      <span className="inline-flex items-center justify-center bg-brand-pink-50 text-brand-pink-500 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-xl text-[9px] sm:text-xs font-bold border border-brand-pink-100">
                        {product._count.variants}
                      </span>
                    </td>
                    <td className="px-2 sm:px-6 py-2 sm:py-4 text-center">
                      <form action={async () => {
                        'use server';
                        await toggleFeatured(product.id, !product.featured);
                      }}>
                        <button 
                          type="submit" 
                          className={`p-1 sm:p-2 rounded-md sm:rounded-xl transition-all duration-300 ${
                            product.featured 
                              ? 'text-amber-500 bg-amber-50 hover:bg-amber-100 shadow-sm border border-amber-100' 
                              : 'text-brand-charcoal/20 hover:text-amber-500 hover:bg-amber-50 border border-transparent'
                          }`}
                          title="Toggle Featured"
                        >
                          <Star className={`w-3 h-3 sm:w-4 sm:h-4 ${product.featured ? 'fill-current' : ''}`} />
                        </button>
                      </form>
                    </td>
                    <td className="px-2 sm:px-6 py-2 sm:py-4 text-right">
                      <div className="flex items-center justify-end gap-0.5 sm:gap-2">
                        <Link 
                          href={`/admin/products/${product.id}/edit`}
                          className="p-1 sm:p-2 text-brand-charcoal/30 hover:text-brand-pink-600 hover:bg-brand-pink-50 rounded-lg transition-all duration-300" 
                          title="Edit Product"
                        >
                          <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Link>
                        <form action={async () => {
                          'use server';
                          await deleteProduct(product.id);
                        }}>
                          <button 
                            type="submit" 
                            className="p-1 sm:p-2 text-brand-charcoal/30 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300" 
                            title="Delete Product"
                          >
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      )}
    </div>
  );
}
