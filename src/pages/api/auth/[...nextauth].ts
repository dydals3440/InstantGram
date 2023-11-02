import { addUser } from '@/service/user';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || '',
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user: { id, name, email, image } }) {
      if (!email) {
        // 이메일이 옵셔널일수도 있기에 코드상으로 null일 수 있기에 false로 리턴
        return false;
      }
      addUser({
        id,
        name: name || '',
        email,
        image,
        username: email.split('@')[0],
      });
      return true;
    },
    async session({ session, token }) {
      const user = session?.user;
      if (user) {
        session.user = {
          ...user,
          username: user.email?.split('@')[0] || '',
          id: token.id as string,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};

export default NextAuth(authOptions);
