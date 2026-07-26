import 'server-only';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { cache } from 'react';

export const verifySession = cache(async () => {
  const session = await auth();

  if (!session?.user) {
    redirect('/admin/login');
  }

  return session;
});
