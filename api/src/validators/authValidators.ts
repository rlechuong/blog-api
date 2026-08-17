import { body } from "express-validator";

const registerValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .bail()
    .isEmail()
    .withMessage("Email is invalid.")
    .bail()
    .isLength({ max: 200 })
    .withMessage("Email must be 200 characters or fewer.")
    .normalizeEmail(),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required.")
    .bail()
    .isLength({ max: 200 })
    .withMessage("Name must be 200 characters or fewer."),
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .bail()
    .isLength({ min: 8, max: 128 })
    .withMessage("Password must be between 8 and 128 characters."),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirmation password is required.")
    .bail()
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
