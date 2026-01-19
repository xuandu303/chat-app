import Message from "../models/messagesModel.js";

export const getMessages = async (req, res) => {
  try {
    const user1 = req.userId;
    const user2 = req.body.id;

    if (!user1 || !user2) {
      return res.status(400).json("Both user ID's are required.");
    }

    const messages = await Message.find({
      $or: [
        { sender: user1, recipient: user2 },
        { sender: user2, recipient: user1 },
      ],
    })
      .sort({ timestamp: -1 })
      .limit(20);
    messages.reverse();
    return res.status(200).json({ messages });
  } catch (error) {
    console.error({ error });
    res.status(500).json({ message: "Server error" });
  }
};
