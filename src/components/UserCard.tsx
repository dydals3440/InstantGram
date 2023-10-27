import { SearchUser } from '@/model/user';
import Link from 'next/link';
import React from 'react';
import Avatar from './Avatar';

type Props = {
  user: SearchUser;
};

export default function UserCard({
  user: { name, username, image, following, followers },
}: Props) {
  // prefetching (먼저 보여줄꺼면 Link태그 사용), 나는 검색 결과에서는 prefetching이 퍼포먼스 낭비라 생각하면, 일반 카드 만든 후, 클릭핸들러 처리
  return (
    <Link
      className='flex items-center w-full rounded-sm border-neutral-300 mb-2 p-4 bg-white hover:bg-neutral-50'
      href={`/user/${username}`}
    >
      <Avatar image={image} />
      <div className='text-neutral-500'>
        <p className='text-black font-bold leading-4'>{username}</p>
        <p>{name}</p>
        <p className='text-sm leading-4'>{`${followers} followers ${following} following`}</p>
      </div>
    </Link>
  );
}
