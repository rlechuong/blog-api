import { Router } from "express";
import {
  handleCreatePost,
  handleDeletePost,
  handleGetPublishedPosts,
  handleGetPublishedPostById,
  handleUpdatePost,
} from "../controllers/postController.js";
import { handleCreateComment } from "../controllers/commentController.js";
import { createPostValidator, updatePostValidator } from "../validators/postValidators.js";
import { createCommentValidator } from "../validators/commentValidators.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const postRouter = Router();

postRouter.get("/", handleGetPublishedPosts);
postRouter.get("/:id", handleGetPublishedPostById);

postRouter.post(
  "/",
  requireAuth,
  requireRole("AUTHOR", "ADMIN"),
  createPostValidator,
  handleCreatePost,
);
postRouter.post("/:postId/comments", createCommentValidator, handleCreateComment);

postRouter.patch(
  "/:id",
  requireAuth,
  requireRole("AUTHOR", "ADMIN"),
  updatePostValidator,
  handleUpdatePost,
);

postRouter.delete("/:id", handleDeletePost);

export { postRouter };
