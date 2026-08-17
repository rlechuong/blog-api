import { body } from "express-validator";

const createCommentValidator = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required.")
    .bail()
    .isLength({ max: 50000 })
    .withMessage("Content must be 50,000 characters or fewer."),
];

const updateCommentValidator = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required.")
    .bail()
    .isLength({ max: 50000 })
    .withMessage("Content must be 50,000 characters or fewer."),
];

export { createCommentValidator, updateCommentValidator };
