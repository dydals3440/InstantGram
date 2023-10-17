import { FullPost, SimplePost } from '@/model/post';

import useSWR from 'swr';
import Image from 'next/image';
import PostUserAvatar from './PostUserAvatar';
import ActionBar from './ActionBar';
import CommentForm from './CommentForm';
import Avatar from './Avatar';

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
        {/* 너비는 지정, 부모는 높이에 따라 div요소(relative)만큼만 fill */}
        <Image
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          sizes='650px'
        />
      </div>
      <div>
        <PostUserAvatar image={userImage} username={username} />
        <ul>
          {/* post는 정적으로 변하지 않으니까, 배열의 인덱스 사용 */}
          {comments &&
            comments.map(
              ({ image, username: commentUsername, comment }, index) => (
                <li key={index}>
                  <Avatar
                    image={image}
                    size='small'
                    // comment를 작성한, userName이, 본인과 일치할때만 하이라이트
                    highlight={commentUsername === username}
                  />
                  <div>
                    <span>{commentUsername}</span>
                    <span>{comment}</span>
                  </div>
                </li>
              )
            )}
        </ul>
        <ActionBar likes={likes} username={username} createdAt={createdAt} />
        <CommentForm />
      </div>
    </section>
  );
}
