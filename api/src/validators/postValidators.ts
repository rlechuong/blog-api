import { body } from "express-validator";

const createPostValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .bail()
    .isLength({ max: 200 })
    .withMessage("Title must be 200 characters or fewer."),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required.")
    .bail()
    .isLength({ max: 50000 })
    .withMessage("Content must be 50,000 characters or fewer."),
];

const updatePostValidator = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty.")
    .bail()
    .isLength({ max: 200 })
    .withMessage("Title must be 200 characters or fewer."),
  body("content")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Content cannot be empty.")
    .bail()
    .isLength({ max: 50000 })
    .withMessage("Content must be 50,000 characters or fewer."),
  body("isPublished").optional().isBoolean().withMessage("isPublished must be a boolean."),
];

export { createPostValidator, updatePostValidator };
