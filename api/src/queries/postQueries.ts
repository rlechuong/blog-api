import { prisma } from "../lib/prisma.js";

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

export { findManyPublishedPosts, findPublishedPostById, createPost };
