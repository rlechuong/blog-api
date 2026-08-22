import { prisma } from "../lib/prisma.js";
import type { Role } from "../generated/prisma/client.js";

const createUser = async (email: string, name: string, passwordHash: string) => {
  const user = await prisma.user.create({
    data: { email, name, passwordHash },
    select: { id: true, email: true, name: true, role: true },
  });

  return user;
};

const findManyUsers = async () => {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, createdAt: true, updatedAt: true },
    orderBy: { name: "asc" },
  });

  return users;
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

const updateUserRole = async (id: number, role: Role) => {
  const user = await prisma.user.update({
    where: { id },
    data: { role },
    select: { id: true, email: true, name: true, role: true, createdAt: true, updatedAt: true },
  });

  return user;
};

export { createUser, findManyUsers, findUserById, findUserByEmail, updateUserRole };
