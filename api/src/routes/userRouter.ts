import { Router } from "express";
import { handleGetUsers, handleUpdateUserRole } from "../controllers/userController.js";
import { updateUserRoleValidator } from "../validators/userValidators.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const userRouter = Router();

userRouter.get("/", requireAuth, requireRole("ADMIN"), handleGetUsers);

userRouter.patch(
  "/:id/role",
  requireAuth,
  requireRole("ADMIN"),
  updateUserRoleValidator,
  handleUpdateUserRole,
);

export { userRouter };
