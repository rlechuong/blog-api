import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const generateToken = (payload: { id: number; role: string }) => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d" });
};

export { generateToken };
