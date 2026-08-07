import { Router } from "express";
import { handleRegister } from "../controllers/authController.js";
import { registerValidator } from "../validators/authValidators.js";

const authRouter = Router();

authRouter.post("/register", registerValidator, handleRegister);

export { authRouter };
