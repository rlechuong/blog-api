import { prisma } from "../lib/prisma.js";
import type { Role } from "../generated/prisma/client.js";

const createPost = async (title: string, content: string, authorId: number) => {
  const post = await prisma.post.create({
    data: { title, content, authorId },
    include: { author: { select: { id: true, name: true, role: true } } },
  });

  return post;
};

const findManyPublishedPosts = async () => {
  const posts = await prisma.post.findMany({
    where: { isPublished: true },
    include: { author: { select: { id: true, name: true, role: true } } },
    orderBy: { publishedAt: "desc" },
  });

  return posts;
};

const findManyPostsForAdmin = async (userId: number, role: Role) => {
  const posts = await prisma.post.findMany({
    where: role === "ADMIN" ? {} : { authorId: userId },
    include: { author: { select: { id: true, name: true, role: true } } },
    orderBy: { createdAt: "desc" },
  });

  return posts;
};

const findPublishedPostById = async (id: number) => {
  const post = await prisma.post.findUnique({
    where: { id, isPublished: true },
    include: {
      author: { select: { id: true, name: true, role: true } },
      comments: {
        include: { user: { select: { id: true, name: true, role: true } } },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  return post;
};

const findPostByIdForAdmin = async (id: number) => {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: { select: { id: true, name: true, role: true } },
      comments: {
        include: { user: { select: { id: true, name: true, role: true } } },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  return post;
};

const getPostAuthorId = async (id: number) => {
  const post = await prisma.post.findUnique({
    where: { id },
    select: { authorId: true },
  });

  return post;
};

const updatePost = async (
  id: number,
  data: { title?: string; content?: string; isPublished?: boolean },
) => {
  const updateData: {
    title?: string;
    content?: string;
    isPublished?: boolean;
    publishedAt?: Date;
  } = { ...data };

  if (data.isPublished === true) {
    const existingPost = await prisma.post.findUnique({
      where: { id },
      select: { publishedAt: true },
    });

    if (existingPost && !existingPost.publishedAt) {
      updateData.publishedAt = new Date();
    }
  }

  const post = await prisma.post.update({
    where: { id },
    data: updateData,
    include: { author: { select: { id: true, name: true, role: true } } },
  });

  return post;
};

const deletePost = async (id: number) => {
  const post = await prisma.post.delete({
    where: { id },
  });

  return post;
};

export {
  createPost,
  findManyPublishedPosts,
  findManyPostsForAdmin,
  findPublishedPostById,
  findPostByIdForAdmin,
  getPostAuthorId,
  updatePost,
  deletePost,
};
