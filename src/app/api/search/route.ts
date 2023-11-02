import { searchUsers } from '@/service/user';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return searchUsers().then((data) => NextResponse.json(data));
}

// SSG 정적인 코드이기 떄문에 next에서 제공해주는 fetch를 안쓰기 떄문 그래서 Force-dynamic thrtjdwlwjd
