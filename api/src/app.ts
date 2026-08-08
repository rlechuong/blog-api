import express from "express";
import passport from "passport";
import { authRouter } from "./routes/authRouter.js";
import { postRouter } from "./routes/postRouter.js";
import { commentRouter } from "./routes/commentRouter.js";
import { errorHandler } from "./middleware/errorHandler.js";

import "./config/passport.js";

const app = express();

app.use(express.json());

app.use(passport.initialize());

app.use("/api/auth/", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

app.get("/", (req, res) => {
  res.send("Placeholder.");
});

app.use(errorHandler);

export { app };
