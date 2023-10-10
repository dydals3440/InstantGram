import reactDom from 'react-dom';

type Props = {
  children: React.ReactNode;
};

// 안에 들어있는 children 요소를, 보여주고 싶은 요소 우리 레이아웃 상단에 있는 div 요소에, createPortal을 이용해 연결시켜줌 (말단에 있는 컴포넌트일지라도, 돔트리 상위까지 연결시켜줌)
export default function ModalPortal({ children }: Props) {
  // 포털은 사이드 렌더링이 될 떄는 처리 X, 우리가 브라우저 환경일떄만, 윈도일때만 해줌
  if (typeof window === 'undefined') {
    // 브라우저 환경이 아니라면 아무런 컴포넌트 반환 X
    return null;
  }
  const node = document.getElementById('portal') as Element;
  return reactDom.createPortal(children, node);
}
