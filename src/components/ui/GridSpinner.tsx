import dynamic from 'next/dynamic';

const GridLoader = dynamic(
  () => import('react-spinners').then((lib) => lib.GridLoader),
  {
    // 서버에서 미리 렌더링 못하게 (다이나믹하게, lazy하게 필요할 떄 동적으로)
    ssr: false,
  }
);

type Props = {
  color?: string;
};

export default function GridSpinner({ color = 'red' }: Props) {
  return <GridLoader color={color} />;
}
