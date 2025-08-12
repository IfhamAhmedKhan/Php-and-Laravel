// src/socket/index.js
const jwt = require("jsonwebtoken");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const Customer = require("../models/Customers");

function initSocket(io) {
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error("No token provided"));

      // Verify using CLIENT_SECRET since that's what your authenticate.js uses
      const payload = jwt.verify(token, process.env.CLIENT_SECRET);
      const user = await Customer.findById(payload.userId);
      if (!user) return next(new Error("User not found"));

      socket.user = user;
      next();
    } catch (err) {
      console.error("Socket auth error:", err);
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.user.fullName}`);

    socket.on("joinConversation", (conversationId) => {
      if (!conversationId) return;
      socket.join(conversationId);
      // Optionally notify user joined
    });

    socket.on("sendMessage", async ({ conversationId, text }) => {
      if (!conversationId || typeof text !== 'string') return;

      const message = await Message.create({
        conversation: conversationId,
        sender: socket.user._id,
        text,
        attachments: [],
        readBy: [socket.user._id],
      });

      await Conversation.findByIdAndUpdate(conversationId, {
        lastMessage: message._id,
        updatedAt: new Date(),
      });

      const populated = await Message.findById(message._id)
        .populate("sender", "fullName email roleId");
      io.to(conversationId).emit("newMessage", populated.toObject());
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.user.fullName}`);
    });
  });
}

module.exports = initSocket;
