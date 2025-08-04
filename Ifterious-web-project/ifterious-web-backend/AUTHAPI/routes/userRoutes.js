import { Router } from "express";
import { Login, Signup, getProfile } from "../controller/userController.js";

const route = Router();

route.post("/signup", Signup)
route.post("/login",Login)
route.get("/profile", getProfile)

export default route;