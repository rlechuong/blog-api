import bcrypt from "bcrypt";
import { prisma } from "../src/lib/prisma.js";

const main = async () => {
  try {
    const adminPasswordHash = await bcrypt.hash("adminPassword123", 10);
    const authorPasswordHash = await bcrypt.hash("authorPassword123", 10);
    const userPasswordHash = await bcrypt.hash("userPassword123", 10);

    const admin = await prisma.user.create({
      data: {
        email: "admin@example.com",
        name: "The Admin",
        passwordHash: adminPasswordHash,
        role: "ADMIN",
      },
    });
    console.log("Seeded: ", admin);

    const author = await prisma.user.create({
      data: {
        email: "author@example.com",
        name: "The Author",
        passwordHash: authorPasswordHash,
        role: "AUTHOR",
      },
    });
    console.log("Seeded: ", author);

    const user = await prisma.user.create({
      data: {
        email: "user@example.com",
        name: "The User",
        passwordHash: userPasswordHash,
        role: "USER",
      },
    });
    console.log("Seeded: ", user);

    const adminPost = await prisma.post.create({
      data: {
        title: "Admin Post",
        content: "The content of the Admin Post.",
        isPublished: true,
        publishedAt: new Date(),
        authorId: admin.id,
      },
    });
    console.log("Seeded: ", adminPost);

    const authorPost = await prisma.post.create({
      data: {
        title: "Published Author Post",
        content: "The content of the Published Author Post.",
        isPublished: true,
        publishedAt: new Date(),
        authorId: author.id,
      },
    });
    console.log("Seeded: ", authorPost);

    const authorPost2 = await prisma.post.create({
      data: {
        title: "Unpublished Author Post",
        content: "The content of the Unpublished Author Post.",
        isPublished: false,
        authorId: author.id,
      },
    });
    console.log("Seeded: ", authorPost2);

    const adminComment = await prisma.comment.create({
      data: {
        content: "The content of the Admin Comment.",
        userId: admin.id,
        postId: adminPost.id,
      },
    });
    console.log("Seeded: ", adminComment);

    const authorComment = await prisma.comment.create({
      data: {
        content: "The content of the Author Comment.",
        userId: author.id,
        postId: authorPost.id,
      },
    });
    console.log("Seeded: ", authorComment);

    const userComment = await prisma.comment.create({
      data: {
        content: "The content of the User Comment.",
        userId: user.id,
        postId: authorPost2.id,
      },
    });
    console.log("Seeded: ", userComment);
    console.log("Seeding Finished Successfully.");
  } catch (err) {
    console.error("Seeding Failed: ", err);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
};

main();
