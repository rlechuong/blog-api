import { validationResult, matchedData } from "express-validator";
import type { Request, Response, NextFunction } from "express";
import { createUser } from "../queries/userQueries.js";
import { hashPassword } from "../lib/password.js";
import { generateToken } from "../lib/token.js";
import { Prisma } from "../generated/prisma/client.js";

const handleRegister = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, name, password } = matchedData(req);

  try {
    const passwordHash = await hashPassword(password);
    const user = await createUser(email, name, passwordHash);
    const token = generateToken({ id: user.id, role: user.role });
    return res
      .status(201)
      .json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return res.status(409).json({ error: "Email already exists." });
    }
    return next(err);
  }
};

export { handleRegister };
