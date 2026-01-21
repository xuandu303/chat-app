import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { createChannel, getUserChannels } from "../controllers/channelCtrl.js";

const channelsRoutes = Router();

channelsRoutes.post("/create-channel", verifyToken, createChannel);
channelsRoutes.get("/get-user-channels", verifyToken, getUserChannels);

export default channelsRoutes;
