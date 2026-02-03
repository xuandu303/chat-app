import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import contactsRoutes from "./routes/contactsRoutes.js";
import messagesRoutes from "./routes/messagesRoutes.js";
import channelsRoutes from "./routes/channelsRoutes.js";
import setupSocket from "./socket.js";
import fs from "fs";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const databaseURL =
  process.env.DATABASE_URL || "mongodb://localhost:27017/chat-app";

app.use((req, res, next) => {
  const origin = process.env.ORIGIN;

  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

const uploadsDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use("/uploads", express.static(uploadsDir));

app.use(express.json());
app.use(cookieParser());

app.set("trust proxy", 1);
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactsRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/channels", channelsRoutes);

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

setupSocket(server);

mongoose
  .connect(databaseURL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error(error);
  });
