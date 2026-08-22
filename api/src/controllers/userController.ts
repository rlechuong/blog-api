import { validationResult, matchedData } from "express-validator";
import type { Request, Response, NextFunction } from "express";
import { findManyUsers, updateUserRole } from "../queries/userQueries.js";

const handleGetUsers = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not Authenticated." });
  }

  try {
    const users = await findManyUsers();
    return res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
};

const handleUpdateUserRole = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not Authenticated." });
  }

  const userId = Number(req.params.id);
  if (Number.isNaN(userId)) {
    return res.status(400).json({ error: "Invalid User ID." });
  }

  if (userId === req.user.id) {
    return res.status(403).json({ error: "You cannot change your own role." });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { role } = matchedData(req);

  try {
    const user = await updateUserRole(userId, role);
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};

export { handleGetUsers, handleUpdateUserRole };
