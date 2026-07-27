import { verifySession } from '@/lib/dal';
import { prisma } from '@/lib/prisma';
import ProductForm from '../../new/ProductForm';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const t = await getTranslations('AdminEditProduct');
  await verifySession();

  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: { variants: true },
    }),
    prisma.category.findMany({
      orderBy: { name: 'asc' },
    }),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading text-4xl text-brand-charcoal mb-2">
          {t('Title')}
        </h1>
        <p className="text-brand-charcoal/60 text-lg">
          {t('Desc')}
        </p>
      </div>

      <ProductForm categories={categories} initialData={product} />
    </div>
  );
}
