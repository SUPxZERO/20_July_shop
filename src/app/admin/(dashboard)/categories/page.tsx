import { verifySession } from '@/lib/dal';
import { prisma } from '@/lib/prisma';
import { createCategory, deleteCategory } from './actions';
import { Trash2, Plus, Sparkles, Edit } from 'lucide-react';
import Link from 'next/link';
import { Pagination } from '@/components/Pagination';

interface AdminCategoriesPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CategoriesPage({ searchParams }: AdminCategoriesPageProps) {
  await verifySession();

  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const limit = 10;
  const skip = (currentPage - 1) * limit;

  const [categories, totalCategories] = await prisma.$transaction([
    prisma.category.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.category.count(),
  ]);

  const totalPages = Math.ceil(totalCategories / limit);

  return (
    <div className="space-y-3 sm:space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl text-brand-charcoal mb-0 sm:mb-2">
            Categories
          </h1>
          <p className="text-brand-charcoal/60 text-sm sm:text-lg">
            Manage your store's product categories.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Categories List */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] shadow-sm border border-brand-pink-50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[400px]">
              <thead>
                <tr className="bg-brand-pink-50/30 text-brand-charcoal/50 text-[9px] sm:text-xs font-bold uppercase tracking-widest border-b border-brand-pink-50/50">
                  <th className="px-2 sm:px-6 py-2 sm:py-5">Category</th>
                  <th className="px-2 sm:px-6 py-2 sm:py-5">Slug</th>
                  <th className="px-2 sm:px-6 py-2 sm:py-5 hidden sm:table-cell">Description</th>
                  <th className="px-2 sm:px-6 py-2 sm:py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-16 text-center text-brand-charcoal/50">
                      No categories found. Create one to get started.
                    </td>
                  </tr>
                ) : (
                  categories.map((category) => (
                    <tr key={category.id} className="group hover:bg-white/90 transition-colors border-b border-brand-pink-50/50 last:border-0">
                      <td className="px-2 sm:px-6 py-2 sm:py-4">
                        <div className="flex items-center gap-2 sm:gap-4">
                          {category.imageUrl ? (
                            <div className="w-6 h-6 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl overflow-hidden shrink-0 border border-brand-pink-50 shadow-sm">
                              <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-brand-offwhite shrink-0 border border-brand-pink-50 flex items-center justify-center">
                              <span className="text-brand-charcoal/20 text-[6px] sm:text-[10px] uppercase font-bold">Img</span>
                            </div>
                          )}
                          <span className="font-medium text-[10px] sm:text-base text-brand-charcoal group-hover:text-brand-pink-600 transition-colors line-clamp-1">{category.name}</span>
                        </div>
                      </td>
                      <td className="px-2 sm:px-6 py-2 sm:py-4 text-brand-charcoal/50 text-[9px] sm:text-sm font-mono max-w-[80px] sm:max-w-[100px] truncate">{category.slug}</td>
                      <td className="px-2 sm:px-6 py-2 sm:py-4 text-brand-charcoal/50 text-[9px] sm:text-sm max-w-[200px] truncate hidden sm:table-cell">
                        {category.description || '-'}
                      </td>
                      <td className="px-2 sm:px-6 py-2 sm:py-4 text-right">
                        <div className="flex items-center justify-end gap-0.5 sm:gap-2">
                          <Link 
                            href={`/admin/categories/${category.id}/edit`}
                            className="p-1 sm:p-2 text-brand-charcoal/30 hover:text-brand-pink-600 hover:bg-brand-pink-50 rounded-lg transition-all duration-300" 
                            title="Edit Category"
                          >
                            <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Link>
                          <form action={async () => {
                            'use server';
                            await deleteCategory(category.id);
                          }}>
                            <button 
                              type="submit" 
                              className="p-1 sm:p-2 text-brand-charcoal/30 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300" 
                              title="Delete Category"
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
          
          {totalPages > 1 && (
            <div className="p-6 border-t border-brand-pink-50/50 bg-white/50">
              <Pagination totalPages={totalPages} currentPage={currentPage} />
            </div>
          )}
        </div>

        {/* Add New Category Form */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm border border-white h-fit">
          <div className="flex items-center gap-1.5 sm:gap-3 mb-3 sm:mb-6">
            <div className="p-1 sm:p-2 bg-brand-pink-50 text-brand-pink-500 rounded-lg sm:rounded-xl">
              <Sparkles className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
            </div>
            <h2 className="font-heading text-lg sm:text-2xl text-brand-charcoal">New Category</h2>
          </div>
          
          <form action={createCategory} className="space-y-3 sm:space-y-5">
            <div>
              <label htmlFor="name" className="block text-[10px] sm:text-sm font-medium text-brand-charcoal/80 mb-0.5 sm:mb-1.5 ml-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="e.g., Summer Dresses"
                className="w-full px-2 sm:px-4 py-1.5 sm:py-3 rounded-lg sm:rounded-2xl border border-brand-pink-100 bg-white/50 focus:bg-white
                           focus:outline-none focus:ring-2 focus:ring-brand-pink-400 focus:border-brand-pink-400
                           text-[10px] sm:text-sm text-brand-charcoal placeholder:text-brand-charcoal/30 transition-all duration-300"
              />
            </div>
            <div>
              <label htmlFor="slug" className="block text-[10px] sm:text-sm font-medium text-brand-charcoal/80 mb-0.5 sm:mb-1.5 ml-1">
                Slug
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                required
                placeholder="e.g., summer-dresses"
                className="w-full px-2 sm:px-4 py-1.5 sm:py-3 rounded-lg sm:rounded-2xl border border-brand-pink-100 bg-white/50 focus:bg-white
                           focus:outline-none focus:ring-2 focus:ring-brand-pink-400 focus:border-brand-pink-400
                           text-[10px] sm:text-sm text-brand-charcoal placeholder:text-brand-charcoal/30 transition-all duration-300"
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-[10px] sm:text-sm font-medium text-brand-charcoal/80 mb-0.5 sm:mb-1.5 ml-1">
                Category Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="w-full px-2 sm:px-4 py-1.5 sm:py-3 rounded-lg sm:rounded-2xl border border-brand-pink-100 bg-white/50 focus:bg-white
                           focus:outline-none focus:ring-2 focus:ring-brand-pink-400 focus:border-brand-pink-400
                           text-[10px] sm:text-sm text-brand-charcoal transition-all duration-300 file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4
                           file:rounded-lg sm:file:rounded-xl file:border-0 file:text-[8px] sm:file:text-sm file:font-semibold
                           file:bg-brand-pink-50 file:text-brand-pink-600 hover:file:bg-brand-pink-100 cursor-pointer"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-[10px] sm:text-sm font-medium text-brand-charcoal/80 mb-0.5 sm:mb-1.5 ml-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={2}
                placeholder="Brief description..."
                className="w-full px-2 sm:px-4 py-1.5 sm:py-3 rounded-lg sm:rounded-2xl border border-brand-pink-100 bg-white/50 focus:bg-white
                           focus:outline-none focus:ring-2 focus:ring-brand-pink-400 focus:border-brand-pink-400
                           text-[10px] sm:text-sm text-brand-charcoal placeholder:text-brand-charcoal/30 transition-all duration-300 resize-none sm:rows-3"
              ></textarea>
            </div>
            <button
              type="submit"
              className="group w-full py-2 sm:py-3.5 rounded-lg sm:rounded-2xl text-[10px] sm:text-base font-medium text-white flex items-center justify-center gap-1.5 sm:gap-2
                         bg-gradient-to-r from-brand-pink-400 to-brand-purple-400
                         hover:from-brand-pink-500 hover:to-brand-purple-500
                         focus:outline-none focus:ring-2 focus:ring-brand-pink-400 focus:ring-offset-2
                         transition-all duration-300 shadow-md shadow-brand-pink-200/50
                         hover:shadow-lg hover:shadow-brand-pink-300/50 hover:-translate-y-0.5"
            >
              <Plus className="w-3.5 h-3.5 sm:w-5 sm:h-5 transition-transform group-hover:rotate-90" />
              Create Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
