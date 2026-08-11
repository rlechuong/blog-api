import type { PublicUser } from "./user.js";
import type { Comment } from "./comment.js";

interface Post {
  id: number;
  title: string;
  content: string;
  isPublished: boolean;
  createdAt: string;
  publishedAt: string | null;
  updatedAt: string;
  authorId: number;
  author: PublicUser;
}

interface PostWithComments extends Post {
  comments: Comment[];
}

export type { Post, PostWithComments };
