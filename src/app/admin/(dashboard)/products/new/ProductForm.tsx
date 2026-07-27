'use client';

import { useState } from 'react';
import { createProduct, updateProduct } from '../actions';
import { Plus, Trash2, Save, ArrowLeft, PackageCheck, PackageX } from 'lucide-react';
import Link from 'next/link';
import ColorInput from './ColorInput';

type Category = {
  id: string;
  name: string;
};

type ProductVariant = {
  id: string;
  size: string | null;
  color: string | null;
  material: string | null;
  inStock: boolean;
};

type InitialData = {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  description: string | null;
  variants: ProductVariant[];
};

export default function ProductForm({ categories, initialData }: { categories: Category[], initialData?: InitialData }) {
  // If no initialData, we start with one empty variant. If editing, load the existing ones.
  const [variants, setVariants] = useState<ProductVariant[]>(
    initialData?.variants?.length 
      ? initialData.variants 
      : [{ id: `new_${Date.now()}`, size: '', color: '', material: '', inStock: true }]
  );

  const addVariant = () => {
    setVariants([...variants, { id: `new_${Date.now()}`, size: '', color: '', material: '', inStock: true }]);
  };

  const removeVariant = (id: string) => {
    if (variants.length > 1) {
      setVariants(variants.filter((v) => v.id !== id));
    }
  };

  const toggleInStock = (id: string) => {
    setVariants(variants.map(v => v.id === id ? { ...v, inStock: !v.inStock } : v));
  };

  const formAction = initialData ? updateProduct.bind(null, initialData.id) : createProduct;

  return (
    <form action={formAction} className="space-y-8">
      {/* Basic Info */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-8 shadow-sm border border-white">
        <h2 className="font-heading text-lg sm:text-2xl text-brand-charcoal mb-3 sm:mb-6 border-b border-brand-pink-50 pb-2 sm:pb-4">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
          <div className="space-y-0.5 sm:space-y-1.5">
            <label htmlFor="name" className="text-[10px] sm:text-sm font-medium text-brand-charcoal/80 ml-1">Product Name</label>
            <input type="text" id="name" name="name" defaultValue={initialData?.name} required className="w-full px-2 sm:px-4 py-1.5 sm:py-3 rounded-lg sm:rounded-2xl border border-brand-pink-100 bg-white/50 focus:bg-white focus:ring-2 focus:ring-brand-pink-400 outline-none transition-all text-[10px] sm:text-base" placeholder="e.g., Silk Evening Gown" />
          </div>
          <div className="space-y-0.5 sm:space-y-1.5">
            <label htmlFor="slug" className="text-[10px] sm:text-sm font-medium text-brand-charcoal/80 ml-1">Slug (URL friendly)</label>
            <input type="text" id="slug" name="slug" defaultValue={initialData?.slug} required className="w-full px-2 sm:px-4 py-1.5 sm:py-3 rounded-lg sm:rounded-2xl border border-brand-pink-100 bg-white/50 focus:bg-white focus:ring-2 focus:ring-brand-pink-400 outline-none transition-all text-[10px] sm:text-base" placeholder="e.g., silk-evening-gown" />
          </div>
          <div className="space-y-0.5 sm:space-y-1.5">
            <label htmlFor="categoryId" className="text-[10px] sm:text-sm font-medium text-brand-charcoal/80 ml-1">Category</label>
            <select id="categoryId" name="categoryId" defaultValue={initialData?.categoryId} required className="w-full px-2 sm:px-4 py-1.5 sm:py-3 rounded-lg sm:rounded-2xl border border-brand-pink-100 bg-white/50 focus:bg-white focus:ring-2 focus:ring-brand-pink-400 outline-none transition-all text-[10px] sm:text-base">
              <option value="">Select a category...</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-0.5 sm:space-y-1.5">
            <label htmlFor="image" className="text-[10px] sm:text-sm font-medium text-brand-charcoal/80 ml-1">
              Product Image {initialData && <span className="text-brand-charcoal/40 text-[8px] sm:text-xs">(Leave blank to keep current)</span>}
            </label>
              <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="w-full px-2 sm:px-4 py-1.5 sm:py-[9px] rounded-lg sm:rounded-2xl border border-brand-pink-100 bg-white/50 focus:bg-white
                         focus:outline-none focus:ring-2 focus:ring-brand-pink-400 transition-all text-[10px] sm:text-sm
                         file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-md sm:file:rounded-xl file:border-0 file:text-[8px] sm:file:text-xs file:font-semibold
                         file:bg-brand-pink-50 file:text-brand-pink-600 hover:file:bg-brand-pink-100 cursor-pointer"
            />
          </div>
          <div className="space-y-0.5 sm:space-y-1.5 md:col-span-2">
            <label htmlFor="description" className="text-[10px] sm:text-sm font-medium text-brand-charcoal/80 ml-1">Description</label>
            <textarea id="description" name="description" defaultValue={initialData?.description || ''} rows={4} className="w-full px-2 sm:px-4 py-1.5 sm:py-3 rounded-lg sm:rounded-2xl border border-brand-pink-100 bg-white/50 focus:bg-white focus:ring-2 focus:ring-brand-pink-400 outline-none transition-all resize-none text-[10px] sm:text-base" placeholder="Product details..."></textarea>
          </div>
        </div>
      </div>

      {/* Variants */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-8 shadow-sm border border-white">
        <div className="flex items-center justify-between border-b border-brand-pink-50 pb-2 sm:pb-4 mb-3 sm:mb-6">
          <h2 className="font-heading text-lg sm:text-2xl text-brand-charcoal">
            Product Variants
          </h2>
          <button type="button" onClick={addVariant} className="text-brand-pink-600 hover:text-white font-medium text-[10px] sm:text-sm flex items-center gap-1 bg-brand-pink-50 hover:bg-brand-pink-500 px-2 sm:px-4 py-1 sm:py-2 rounded-md sm:rounded-xl transition-all duration-300">
            <Plus className="w-3 h-3 sm:w-4 sm:h-4" /> Add Variant
          </button>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {variants.map((variant, index) => (
            <div key={variant.id} className="flex flex-col lg:flex-row gap-3 sm:gap-6 items-start lg:items-center bg-white/50 p-2 sm:p-6 rounded-lg sm:rounded-2xl border border-brand-pink-100/50 shadow-sm transition-all hover:shadow-md">
              <input type="hidden" name="variantId[]" value={variant.id} />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4 flex-1 w-full">
                <div className="space-y-0.5 sm:space-y-1.5">
                  <label className="text-[8px] sm:text-[10px] font-bold text-brand-charcoal/40 uppercase tracking-widest ml-1">Size</label>
                  <input type="text" name="size[]" defaultValue={variant.size || ''} className="w-full px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-md sm:rounded-xl border border-brand-pink-100 bg-white focus:ring-2 focus:ring-brand-pink-300 outline-none text-[10px] sm:text-sm transition-all" placeholder="e.g., M, L" />
                </div>
                <div className="space-y-0.5 sm:space-y-1.5">
                  <label className="text-[8px] sm:text-[10px] font-bold text-brand-charcoal/40 uppercase tracking-widest ml-1">Color</label>
                  <ColorInput name="color[]" defaultValue={variant.color || ''} />
                </div>
                <div className="space-y-0.5 sm:space-y-1.5">
                  <label className="text-[8px] sm:text-[10px] font-bold text-brand-charcoal/40 uppercase tracking-widest ml-1">Material</label>
                  <input type="text" name="material[]" defaultValue={variant.material || ''} className="w-full px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-md sm:rounded-xl border border-brand-pink-100 bg-white focus:ring-2 focus:ring-brand-pink-300 outline-none text-[10px] sm:text-sm transition-all" placeholder="e.g., Cotton" />
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 sm:gap-3 w-full lg:w-auto pt-1 lg:pt-5 border-t border-brand-pink-50 lg:border-t-0">
                <input type="hidden" name="inStock[]" value={variant.inStock ? 'true' : 'false'} />
                
                <button
                  type="button"
                  onClick={() => toggleInStock(variant.id)}
                  className={`flex-1 lg:flex-none flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-md sm:rounded-xl text-[10px] sm:text-sm font-medium transition-all duration-300 ${
                    variant.inStock 
                      ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' 
                      : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                  }`}
                >
                  {variant.inStock ? <PackageCheck className="w-3 h-3 sm:w-4 sm:h-4" /> : <PackageX className="w-3 h-3 sm:w-4 sm:h-4" />}
                  {variant.inStock ? 'In Stock' : 'Out of Stock'}
                </button>

                {variants.length > 1 && (
                  <button type="button" onClick={() => removeVariant(variant.id)} className="p-1.5 sm:p-2.5 text-brand-charcoal/30 hover:text-red-500 hover:bg-red-50 rounded-md sm:rounded-xl transition-all duration-300" title="Remove Variant">
                    <Trash2 className="w-3 h-3 sm:w-5 sm:h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2 sm:gap-4 pt-0 sm:pt-4 pb-8 sm:pb-12">
        <Link href="/admin/products" className="px-3 sm:px-6 py-1.5 sm:py-3 rounded-lg sm:rounded-2xl font-medium text-brand-charcoal/70 hover:bg-white/80 transition-colors flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-base">
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" /> Cancel
        </Link>
        <button type="submit" className="group px-4 sm:px-8 py-1.5 sm:py-3 rounded-lg sm:rounded-2xl font-medium text-white flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-brand-pink-400 to-brand-purple-400 hover:from-brand-pink-500 hover:to-brand-purple-500 transition-all duration-300 shadow-md shadow-brand-pink-200/50 hover:shadow-lg hover:shadow-brand-pink-300/50 hover:-translate-y-0.5 text-[10px] sm:text-base">
          <Save className="w-3 h-3 sm:w-4 sm:h-4" /> {initialData ? 'Save' : 'Create Product'}
        </button>
      </div>
    </form>
  );
}
