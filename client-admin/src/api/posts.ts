import { apiFetch } from "./client.js";
import type { Post, PostWithComments } from "../types/post.js";

interface UpdatePostInput {
  title?: string;
  content?: string;
  isPublished?: boolean;
}

const getAdminPosts = async (): Promise<Post[]> => {
  return apiFetch("/api/posts/admin");
};

const getAdminPostById = async (id: number): Promise<PostWithComments> => {
  return apiFetch(`/api/posts/admin/${id}`);
};

const createPost = async (title: string, content: string): Promise<Post> => {
  return apiFetch("/api/posts", {
    method: "POST",
    body: JSON.stringify({ title, content }),
  });
};

const updatePost = async (id: number, data: UpdatePostInput): Promise<Post> => {
  return apiFetch(`/api/posts/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

const deletePost = async (id: number): Promise<null> => {
  return apiFetch(`/api/posts/${id}`, {
    method: "DELETE",
  });
};

export { getAdminPosts, getAdminPostById, createPost, updatePost, deletePost };
