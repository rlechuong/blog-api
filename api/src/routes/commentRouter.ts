import { Router } from "express";
import { handleDeleteComment, handleUpdateComment } from "../controllers/commentController.js";
import { updateCommentValidator } from "../validators/commentValidators.js";
import { requireAuth } from "../middleware/auth.js";

const commentRouter = Router();

commentRouter.patch("/:id", requireAuth, updateCommentValidator, handleUpdateComment);

commentRouter.delete("/:id", requireAuth, handleDeleteComment);

export { commentRouter };
