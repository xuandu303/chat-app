import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  messageType: {
    type: String,
    enum: ["text", "file"],
    required: true,
  },
  content: {
    type: String,
    trim: true,
    required: function () {
      return this.messageType === "text";
    },
  },
  file: {
    url: String,
    name: String,
    size: Number,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

messageSchema.pre("validate", function (next) {
  if (this.messageType === "file") {
    if (!this.file?.url || !this.file?.name || !this.file?.size) {
      return next(new Error("File message requires url, name and size"));
    }
  }
  next();
});

export default Message;
