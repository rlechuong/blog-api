import { Router } from "express";
import { handleLogin, handleRegister } from "../controllers/authController.js";
import { loginValidator, registerValidator } from "../validators/authValidators.js";

const authRouter = Router();

authRouter.post("/register", registerValidator, handleRegister);
authRouter.post("/login", loginValidator, handleLogin);

export { authRouter };
