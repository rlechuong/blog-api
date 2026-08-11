import type { PublicUser } from "./user.js";

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  postId: number;
  user: PublicUser;
}

export type { Comment };
