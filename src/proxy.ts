import { auth } from '@/lib/auth';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const pathname = req.nextUrl.pathname;
  
  // Update path checks to account for potential locale prefix
  const isAdminRoute = /^\/(en|km)\/admin/.test(pathname) || pathname.startsWith('/admin');
  const isLoginPage = /^\/(en|km)\/admin\/login/.test(pathname) || pathname === '/admin/login';

  if (isAdminRoute && !isLoginPage && !isLoggedIn) {
    const locale = pathname.match(/^\/(en|km)/)?.[1] || 'en';
    return Response.redirect(new URL(`/${locale}/admin/login`, req.nextUrl));
  }

  // Pass to next-intl for localization routing
  return intlMiddleware(req as unknown as NextRequest);
});

export const config = {
  // Match all paths except api, static files, images, favicon, and files with extensions (like .png, .svg)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
