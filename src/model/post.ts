export type Comment = {
  comment: string;
  username: string;
  image: string;
};

// 전체 포스트에서 comments를 빼고, comments를 숫자타입으로 가능하게 (몇개 커멘트 탈렸는지만 보면되니)
export type SimplePost = Omit<FullPost, 'comments'> & {
  comments: number;
};

export type FullPost = {
  id: string;
  username: string;
  userImage: string;
  image: string;
  text: string;
  createdAt: string;
  likes: string[];
  comments: Comment[];
};
