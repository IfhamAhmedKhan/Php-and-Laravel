import express from "express";
import { getMessages, sendMessage } from "../controllers/chatController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:receiverId", authenticateToken, getMessages);
router.post("/send", authenticateToken, sendMessage);

export default router;
