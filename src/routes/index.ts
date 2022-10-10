import { Router } from "express";
import alternativeRoutes from "./alternative.routes";
import authRoutes from "./auth.routes";
import questionRoutes from "./question.routes";
import userRoutes from "./user.routes";

const routes = Router();

routes.use("/alternative", alternativeRoutes);
routes.use("/auth", authRoutes);
routes.use("/user",userRoutes);
routes.use("/question", questionRoutes);
export default routes;