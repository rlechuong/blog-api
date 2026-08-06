import { Router } from "express";
import { handleDeleteComment, handleUpdateComment } from "../controllers/commentController.js";
import { updateCommentValidator } from "../validators/commentValidators.js";

const commentRouter = Router();

commentRouter.patch("/:id", updateCommentValidator, handleUpdateComment);

commentRouter.delete("/:id", handleDeleteComment);

export { commentRouter };
