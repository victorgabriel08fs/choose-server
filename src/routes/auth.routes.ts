import { Router } from "express";
import { authController } from "../controllers/AuthController";

const authRoutes = Router();

authRoutes.post("/login", authController.login);
authRoutes.post("/verifytoken", authController.verifyToken);

export default authRoutes;