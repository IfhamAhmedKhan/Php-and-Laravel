import { Router } from "express";
import { Login, Signup, getProfile, refreshAccessToken } from "../controller/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const route = Router();

route.post("/signup", Signup)
route.post("/login", Login)
route.get("/profile", verifyToken, getProfile)
route.post("/refresh", refreshAccessToken)

export default route;