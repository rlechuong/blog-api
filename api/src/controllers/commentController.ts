import { validationResult, matchedData } from "express-validator";
import type { Request, Response, NextFunction } from "express";
import { createComment, deleteComment, updateComment } from "../queries/commentQueries.js";

const handleCreateComment = async (req: Request, res: Response, next: NextFunction) => {
  const postId = Number(req.params.postId);
  if (Number.isNaN(postId)) {
    return res.status(400).json({ error: "Invalid Post ID." });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // TODO(auth): refactor once JWT auth provides userId via req.user.id
  const { content, userId } = matchedData(req);

  try {
    const comment = await createComment(content, userId, postId);
    return res.status(201).json(comment);
  } catch (err) {
    return next(err);
  }
};

const handleUpdateComment = async (req: Request, res: Response, next: NextFunction) => {
  const commentId = Number(req.params.id);
  if (Number.isNaN(commentId)) {
    return res.status(400).json({ error: "Invalid Comment ID." });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { content } = matchedData(req);

  try {
    const comment = await updateComment(commentId, { content });
    return res.status(200).json(comment);
  } catch (err) {
    return next(err);
  }
};

const handleDeleteComment = async (req: Request, res: Response, next: NextFunction) => {
  const commentId = Number(req.params.id);
  if (Number.isNaN(commentId)) {
    return res.status(400).json({ error: "Invalid Comment ID." });
  }

  try {
    await deleteComment(commentId);
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};

export { handleCreateComment, handleUpdateComment, handleDeleteComment };
