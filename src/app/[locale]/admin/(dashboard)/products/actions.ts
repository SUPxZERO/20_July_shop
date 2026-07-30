'use server';

import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/dal';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { uploadImage } from '@/lib/upload';

export async function createProduct(formData: FormData) {
  await verifySession();

  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const categoryId = formData.get('categoryId') as string;
  const description = formData.get('description') as string;
  
  if (!name || !slug || !categoryId) {
    throw new Error('Name, Slug, and Category are required');
  }

  const sizes = formData.getAll('size[]') as string[];
  const colors = formData.getAll('color[]') as string[];
  const materials = formData.getAll('material[]') as string[];
  const inStocks = formData.getAll('inStock[]') as string[];
  const imageFile = formData.get('image') as File | null;

  const imageUrl = await uploadImage(imageFile);

  await prisma.product.create({
    data: {
      name,
      slug,
      categoryId,
      description,
      ...(imageUrl && { imageUrl }),
      variants: {
        create: sizes.map((size, index) => ({
          size: size || null,
          color: colors[index] || null,
          material: materials[index] || null,
          sku: `${slug}-${index}-${Date.now().toString().slice(-4)}`,
          inStock: inStocks[index] === 'true',
        })).filter(v => v.size || v.color || v.material)
      }
    },
  });

  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function updateProduct(id: string, formData: FormData) {
  await verifySession();

  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const categoryId = formData.get('categoryId') as string;
  const description = formData.get('description') as string;

  if (!name || !slug || !categoryId) {
    throw new Error('Name, Slug, and Category are required');
  }

  const variantIds = formData.getAll('variantId[]') as string[];
  const sizes = formData.getAll('size[]') as string[];
  const colors = formData.getAll('color[]') as string[];
  const materials = formData.getAll('material[]') as string[];
  const inStocks = formData.getAll('inStock[]') as string[];
  const imageFile = formData.get('image') as File | null;

  const newImageUrl = await uploadImage(imageFile);

  // Update base product
  await prisma.product.update({
    where: { id },
    data: {
      name,
      slug,
      categoryId,
      description,
      ...(newImageUrl && { imageUrl: newImageUrl }),
    },
  });

  // Handle variants manually
  const existingVariants = await prisma.productVariant.findMany({ where: { productId: id } });
  
  // Find which ones to delete
  const submittedVariantIds = variantIds.filter(vid => !vid.startsWith('new_'));
  const variantsToDelete = existingVariants.filter(v => !submittedVariantIds.includes(v.id));
  
  if (variantsToDelete.length > 0) {
    await prisma.productVariant.deleteMany({
      where: { id: { in: variantsToDelete.map(v => v.id) } }
    });
  }

  // Update or create variants
  for (let i = 0; i < sizes.length; i++) {
    const vid = variantIds[i];
    const size = sizes[i] || null;
    const color = colors[i] || null;
    const material = materials[i] || null;
    const inStock = inStocks[i] === 'true';

    // Only save if it has some data
    if (!size && !color && !material) continue;

    if (vid.startsWith('new_')) {
      // Create new
      await prisma.productVariant.create({
        data: {
          productId: id,
          size,
          color,
          material,
          inStock,
          sku: `${slug}-${i}-${Date.now().toString().slice(-4)}`,
        }
      });
    } else {
      // Update existing
      await prisma.productVariant.update({
        where: { id: vid },
        data: { size, color, material, inStock }
      });
    }
  }

  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function deleteProduct(id: string) {
  await verifySession();
  await prisma.product.delete({ where: { id } });
  revalidatePath('/admin/products');
}

export async function toggleFeatured(productId: string, featured: boolean) {
  await verifySession();
  await prisma.product.update({
    where: { id: productId },
    data: { featured },
  });
  revalidatePath('/admin/products');
}
