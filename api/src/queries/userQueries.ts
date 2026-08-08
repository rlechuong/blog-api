import { prisma } from "../lib/prisma.js";

const createUser = async (email: string, name: string, passwordHash: string) => {
  const user = await prisma.user.create({
    data: { email, name, passwordHash },
  });

  return user;
};

const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user;
};

export { createUser, findUserByEmail };
