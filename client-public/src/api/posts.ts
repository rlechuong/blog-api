import { apiFetch } from "./client.js";
import type { Post, PostWithComments } from "../types/post.js";

const getPosts = async (): Promise<Post[]> => {
  return apiFetch("/api/posts");
};

const getPostById = async (id: number): Promise<PostWithComments> => {
  return apiFetch(`/api/posts/${id}`);
};

export { getPosts, getPostById };
