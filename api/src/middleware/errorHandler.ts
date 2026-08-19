import type { Request, Response, NextFunction } from "express";
import { Prisma } from "../generated/prisma/client.js";

const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({ error: "A record with this value already exists." });
    }
    if (err.code === "P2003") {
      return res.status(400).json({ error: "Referenced record does not exist." });
    }
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Record not found." });
    }
  }

  return res.status(500).json({ error: "Something went wrong." });
};

export { errorHandler };
