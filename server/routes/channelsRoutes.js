import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { createChannel } from "../controllers/channelCtrl.js";

const channelsRoutes = Router();

channelsRoutes.post("/create-channel", verifyToken, createChannel);

export default channelsRoutes;
