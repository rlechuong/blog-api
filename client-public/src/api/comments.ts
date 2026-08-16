import { apiFetch } from "./client";
import type { Comment } from "../types/comment";

const createComment = async (postId: number, content: string): Promise<Comment> => {
  return apiFetch(`/api/posts/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
};

export { createComment };
