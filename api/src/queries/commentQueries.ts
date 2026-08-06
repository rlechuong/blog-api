import { prisma } from "../lib/prisma.js";

const createComment = async (content: string, userId: number, postId: number) => {
  const comment = await prisma.comment.create({
    data: {
      content,
      userId,
      postId,
    },
  });

  return comment;
};

const updateComment = async (id: number, data: { content: string }) => {
  const comment = await prisma.comment.update({
    where: { id },
    data,
  });

  return comment;
};

const deleteComment = async (id: number) => {
  const comment = await prisma.comment.delete({
    where: { id },
  });

  return comment;
};

export { createComment, updateComment, deleteComment };
