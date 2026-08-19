import { prisma } from "../lib/prisma.js";

const createUser = async (email: string, name: string, passwordHash: string) => {
  const user = await prisma.user.create({
    data: { email, name, passwordHash },
    select: { id: true, email: true, name: true, role: true },
  });

  return user;
};

const findUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true, role: true },
  });

  return user;
};

const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user;
};

export { createUser, findUserById, findUserByEmail };
