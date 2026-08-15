import { Router } from "express";
import { handleGetMe, handleLogin, handleRegister } from "../controllers/authController.js";
import { loginValidator, registerValidator } from "../validators/authValidators.js";
import { authLimiter } from "../middleware/rateLimit.js";
import { requireAuth } from "../middleware/auth.js";

const authRouter = Router();

authRouter.post("/register", authLimiter, registerValidator, handleRegister);
authRouter.post("/login", authLimiter, loginValidator, handleLogin);
authRouter.get("/me", requireAuth, handleGetMe);

export { authRouter };
