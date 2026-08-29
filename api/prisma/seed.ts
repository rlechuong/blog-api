import { prisma } from "../src/lib/prisma.js";
import { hashPassword } from "../src/lib/password.js";

const main = async () => {
  try {
    await prisma.post.deleteMany();

    const adminPasswordHash = await hashPassword("adminPassword123");
    const authorPasswordHash = await hashPassword("authorPassword123");
    const userPasswordHash = await hashPassword("userPassword123");

    const admin = await prisma.user.upsert({
      where: { email: "admin@example.com" },
      update: {},
      create: {
        email: "admin@example.com",
        name: "Demo Admin",
        passwordHash: adminPasswordHash,
        role: "ADMIN",
      },
    });
    console.log("Seeded: ", admin);

    const author = await prisma.user.upsert({
      where: { email: "author@example.com" },
      update: {},
      create: {
        email: "author@example.com",
        name: "Demo Author",
        passwordHash: authorPasswordHash,
        role: "AUTHOR",
      },
    });
    console.log("Seeded: ", author);

    const user = await prisma.user.upsert({
      where: { email: "user@example.com" },
      update: {},
      create: {
        email: "user@example.com",
        name: "Demo User",
        passwordHash: userPasswordHash,
        role: "USER",
      },
    });
    console.log("Seeded: ", user);

    const adminPost = await prisma.post.create({
      data: {
        title: "Using JWTs Over Sessions for the Blog API",
        content:
          "In my previous projects, I used session-based authentication, but for this project Odin Project wanted me to use JWT for the first time. The blog has two different front-ends: a public client for reading and commenting blog posts, and an admin client for writing and moderating those blog posts. Both of these front end clients talk to the same API, but from different origins. Session cookies are tied to a specific origin, so they cannot be easily shared between front ends and also require a database query every request, so I believe JWTs were the better choice. In this project the server signs a token containing the user's ID and role, the client stores it in state, and every request places it in an Authorization header. The server verifies the signature and knows who's talking to it without storing any session state. One tradeoff is there's no server-side way to revoke a token before it expires. For this project the tokens last seven days, but in future projects I will look into refreshing tokens so the user experience isn't interrupted.",
        isPublished: true,
        publishedAt: new Date(),
        authorId: admin.id,
      },
    });
    console.log("Seeded: ", adminPost);

    const authorPost = await prisma.post.create({
      data: {
        title: "Modeling Permissions",
        content:
          "One of the lessons I learned in this project involved deciding who could do what in the Express backend. The schema has three roles: USER, AUTHOR, and ADMIN, but roles couldn't handle every situation. One permission I had to handle was an author being able to edit their own posts but not someone else's, which was an ownership question. I could use middleware to reject a request before querying the database, but for ownership the resource had to be fetched first. I had to shape my backend so routers handled role requirements, while controllers fetched and compared the requester through req.user against the resource's owner. In some situations the ADMIN could bypass this ownership check. One moderation decision I made was allow ADMIN to delete any comment, but not edit, as I believe this mirrored how this scenario is generally managed.",
        isPublished: true,
        publishedAt: new Date(),
        authorId: author.id,
      },
    });
    console.log("Seeded: ", authorPost);

    const authorPostUnpublished = await prisma.post.create({
      data: {
        title: "Notes on Deploying Monorepo",
        content:
          "Draft, still working on this one. Three services across two platforms using one repository and managing a variety of environment variables.",
        isPublished: false,
        authorId: author.id,
      },
    });
    console.log("Seeded: ", authorPostUnpublished);

    const userComment = await prisma.comment.create({
      data: {
        content:
          "The refreshing of the token caused me some confusion as well. Please keep us posted on how you handle it in the future.",
        userId: user.id,
        postId: adminPost.id,
      },
    });
    console.log("Seeded: ", userComment);

    const authorComment = await prisma.comment.create({
      data: {
        content:
          "The stateless aspect has other downsides as well. It's simpler until you need to invalidate something immediately and then can prove more difficult.",
        userId: author.id,
        postId: adminPost.id,
      },
    });
    console.log("Seeded: ", authorComment);

    const userComment2 = await prisma.comment.create({
      data: {
        content:
          "I never thought about the edit and delete ability when it comes to moderation, but now I notice that almost all systems universally follow it.",
        userId: user.id,
        postId: authorPost.id,
      },
    });
    console.log("Seeded: ", userComment2);

    const userComment3 = await prisma.comment.create({
      data: {
        content: "Looking forward to this one!",
        userId: user.id,
        postId: authorPostUnpublished.id,
      },
    });
    console.log("Seeded: ", userComment3);

    console.log("Seeding Finished Successfully.");
  } catch (err) {
    console.error("Seeding Failed: ", err);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
};

main();
