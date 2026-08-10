import { validationResult, matchedData } from "express-validator";
import type { Request, Response, NextFunction } from "express";
import {
  createComment,
  deleteComment,
  getCommentOwnershipInfo,
  getCommentUserId,
  updateComment,
} from "../queries/commentQueries.js";

const handleCreateComment = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not Authenticated." });
  }
  const userId = req.user.id;

  const postId = Number(req.params.postId);
  if (Number.isNaN(postId)) {
    return res.status(400).json({ error: "Invalid Post ID." });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { content } = matchedData(req);

  try {
    const comment = await createComment(content, userId, postId);
    return res.status(201).json(comment);
  } catch (err) {
    return next(err);
  }
};

const handleUpdateComment = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not Authenticated." });
  }

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
    const commentOwnership = await getCommentUserId(commentId);
    if (!commentOwnership) {
      return res.status(404).json({ error: "Comment Not Found." });
    }

    if (commentOwnership.userId !== req.user.id) {
      return res.status(403).json({ error: "You do not have permission to modify this comment." });
    }

    const comment = await updateComment(commentId, { content });
    return res.status(200).json(comment);
  } catch (err) {
    return next(err);
  }
};

const handleDeleteComment = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not Authenticated." });
  }

  const commentId = Number(req.params.id);
  if (Number.isNaN(commentId)) {
    return res.status(400).json({ error: "Invalid Comment ID." });
  }

  try {
    const commentOwnership = await getCommentOwnershipInfo(commentId);
    if (!commentOwnership) {
      return res.status(404).json({ error: "Comment Not Found." });
    }

    const isCommentOwner = commentOwnership.userId === req.user.id;
    const isPostOwner = commentOwnership.post.authorId === req.user.id;
    const isAdmin = req.user.role === "ADMIN";

    if (!isCommentOwner && !isPostOwner && !isAdmin) {
      return res.status(403).json({ error: "You do not have permission to delete this comment." });
    }

    await deleteComment(commentId);
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};

export { handleCreateComment, handleUpdateComment, handleDeleteComment };
