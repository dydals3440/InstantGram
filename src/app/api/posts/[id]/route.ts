import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getFollowingPostsOf, getPost } from '@/service/posts';
import { getUserByUsername } from '@/service/user';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: { id: string };
};

// client상에서, 로그인한 세션 정보에는 사용자에 대한 실질적인 정보가없음(following, bookmark 등)
export async function GET(request: NextRequest, context: Context) {
  // token으로 유저가 누군지 파싱
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    // 401 unAuthorized Error
    return new Response('Authentication Error', { status: 401 });
  }
  // 유효한 사용자가 있다면
  return getPost(context.params.id) //
    .then((data) => NextResponse.json(data));
}
