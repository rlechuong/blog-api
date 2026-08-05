import { Router } from "express";
import {
  handleCreatePost,
  handleDeletePost,
  handleGetPublishedPosts,
  handleGetPublishedPostById,
  handleUpdatePost,
} from "../controllers/postController.js";
import { createPostValidator, updatePostValidator } from "../validators/postValidators.js";

const postRouter = Router();

postRouter.get("/", handleGetPublishedPosts);
postRouter.get("/:id", handleGetPublishedPostById);

postRouter.post("/", createPostValidator, handleCreatePost);

postRouter.patch("/:id", updatePostValidator, handleUpdatePost);

postRouter.delete("/:id", handleDeletePost);

export { postRouter };
