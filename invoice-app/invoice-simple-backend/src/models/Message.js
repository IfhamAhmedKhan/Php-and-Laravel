// src/models/Message.js
const mongoose = require("mongoose");

const AttachmentSchema = new mongoose.Schema(
  {
    url: String,
    filename: String,
  },
  { _id: false }
);

const MessageSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer", // Changed from 'User' to 'Customer'
      required: true,
    },
    text: { type: String, default: "" },
    attachments: [AttachmentSchema],
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "Customer" }], // Changed from 'User' to 'Customer'
  },
  { timestamps: true }
);

MessageSchema.index({ conversation: 1, createdAt: -1 });

module.exports = mongoose.model("Message", MessageSchema);
