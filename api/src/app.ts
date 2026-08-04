import express from "express";
import { postRouter } from "./routes/postRouter.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());

app.use("/api/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Placeholder.");
});

app.use(errorHandler);

export { app };
