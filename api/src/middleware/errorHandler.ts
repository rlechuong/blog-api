import type { Request, Response, NextFunction } from "express";
import { Prisma } from "../generated/prisma/client.js";

// Express identifies error-handling middleware by its four-parameter signature.
// `_next` must remain even though it is unused.
const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
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

  console.error(err);
  return res.status(500).json({ error: "Something went wrong." });
};

export { errorHandler };
