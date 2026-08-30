import { apiFetch } from "./client.js";
import type { Comment } from "../types/comment.js";

const createComment = async (postId: number, content: string): Promise<Comment> => {
  return apiFetch(`/api/posts/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
};

const updateComment = async (id: number, content: string): Promise<Comment> => {
  return apiFetch(`/api/comments/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ content }),
  });
};

const deleteComment = async (id: number): Promise<null> => {
  return apiFetch(`/api/comments/${id}`, {
    method: "DELETE",
  });
};

export { createComment, updateComment, deleteComment };
