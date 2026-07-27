'use client';

import { useRouter, usePathname } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Combobox } from './Combobox';

interface ShopFiltersProps {
  categories: { id: string; name: string; slug: string }[];
  sizes: string[];
  colors: string[];
  materials: string[];
}

export function ShopFilters({ categories, sizes, colors, materials }: ShopFiltersProps) {
  const t = useTranslations('ShopFilters');
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      params.delete('page'); // Reset to page 1 on filter change
      return params.toString();
    },
    [searchParams]
  );

  const currentCategory = searchParams.get('category') || '';
  const currentSize = searchParams.get('size') || '';
  const currentColor = searchParams.get('color') || '';
  const currentMaterial = searchParams.get('material') || '';

  const categoryOptions = categories.map(c => ({ value: c.slug, label: c.name }));
  const sizeOptions = sizes.map(s => ({ value: s, label: s }));
  const colorOptions = colors.map(c => ({ value: c, label: c }));
  const materialOptions = materials.map(m => ({ value: m, label: m }));

  const hasActiveFilters = currentCategory || currentSize || currentColor || currentMaterial;

  return (
    <div className="flex flex-nowrap overflow-x-auto gap-2 sm:gap-4 mb-4 sm:mb-12 items-center p-3 sm:p-6 bg-white rounded-2xl sm:rounded-3xl border border-brand-pink-100 shadow-sm relative z-20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      
      <Combobox 
        label={t('Category')} 
        options={categoryOptions} 
        value={currentCategory} 
        onChange={(val) => router.push(`/shop?${createQueryString('category', val)}`)} 
        placeholder={t('AnyCategory')}
      />

      {sizeOptions.length > 0 && (
        <Combobox 
          label={t('Size')} 
          options={sizeOptions} 
          value={currentSize} 
          onChange={(val) => router.push(`/shop?${createQueryString('size', val)}`)} 
          placeholder={t('AnySize')}
        />
      )}

      {colorOptions.length > 0 && (
        <Combobox 
          label={t('Color')} 
          options={colorOptions} 
          value={currentColor} 
          onChange={(val) => router.push(`/shop?${createQueryString('color', val)}`)} 
          placeholder={t('AnyColor')}
        />
      )}

      {materialOptions.length > 0 && (
        <Combobox 
          label={t('Material')} 
          options={materialOptions} 
          value={currentMaterial} 
          onChange={(val) => router.push(`/shop?${createQueryString('material', val)}`)} 
          placeholder={t('AnyMaterial')}
        />
      )}

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <div className="flex flex-col gap-1.5 w-auto shrink-0 ml-auto">
          <button
            onClick={() => router.push('/shop')}
            className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-brand-charcoal text-white hover:bg-black transition-colors h-[36px] sm:h-[42px] flex items-center justify-center shadow-md shadow-brand-charcoal/20"
          >
            <span>{t('ClearFilters')}</span>
          </button>
        </div>
      )}
    </div>
  );
}
