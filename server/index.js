import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const databaseURL =
  process.env.DATABASE_URL || "mongodb://localhost:27017/chat-app";

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methos: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose
  .connect(databaseURL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error(error);
  });
