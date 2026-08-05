import { prisma } from "../lib/prisma.js";

const createPost = async (title: string, content: string, authorId: number) => {
  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId,
    },
  });

  return post;
};

const findManyPublishedPosts = async () => {
  const posts = await prisma.post.findMany({
    where: { isPublished: true },
    include: { author: { select: { id: true, name: true } } },
    orderBy: { publishedAt: "desc" },
  });

  return posts;
};

const findPublishedPostById = async (id: number) => {
  const post = await prisma.post.findUnique({
    where: { id, isPublished: true },
    include: {
      author: { select: { id: true, name: true } },
      comments: {
        include: { user: { select: { id: true, name: true } } },
      },
    },
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
  });

  return post;
};

const deletePost = async (id: number) => {
  const post = await prisma.post.delete({
    where: { id },
  });

  return post;
};

export { createPost, findManyPublishedPosts, findPublishedPostById, updatePost, deletePost };
