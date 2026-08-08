import { body } from "express-validator";

const registerValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Email is invalid.")
    .isLength({ max: 200 })
    .withMessage("Email must be 200 characters or fewer.")
    .normalizeEmail(),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required.")
    .isLength({ max: 200 })
    .withMessage("Name must be 200 characters or fewer."),
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8, max: 128 })
    .withMessage("Password must be between 8 and 128 characters."),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirmation password is required.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirmation password does not match password.");
      }
      return true;
    }),
];

const loginValidator = [
  body("email").notEmpty().withMessage("Email is required."),
  body("password").notEmpty().withMessage("Password is required."),
];

export { registerValidator, loginValidator };
