import { validationResult, matchedData } from "express-validator";
import passport from "passport";
import type { Request, Response, NextFunction } from "express";
import type { User } from "../generated/prisma/client.js";
import { Prisma } from "../generated/prisma/client.js";
import { createUser, findUserById } from "../queries/userQueries.js";
import { hashPassword } from "../lib/password.js";
import { generateToken } from "../lib/token.js";

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
    return res.status(201).json({ token, user });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return res.status(409).json({ error: "Email already exists." });
    }
    return next(err);
  }
};

const handleLogin = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  passport.authenticate(
    "local",
    { session: false },
    (err: Error | null, user: User | false, info: { message: string } | undefined) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).json({ error: info?.message ?? "Invalid email or password." });
      }

      const token = generateToken({ id: user.id, role: user.role });
      return res.status(200).json({
        token,
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
      });
    },
  )(req, res, next);
};

const handleGetMe = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not Authenticated." });
  }
  const userId = req.user.id;

  try {
    const user = await findUserById(userId);
    if (!user) {
      return res.status(401).json({ error: "Session is no longer valid." });
    }
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};

export { handleRegister, handleLogin, handleGetMe };
