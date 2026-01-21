import mongoose from "mongoose";
import Channel from "../models/channelModel.js";
import User from "../models/userModel.js";

export const createChannel = async (req, res) => {
  try {
    const { name, members } = req.body;
    const userId = req.userId;

    const admin = await User.findById(userId);
    if (!admin) {
      return res.status(400).json({ message: "Admin user not found." });
    }

    const validMembers = await User.find({
      _id: { $in: members },
    });

    if (validMembers.length !== members.length) {
      return res
        .status(400)
        .json({ message: "Some members are not valid users." });
    }

    const newChannel = await Channel.create({
      name,
      members,
      admin: userId,
    });

    return res.status(201).json({ channel: newChannel });
  } catch (error) {
    console.error("Create channel error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserChannels = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);

    const channels = await Channel.find({
      $or: [{ admin: userId }, { members: userId }],
    }).sort({ updatedAt: -1 });

    return res.status(201).json({ channels });
  } catch (error) {
    console.error("Create channel error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
