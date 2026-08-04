import { validationResult, matchedData } from "express-validator";
import type { Request, Response, NextFunction } from "express";
import {
  createPost,
  findManyPublishedPosts,
  findPublishedPostById,
} from "../queries/postQueries.js";

const handleGetPublishedPosts = async (req: Request, res: Response, next: NextFunction) => {
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

const handleCreatePost = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // TODO(auth): refactor once JWT auth provides authorId via req.user.id
  const { title, content, authorId } = matchedData(req);

  try {
    const post = await createPost(title, content, authorId);
    return res.status(201).json(post);
  } catch (err) {
    return next(err);
  }
};

export { handleGetPublishedPosts, handleGetPublishedPostById, handleCreatePost };
