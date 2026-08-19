import type { PublicUser } from "./user.js";

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: number | null;
  postId: number;
  user: PublicUser | null;
}

export type { Comment };
