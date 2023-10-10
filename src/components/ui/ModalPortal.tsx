import reactDom from 'react-dom';

type Props = {
  children: React.ReactNode;
};

export default function ModalPortal({ children }: Props) {
  // 포털은 사이드 렌더링이 될 떄는 처리 X, 우리가 브라우저 환경일떄만, 윈도일때만 해줌
  if (typeof window === 'undefined') {
    // 브라우저 환경이 아니라면 아무런 컴포넌트 반환 X
    return null;
  }
  const node = document.getElementById('portal') as Element;
  return reactDom.createPortal(children, node);
}
