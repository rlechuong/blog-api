import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { findUserByEmail } from "../queries/userQueries.js";
import { comparePassword } from "../lib/password.js";

passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await findUserByEmail(email);
      if (!user) {
        return done(null, false, { message: "Invalid email or password." });
      }

      const match = await comparePassword(password, user.passwordHash);
      if (!match) {
        return done(null, false, { message: "Invalid email or password." });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);
