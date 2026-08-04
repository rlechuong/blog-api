import { Router } from "express";
import {
  handleGetPublishedPosts,
  handleGetPublishedPostById,
  handleCreatePost,
  handleDeletePost,
} from "../controllers/postController.js";
import { createPostValidator } from "../validators/postValidators.js";

const postRouter = Router();

postRouter.get("/", handleGetPublishedPosts);
postRouter.get("/:id", handleGetPublishedPostById);

postRouter.post("/", createPostValidator, handleCreatePost);

postRouter.delete("/:id", handleDeletePost);

export { postRouter };
