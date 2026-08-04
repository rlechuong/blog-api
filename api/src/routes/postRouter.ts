import { Router } from "express";
import {
  handleGetPublishedPosts,
  handleGetPublishedPostById,
  handleCreatePost,
} from "../controllers/postController.js";
import { createPostValidator } from "../validators/postValidators.js";

const postRouter = Router();

postRouter.get("/", handleGetPublishedPosts);
postRouter.get("/:id", handleGetPublishedPostById);

postRouter.post("/", createPostValidator, handleCreatePost);

export { postRouter };
