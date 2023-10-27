type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';

type Props = {
  image?: string | null;
  size?: AvatarSize;
  highlight?: boolean;
};

export default function Avatar({
  image,
  size = 'large',
  highlight = false,
}: Props) {
  return (
    <div className={getContainerStyle(size, highlight)}>
      {/* 로컬상, 특정 외부 URL에 대한 도메인을 Next.config 파일에 추가해주면, 외부 URL을 이미지 태그에서 사용가능, 그런데 우리가 보여주고자 하는 이미지는 구글 OAuth 로그인시 자체적으로 가지고 있는 Image URL을 주는거임, 어떤 도메인을 가지는지는, 이들만의 내부 구현사항 특정 URL을 지정해서 도메인 등록하기 어려움. 나중에 Github Kakao 등 다양한 Oauth Provider를 사용한다면, 이미지 도메인이 달라짐, Next.js 사용하는 IMG 태그 사용어렵*/}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`bg-white object-cover rounded-full  
        ${getImageSizeStyle(size).image}`}
        alt='user profile'
        src={image ?? undefined}
        referrerPolicy='no-referrer' // X box로 이슈 해결
      />
    </div>
  );
}

function getContainerStyle(size: AvatarSize, highlight: boolean): string {
  const baseStyle = 'rounded-full flex justify-center items-center';
  const highlightStyle = highlight
    ? 'bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300'
    : '';
  // const sizeStyle = size === 'small' ? 'w-9 h-9' : 'w-[68px] h-[68px]';
  // const sizeStyle = getContainerSize(size);
  const { container } = getImageSizeStyle(size);

  return `${baseStyle} ${highlightStyle} ${container}`;
}

type ImageSizeStyle = {
  container: string;
  image: string;
};

function getImageSizeStyle(size: AvatarSize): ImageSizeStyle {
  switch (size) {
    case 'small':
      return { container: 'w-9 h-9', image: 'w-[34px] h-[34px] p-[0.1rem]' };
    case 'medium':
      return { container: 'w-11 h-11', image: 'w-[42px] h-[42px] p-[0.1rem]' };
    case 'large':
      return { container: 'w-[68px] h-[68px]', image: 'w-16 h-16 p-[0.2rem]' };
    case 'xlarge':
      return {
        container: 'w-[142px] h-[142px]',
        image: 'w-[138px] h-[138px] p-[0.3rem]',
      };

    default:
      throw new Error(`Unsupported type size: ${size}`);
  }
}

// function getImageSizeStyle(size: AvatarSize): string {
//   switch (size) {
//     case 'small':
//       return 'w-[34px] h-[34px] p-[0.1rem]';
//     case 'medium':
//       return 'w-[42px] h-[42px] p-[0.1rem]';
//     case 'large':
//       return 'w-16 h-16 p-[0.2rem]';
//     case 'xlarge':
//       return 'w-[138px] h-[138px] p-[0.3rem]';
//     default:
//       throw new Error(`Unsupported type size: ${size}`);
//   }
