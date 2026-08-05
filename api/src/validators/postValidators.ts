import { body } from "express-validator";

const createPostValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ max: 200 })
    .withMessage("Title must be 200 characters or fewer."),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required.")
    .isLength({ max: 50000 })
    .withMessage("Content must be 50,000 characters or fewer."),
  // TODO(auth): remove once JWT auth provides authorId via req.user.id
  body("authorId").isInt({ min: 1 }).withMessage("A valid authorId is required."),
];

const updatePostValidator = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty.")
    .isLength({ max: 200 })
    .withMessage("Title must be 200 characters or fewer."),
  body("content")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Content cannot be empty.")
    .isLength({ max: 50000 })
    .withMessage("Content must be 50,000 characters or fewer."),
  body("isPublished").optional().isBoolean().withMessage("isPublished must be a boolean."),
];

export { createPostValidator, updatePostValidator };
