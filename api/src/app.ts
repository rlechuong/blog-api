import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Placeholder.");
});

export { app };
