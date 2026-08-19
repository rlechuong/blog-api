import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import type { Role } from "../generated/prisma/client.js";

const generateToken = (payload: { id: number; role: Role }) => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d" });
};

export { generateToken };
