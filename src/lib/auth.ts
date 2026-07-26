import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'admin@20julyshop.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter your email and password');
        }

        const admin = await prisma.adminUser.findUnique({
          where: { email: credentials.email as string },
        });

        if (!admin) {
          throw new Error('No admin account found with this email');
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          admin.password
        );

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        return {
          id: admin.id,
          email: admin.email,
          name: admin.name,
        };
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
});
