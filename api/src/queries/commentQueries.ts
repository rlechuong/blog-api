import { prisma } from "../lib/prisma.js";

const createComment = async (content: string, userId: number, postId: number) => {
  const comment = await prisma.comment.create({
    data: {
      content,
      userId,
      postId,
    },
    include: { user: { select: { id: true, name: true, role: true } } },
  });

  return comment;
};

const getCommentUserId = async (commentId: number) => {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    select: { userId: true },
  });

  return comment;
};

const getCommentOwnershipInfo = async (commentId: number) => {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    select: {
      userId: true,
      post: { select: { authorId: true } },
    },
  });

  return comment;
};

const updateComment = async (id: number, data: { content: string }) => {
  const comment = await prisma.comment.update({
    where: { id },
    data,
    include: { user: { select: { id: true, name: true, role: true } } },
  });

  return comment;
};

const deleteComment = async (id: number) => {
  const comment = await prisma.comment.delete({
    where: { id },
  });

  return comment;
};

export { createComment, getCommentUserId, getCommentOwnershipInfo, updateComment, deleteComment };
