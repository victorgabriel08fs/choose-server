import { Router } from "express";
import { userController } from "../controllers/UserController";

const userRoutes = Router();

userRoutes.get("/", userController.index);

userRoutes.post("/", userController.create);

export default userRoutes;