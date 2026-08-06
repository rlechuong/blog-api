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

const postRouter = Router();

postRouter.get("/", handleGetPublishedPosts);
postRouter.get("/:id", handleGetPublishedPostById);

postRouter.post("/", createPostValidator, handleCreatePost);
postRouter.post("/:postId/comments", createCommentValidator, handleCreateComment);

postRouter.patch("/:id", updatePostValidator, handleUpdatePost);

postRouter.delete("/:id", handleDeletePost);

export { postRouter };
