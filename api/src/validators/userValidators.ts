import { body } from "express-validator";

const updateUserRoleValidator = [
  body("role")
    .notEmpty()
    .withMessage("Role is required.")
    .bail()
    .isIn(["USER", "AUTHOR", "ADMIN"])
    .withMessage("Role must be USER, AUTHOR, or ADMIN."),
];

export { updateUserRoleValidator };
