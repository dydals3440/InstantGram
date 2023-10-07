'use client';

import useSWR from 'swr';

export default function FollowingBar() {
  const { data, isLoading, error } = useSWR('/api/me');
  console.log(data);

  // 1. 클라이언트 컴포넌트에서 백엔드가 api/me 사용자의 정보를 얻어옴
  // 2. 백엔드에서는 현재 로그인된 사용자의 세션 정보를 이용해서
  // 3. 백엔드에서 사용자의 상세 정보를 Sanity에서 가지고 옴(followings)
  // 4. 여기, 클라이언트 컴포넌트에서 followings의 정보를 UI에 보여줌! (image, username)

  return <div>FollowingBar</div>;
}

// 로그인을 하면, 브라우저 자체적으로 로그인 요청을하고 성공적으로 되면 서버에서 부터 응답헤더에 로그인이 잘되었다는 토(쿠키)을 받아옴, 로그인이 한번 성립이 되면, 그 이후에 클라이언트가 백엔드에 보내는 api 요청에 한해서 헤더에 자동으로 서버에서 받아오는 토큰이 붙어져서 함꼐 보내짐
