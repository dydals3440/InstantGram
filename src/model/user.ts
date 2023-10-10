export type User = {
  name: string;
  username: string;
  email: string;
  image?: string;
};

// 두개의 정보만 고른다는의미
export type SimpleUser = Pick<User, 'username' | 'image'>;

export type DetailUser = User & {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
};
