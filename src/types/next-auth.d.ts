import { AuthUser } from '@/model/user';
// import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    // 기존 user 타입에, username을 추가해줌
    // user: {
    //   username: string;
    // } & DefaultSession['user'];
    user: AuthUser;
  }
}
