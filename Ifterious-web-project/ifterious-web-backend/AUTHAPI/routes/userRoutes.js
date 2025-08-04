import { Router } from "express";
import { Login, Signup, getProfile } from "../controller/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const route = Router();

// Public routes (no authentication required)
route.post("/signup", Signup)
route.post("/login", Login)

// Protected routes (authentication required)
route.get("/profile", verifyToken, getProfile)

export default route;