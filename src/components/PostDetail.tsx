import { FullPost, SimplePost } from '@/model/post';

import useSWR from 'swr';
import Image from 'next/image';

type Props = {
  post: SimplePost;
};
export default function PostDetail({ post }: Props) {
  const { id, userImage, username, image, createdAt, likes } = post;
  //
  const { data } = useSWR<FullPost>(`/api/posts/${id}`);
  const comments = data?.comments;

  return (
    <section>
      <div className='relative'>
        {/* 너비는 지정, 부모는 높이에 따라 */}
        <Image
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          sizes='650px'
        />
      </div>
    </section>
  );
}
