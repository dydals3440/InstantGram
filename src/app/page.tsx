import FollowingBar from '@/components/FollowingBar';
import PostList from '@/components/PostList';
import SideBar from '@/components/SideBar';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

// SSR임, 사용자에게 요청이 올 떄마다, 이 페이지를 만듬. 현재 로그인한 사용자의 정보를 확인해야 하기 떄문 SSG아님. 홈페이지에는 로그인한 사용자가 없다면 의미있는 데이터를 보여주기 힘들기 떄문, 홈페이지 자체적으로는 SSR로 행동. (SideBar는 서버 컴포넌트로)
export default async function HomePage() {
  // Login User Info
  const session = await getServerSession(authOptions);
  // session(O) => user
  const user = session?.user;
  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <section className='w-full flex flex-col md:flex-row max-w-[850px] p-4'>
      <div className='w-full basis-3/4'>
        {/* 두개의 컴포넌트는 세션에 들어있는 사용자의 정보만으로는 충분하지않음, 누구를 팔로잉하고있는지, 팔로잉하고있는 사람들의 postList를 받아와야함, SSR로 할껀지(서버처리 or 컴포넌트 내부에서 부분적으로 CSR까지 함께) */}
        <FollowingBar />
        <PostList />
      </div>
      <div className='basis-1/4'>
        <SideBar user={user} />
      </div>
    </section>
  );
}

// NAVBAR SIDEBAR 같이 정적인 부분은 SSR로 효울적으로(html을 사용자에게 먼저 보내줌)
// Following Bar, PostList는 각각 개별적인 데이터를 가져와야하므로, 전체적인 페이지를 SSR로 가져가면 과부하, 이 두개는, CSR이 되도록, 만들어볼 것 (그래도, 정적인 부분들은 프리렌더링 해줄 것)
