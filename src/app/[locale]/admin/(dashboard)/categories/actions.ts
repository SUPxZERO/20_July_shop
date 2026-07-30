'use server';

import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/dal';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { uploadImage } from '@/lib/upload';

export async function createCategory(formData: FormData) {
  await verifySession();

  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;
  const imageFile = formData.get('image') as File | null;

  if (!name || !slug) {
    throw new Error('Name and Slug are required');
  }

  const imageUrl = await uploadImage(imageFile);

  await prisma.category.create({
    data: {
      name,
      slug,
      description,
      ...(imageUrl && { imageUrl }),
    },
  });

  revalidatePath('/admin/categories');
}

export async function updateCategory(id: string, formData: FormData) {
  await verifySession();

  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;
  const imageFile = formData.get('image') as File | null;

  if (!name || !slug) {
    throw new Error('Name and Slug are required');
  }

  const newImageUrl = await uploadImage(imageFile);

  await prisma.category.update({
    where: { id },
    data: {
      name,
      slug,
      description,
      ...(newImageUrl && { imageUrl: newImageUrl }),
    },
  });

  revalidatePath('/admin/categories');
  redirect('/admin/categories');
}

export async function deleteCategory(id: string) {
  await verifySession();

  await prisma.category.delete({
    where: { id },
  });

  revalidatePath('/admin/categories');
}
