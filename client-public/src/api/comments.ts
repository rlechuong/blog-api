import { apiFetch } from "./client.js";
import type { Comment } from "../types/comment.js";

const createComment = async (postId: number, content: string): Promise<Comment> => {
  return apiFetch(`/api/posts/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
};

export { createComment };
