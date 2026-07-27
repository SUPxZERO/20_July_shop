import { verifySession } from '@/lib/dal';
import { prisma } from '@/lib/prisma';
import ProductForm from './ProductForm';
import { getTranslations } from 'next-intl/server';

export default async function NewProductPage() {
  const t = await getTranslations('AdminNewProduct');
  await verifySession();

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading text-3xl text-brand-charcoal mb-2">
          {t('Title')}
        </h1>
        <p className="text-brand-charcoal/50">
          {t('Desc')}
        </p>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}
