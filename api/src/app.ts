import express from "express";
import passport from "passport";
import helmet from "helmet";
import cors from "cors";
import { env } from "./config/env.js";
import { generalLimiter } from "./middleware/rateLimit.js";
import { authRouter } from "./routes/authRouter.js";
import { postRouter } from "./routes/postRouter.js";
import { commentRouter } from "./routes/commentRouter.js";
import { errorHandler } from "./middleware/errorHandler.js";

import "./config/passport.js";

const app = express();

app.set("trust proxy", 1);

app.use(helmet());

const allowedOrigins = env.CORS_ORIGINS;

const corsOptions = {
  origin: allowedOrigins,
};

app.use(cors(corsOptions));
app.use(generalLimiter);
app.use(express.json());

app.use(passport.initialize());

app.use("/api/auth/", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.use(errorHandler);

export { app };
