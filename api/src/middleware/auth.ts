import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import type { Request, Response, NextFunction } from "express";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Missing authorization header." });
  }

  const [authScheme, authToken] = authHeader.split(" ");
  if (authScheme !== "Bearer" || !authToken) {
    return res.status(401).json({ error: "Invalid authorization header." });
  }

  try {
    const decodedToken = jwt.verify(authToken, env.JWT_SECRET);
    if (typeof decodedToken === "string" || !("id" in decodedToken) || !("role" in decodedToken)) {
      return res.status(401).json({ error: "Invalid token payload." });
    }

    req.user = decodedToken as Express.User;
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

const requireRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "You do not have permission to perform this action." });
    }
    return next();
  };
};

export { requireAuth, requireRole };
