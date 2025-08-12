// src/routes/chat.js
const express = require("express");
const router = express.Router();
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const Customer = require("../models/Customers");
const upload = require("../utils/upload");
const auth = require("../middlewares/authenticate"); // using your existing passport bearer auth

// Create or get conversation
router.post("/conversations", auth, async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const { participantId } = req.body;

    if (!participantId) {
      return res.status(400).json({ message: "participantId is required" });
    }

    // enforce Builder <-> Tradie pairing
    try {
      const [me, other] = await Promise.all([
        Customer.findById(userId).populate("roleId"),
        Customer.findById(participantId).populate("roleId"),
      ]);
      if (!me || !other) {
        return res.status(404).json({ message: "User not found" });
      }
      const myRole = me?.roleId?.title || me?.role?.title;
      const otherRole = other?.roleId?.title || other?.role?.title;
      const isBuilderTradiePair =
        (myRole === "Builder" && otherRole === "Tradie") ||
        (myRole === "Tradie" && otherRole === "Builder");
      if (!isBuilderTradiePair) {
        return res.status(403).json({ message: "Conversations are only allowed between Builder and Tradie." });
      }
    } catch (roleErr) {
      console.error("Role check failed", roleErr);
      return res.status(500).json({ message: "Role validation error" });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [userId, participantId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [userId, participantId],
      });
    }

    res.json(conversation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating conversation" });
  }
});

// Get all conversations for logged-in user
router.get("/conversations", auth, async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const conversations = await Conversation.find({
      participants: userId,
    })
      .populate("participants", "fullName email roleId")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });

    res.json(conversations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching conversations" });
  }
});

// Get messages for a conversation
router.get("/messages/:conversationId", auth, async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversation: conversationId })
      .populate("sender", "fullName email roleId")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching messages" });
  }
});

// Send message (with optional attachments)
router.post(
  "/messages",
  auth,
  upload.array("attachments", 5),
  async (req, res) => {
    try {
      const userId = req.user._id.toString();
      const { conversationId, text } = req.body;

      const conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }

      const attachments = Array.isArray(req.files)
        ? req.files.map((file) => ({
            url: `/uploads/${file.filename}`,
            filename: file.originalname,
          }))
        : [];

      const message = await Message.create({
        conversation: conversationId,
        sender: userId,
        text: text || "",
        attachments,
        readBy: [userId],
      });

      conversation.lastMessage = message._id;
      conversation.unreadCount.set(
        conversation.participants.find((p) => p.toString() !== userId),
        (conversation.unreadCount.get(
          conversation.participants.find((p) => p.toString() !== userId)
        ) || 0) + 1
      );
      await conversation.save();

      // Populate sender for consistent UI display
      const populatedMessage = await Message.findById(message._id)
        .populate("sender", "fullName email roleId");

      // Emit socket event to the conversation room for all participants
      req.app.get("io").to(conversationId.toString()).emit("newMessage", populatedMessage.toObject());

      res.status(201).json(populatedMessage);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error sending message" });
    }
  }
);

module.exports = router;
