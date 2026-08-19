import { validationResult, matchedData } from "express-validator";
import type { Request, Response, NextFunction } from "express";
import {
  createPost,
  deletePost,
  findManyPublishedPosts,
  findPublishedPostById,
  getPostAuthorId,
  updatePost,
} from "../queries/postQueries.js";

const handleCreatePost = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not Authenticated." });
  }
  const authorId = req.user.id;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, content } = matchedData(req);

  try {
    const post = await createPost(title, content, authorId);
    return res.status(201).json(post);
  } catch (err) {
    return next(err);
  }
};

const handleGetPublishedPosts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await findManyPublishedPosts();
    return res.status(200).json(posts);
  } catch (err) {
    return next(err);
  }
};

const handleGetPublishedPostById = async (req: Request, res: Response, next: NextFunction) => {
  const postId = Number(req.params.id);
  if (Number.isNaN(postId)) {
    return res.status(400).json({ error: "Invalid Post ID." });
  }

  try {
    const post = await findPublishedPostById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post Not Found." });
    }
    return res.status(200).json(post);
  } catch (err) {
    return next(err);
  }
};

const handleUpdatePost = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not Authenticated." });
  }

  const postId = Number(req.params.id);
  if (Number.isNaN(postId)) {
    return res.status(400).json({ error: "Invalid Post ID." });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, content, isPublished } = matchedData(req);

  try {
    const postOwnership = await getPostAuthorId(postId);
    if (!postOwnership) {
      return res.status(404).json({ error: "Post Not Found." });
    }

    const isPostOwner = postOwnership.authorId === req.user.id;
    const isAdmin = req.user.role === "ADMIN";
    if (!isPostOwner && !isAdmin) {
      return res.status(403).json({ error: "You do not have permission to modify this post." });
    }

    const post = await updatePost(postId, { title, content, isPublished });
    return res.status(200).json(post);
  } catch (err) {
    return next(err);
  }
};

const handleDeletePost = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not Authenticated." });
  }

  const postId = Number(req.params.id);
  if (Number.isNaN(postId)) {
    return res.status(400).json({ error: "Invalid Post ID." });
  }

  try {
    const postOwnership = await getPostAuthorId(postId);
    if (!postOwnership) {
      return res.status(404).json({ error: "Post Not Found." });
    }

    const isPostOwner = postOwnership.authorId === req.user.id;
    const isAdmin = req.user.role === "ADMIN";

    if (!isPostOwner && !isAdmin) {
      return res.status(403).json({ error: "You do not have permission to delete this post." });
    }

    await deletePost(postId);
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};

export {
  handleCreatePost,
  handleGetPublishedPosts,
  handleGetPublishedPostById,
  handleUpdatePost,
  handleDeletePost,
};
