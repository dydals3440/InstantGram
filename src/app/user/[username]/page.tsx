import UserPosts from '@/components/UserPosts';
import UserProfile from '@/components/UserProfile';
import { getUserForProfile } from '@/service/user';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React, { cache } from 'react';

type Props = { params: { username: string } };

// 여러번 호출하기 떄문에, 한번만 사용되게 cache를 사용함 메타데이터에서도 호출하기 떄문
const getUser = cache(async (username: string) => getUserForProfile(username));

export default async function UserPage({ params: { username } }: Props) {
  // 상단: 사용자의 프로필 이미지와 정보(username, name, 숫자)
  // 하단: 3개의 탭 (posts, liked, bookmarks)

  const user = await getUser(username);

  if (!user) {
    notFound();
  }
  return (
    <section className='w-full'>
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
}

export async function generateMetadata({
  params: { username },
}: Props): Promise<Metadata> {
  const user = await getUser(username);
  return {
    title: `${user?.name} (@${user?.username}) Instantgram Photos`,
    description: `${user?.name}'s all Instagram posts`,
  };
}
