export interface User {
  id: string;
  email: string;
  password: string;
  name?: string;
  avatarUrl?: string;
  dateOfBirth?: Date;
  createdAt: Date;
  updatedAt: Date;
  bio?: string;
  location?: string;
  posts: Post[];
  likes: Like[];
  comments: Comment[];
  following: Follow[];
  followers: Follow[];
}

export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  follower: User;
  following: User;
}

export interface Post {
  id: string;
  content: string;
  authorId: string;
  author: User;
  likes: Like[];
  comments: Comment[];
  createdAt: Date;
}

export interface Like {
  id: string;
  userId: string;
  postId: string;
  user: User;
  post: Post;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  postId: string;
  user: User;
  post: Post;
}
