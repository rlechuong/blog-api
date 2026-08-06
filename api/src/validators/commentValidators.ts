import { body } from "express-validator";

const createCommentValidator = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required.")
    .isLength({ max: 50000 })
    .withMessage("Content must be 50,000 characters or fewer."),
  // TODO(auth): remove once JWT auth provides userId via req.user.id
  body("userId").isInt({ min: 1 }).withMessage("A valid userId is required."),
];

const updateCommentValidator = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required.")
    .isLength({ max: 50000 })
    .withMessage("Content must be 50,000 characters or fewer."),
];

export { createCommentValidator, updateCommentValidator };
