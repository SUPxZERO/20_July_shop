import { verifySession } from '@/lib/dal';
import { prisma } from '@/lib/prisma';
import { deleteProduct, toggleFeatured } from './actions';
import { Trash2, Plus, Star, Edit } from 'lucide-react';
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
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-4xl text-brand-charcoal mb-2">
            Products
          </h1>
          <p className="text-brand-charcoal/60 text-lg">
            Manage your boutique's catalog and variants.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="group px-6 py-3.5 rounded-2xl font-medium text-white flex items-center justify-center gap-2
                     bg-gradient-to-r from-brand-pink-400 to-brand-purple-400
                     hover:from-brand-pink-500 hover:to-brand-purple-500
                     focus:outline-none focus:ring-2 focus:ring-brand-pink-400 focus:ring-offset-2
                     transition-all duration-300 shadow-md shadow-brand-pink-200/50
                     hover:shadow-lg hover:shadow-brand-pink-300/50 hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
          Add Product
        </Link>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-sm border border-white overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-brand-pink-50/50 text-brand-charcoal/50 text-xs uppercase tracking-widest">
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold text-center">Variants</th>
              <th className="px-6 py-4 font-semibold text-center">Featured</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-brand-charcoal/50">
                  No products found. Add your first product to the catalog.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="group hover:bg-white/50 transition-colors border-b border-brand-pink-50/50 last:border-0">
                  <td className="px-6 py-4">
                    <p className="font-medium text-brand-charcoal">{product.name}</p>
                    <p className="text-xs text-brand-charcoal/40 mt-1">{product.slug}</p>
                  </td>
                  <td className="px-6 py-4 text-brand-charcoal/60">{product.category.name}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center bg-brand-pink-50 text-brand-pink-500 px-3 py-1 rounded-xl text-sm font-medium border border-brand-pink-100">
                      {product._count.variants}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <form action={async () => {
                      'use server';
                      await toggleFeatured(product.id, !product.featured);
                    }}>
                      <button 
                        type="submit" 
                        className={`p-2.5 rounded-xl transition-all duration-300 ${
                          product.featured 
                            ? 'text-amber-500 bg-amber-50 hover:bg-amber-100 shadow-sm' 
                            : 'text-brand-charcoal/20 hover:text-amber-500 hover:bg-amber-50'
                        }`}
                        title="Toggle Featured"
                      >
                        <Star className={`w-5 h-5 ${product.featured ? 'fill-current' : ''}`} />
                      </button>
                    </form>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/admin/products/${product.id}/edit`}
                        className="p-2.5 text-brand-charcoal/40 hover:text-brand-pink-600 hover:bg-brand-pink-50 rounded-xl transition-all duration-300" 
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <form action={async () => {
                        'use server';
                        await deleteProduct(product.id);
                      }}>
                        <button 
                          type="submit" 
                          className="p-2.5 text-brand-charcoal/40 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300" 
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {totalPages > 1 && (
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      )}
    </div>
  );
}
