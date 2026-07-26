import { auth } from '@/lib/auth';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
  const isLoginPage = req.nextUrl.pathname === '/admin/login';

  if (isAdminRoute && !isLoginPage && !isLoggedIn) {
    return Response.redirect(new URL('/admin/login', req.nextUrl));
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
