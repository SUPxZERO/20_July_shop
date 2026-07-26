import { verifySession } from '@/lib/dal';
import { prisma } from '@/lib/prisma';
import { updateCategory } from '../../actions';
import { Save, ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  await verifySession();
  
  const { id } = await params;

  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    notFound();
  }

  // We have to bind the ID to the action
  const updateCategoryWithId = updateCategory.bind(null, category.id);

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading text-4xl text-brand-charcoal mb-2">
          Edit Category
        </h1>
        <p className="text-brand-charcoal/60 text-lg">
          Update the details for this category.
        </p>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-white h-fit">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-brand-pink-50 text-brand-pink-500 rounded-xl">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="font-heading text-2xl text-brand-charcoal">Category Details</h2>
        </div>
        
        <form action={updateCategoryWithId} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-brand-charcoal/80 mb-1.5 ml-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={category.name}
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
              defaultValue={category.slug}
              required
              placeholder="e.g., summer-dresses"
              className="w-full px-4 py-3 rounded-2xl border border-brand-pink-100 bg-white/50 focus:bg-white
                         focus:outline-none focus:ring-2 focus:ring-brand-pink-400 focus:border-brand-pink-400
                         text-brand-charcoal placeholder:text-brand-charcoal/30 transition-all duration-300"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-brand-charcoal/80 mb-1.5 ml-1">
              Category Image {category.imageUrl && '(Upload a new image to replace)'}
            </label>
            {category.imageUrl && (
              <div className="mb-3 w-32 h-32 rounded-xl overflow-hidden border border-brand-pink-100">
                <img src={category.imageUrl} alt="Current category" className="w-full h-full object-cover" />
              </div>
            )}
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
              defaultValue={category.description || ''}
              rows={4}
              placeholder="Brief description of the category..."
              className="w-full px-4 py-3 rounded-2xl border border-brand-pink-100 bg-white/50 focus:bg-white
                         focus:outline-none focus:ring-2 focus:ring-brand-pink-400 focus:border-brand-pink-400
                         text-brand-charcoal placeholder:text-brand-charcoal/30 transition-all duration-300 resize-none"
            ></textarea>
          </div>
          
          <div className="flex items-center justify-end gap-4 pt-4">
            <Link href="/admin/categories" className="px-6 py-3 rounded-2xl font-medium text-brand-charcoal/70 hover:bg-white/80 transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Cancel
            </Link>
            <button
              type="submit"
              className="group px-8 py-3 rounded-2xl font-medium text-white flex items-center justify-center gap-2
                         bg-gradient-to-r from-brand-pink-400 to-brand-purple-400
                         hover:from-brand-pink-500 hover:to-brand-purple-500
                         focus:outline-none focus:ring-2 focus:ring-brand-pink-400 focus:ring-offset-2
                         transition-all duration-300 shadow-md shadow-brand-pink-200/50
                         hover:shadow-lg hover:shadow-brand-pink-300/50 hover:-translate-y-0.5"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
