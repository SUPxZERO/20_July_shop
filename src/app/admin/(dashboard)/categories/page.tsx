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
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-heading text-4xl text-brand-charcoal mb-2">
            Categories
          </h1>
          <p className="text-brand-charcoal/60 text-lg">
            Manage your store's product categories.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Categories List */}
        <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl rounded-3xl shadow-sm border border-white overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-pink-50/50 text-brand-charcoal/50 text-xs uppercase tracking-widest">
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Image</th>
                <th className="px-6 py-4 font-semibold">Slug</th>
                <th className="px-6 py-4 font-semibold">Description</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-brand-charcoal/50">
                    No categories found. Create one to get started.
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id} className="group hover:bg-white/50 transition-colors border-b border-brand-pink-50/50 last:border-0">
                    <td className="px-6 py-4 font-medium text-brand-charcoal">{category.name}</td>
                    <td className="px-6 py-4">
                      {category.imageUrl ? (
                        <div className="w-12 h-12 rounded-lg overflow-hidden relative">
                          <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <span className="text-brand-charcoal/40 text-xs">No image</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-brand-charcoal/60 text-sm">{category.slug}</td>
                    <td className="px-6 py-4 text-brand-charcoal/60 text-sm max-w-[200px] truncate">
                      {category.description}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/categories/${category.id}/edit`}
                          className="p-2.5 text-brand-charcoal/40 hover:text-brand-pink-600 hover:bg-brand-pink-50 rounded-xl transition-all duration-300" 
                          title="Edit Category"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <form action={async () => {
                          'use server';
                          await deleteCategory(category.id);
                        }}>
                          <button 
                            type="submit" 
                            className="p-2.5 text-brand-charcoal/40 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300" 
                            title="Delete Category"
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
          
          {totalPages > 1 && (
            <div className="p-6 border-t border-brand-pink-50/50">
              <Pagination totalPages={totalPages} currentPage={currentPage} />
            </div>
          )}
        </div>

        {/* Add New Category Form */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-white h-fit">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-brand-pink-50 text-brand-pink-500 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="font-heading text-2xl text-brand-charcoal">New Category</h2>
          </div>
          
          <form action={createCategory} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-brand-charcoal/80 mb-1.5 ml-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="e.g., Summer Dresses"
                className="w-full px-4 py-3 rounded-2xl border border-brand-pink-100 bg-white/50 focus:bg-white
                           focus:outline-none focus:ring-2 focus:ring-brand-pink-400 focus:border-brand-pink-400
                           text-brand-charcoal placeholder:text-brand-charcoal/30 transition-all duration-300"
              />
            </div>
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-brand-charcoal/80 mb-1.5 ml-1">
                Slug
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                required
                placeholder="e.g., summer-dresses"
                className="w-full px-4 py-3 rounded-2xl border border-brand-pink-100 bg-white/50 focus:bg-white
                           focus:outline-none focus:ring-2 focus:ring-brand-pink-400 focus:border-brand-pink-400
                           text-brand-charcoal placeholder:text-brand-charcoal/30 transition-all duration-300"
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-brand-charcoal/80 mb-1.5 ml-1">
                Category Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="w-full px-4 py-3 rounded-2xl border border-brand-pink-100 bg-white/50 focus:bg-white
                           focus:outline-none focus:ring-2 focus:ring-brand-pink-400 focus:border-brand-pink-400
                           text-brand-charcoal transition-all duration-300 file:mr-4 file:py-2 file:px-4
                           file:rounded-xl file:border-0 file:text-sm file:font-semibold
                           file:bg-brand-pink-50 file:text-brand-pink-600 hover:file:bg-brand-pink-100"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-brand-charcoal/80 mb-1.5 ml-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                placeholder="Brief description of the category..."
                className="w-full px-4 py-3 rounded-2xl border border-brand-pink-100 bg-white/50 focus:bg-white
                           focus:outline-none focus:ring-2 focus:ring-brand-pink-400 focus:border-brand-pink-400
                           text-brand-charcoal placeholder:text-brand-charcoal/30 transition-all duration-300 resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="group w-full py-3.5 rounded-2xl font-medium text-white flex items-center justify-center gap-2
                         bg-gradient-to-r from-brand-pink-400 to-brand-purple-400
                         hover:from-brand-pink-500 hover:to-brand-purple-500
                         focus:outline-none focus:ring-2 focus:ring-brand-pink-400 focus:ring-offset-2
                         transition-all duration-300 shadow-md shadow-brand-pink-200/50
                         hover:shadow-lg hover:shadow-brand-pink-300/50 hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
              Create Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
