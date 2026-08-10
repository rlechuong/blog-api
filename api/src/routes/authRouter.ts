import { Router } from "express";
import { handleLogin, handleRegister } from "../controllers/authController.js";
import { loginValidator, registerValidator } from "../validators/authValidators.js";
import { authLimiter } from "../middleware/rateLimit.js";

const authRouter = Router();

authRouter.post("/register", authLimiter, registerValidator, handleRegister);
authRouter.post("/login", authLimiter, loginValidator, handleLogin);

export { authRouter };
