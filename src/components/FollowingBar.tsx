'use client';

import { HomeUser } from '@/model/user';
import Link from 'next/link';
import { PropagateLoader } from 'react-spinners';
import useSWR from 'swr';
import Avatar from './Avatar';
import ScrollableBar from './ui/ScrollableBar';

export default function FollowingBar() {
  const { data, isLoading: loading, error } = useSWR<HomeUser>('/api/me'); //
  // const users = data?.following;
  // const users = undefined;
  const users = data?.following && [
    ...data?.following,
    ...data?.following,
    ...data?.following,
  ];
  return (
    // 화살표가 보이는 것을 해결 전체 컨테이너를 relative라고 지정 후, 그 안에 있는 모든 자식 요소들이 부모요소라 인지시키고, z-0을 만드
    <section className='w-full flex justify-center items-center p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto relative z-0'>
      {loading ? (
        <PropagateLoader size={8} color='red' />
      ) : (
        (!users || users.length === 0) && <p>{`You don't have following`}</p>
      )}
      {users && users.length > 0 && (
        <ScrollableBar>
          {users.map(({ image, username }) => (
            <Link
              key={username}
              className='flex flex-col items-center w-20'
              href={`/user/${username}`}
            >
              <Avatar image={image} highlight />
              {/* ellipsis overflow-hidden 같이 써야함 너비도 꼭 지정해줘야함(넓어질 수 있는 범위는 부모 컨테이너까지, overflow되면 ellipsis하게). */}
              <p className='w-full text-sm text-center text-ellipsis overflow-hidden'>
                {username}
              </p>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}

// 로그인을 하면, 브라우저 자체적으로 로그인 요청을하고 성공적으로 되면 서버에서 부터 응답헤더에 로그인이 잘되었다는 토(쿠키)을 받아옴, 로그인이 한번 성립이 되면, 그 이후에 클라이언트가 백엔드에 보내는 api 요청에 한해서 헤더에 자동으로 서버에서 받아오는 토큰이 붙어져서 함꼐 보내짐
// 1. 클라이언트 컴포넌트에서 백엔드가 api/me 사용자의 정보를 얻어옴
// 2. 백엔드에서는 현재 로그인된 사용자의 세션 정보를 이용해서
// 3. 백엔드에서 사용자의 상세 정보를 Sanity에서 가지고 옴(followings)

// 4. 여기, 클라이언트 컴포넌트에서 followings의 정보를 UI에 보여줌! (image, username)
