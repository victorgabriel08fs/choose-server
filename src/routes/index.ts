import { Router } from "express";
import alternativeRoutes from "./alternative.routes";
import questionRoutes from "./question.routes";

const routes = Router();

routes.use("/alternative", alternativeRoutes);
routes.use("/question", questionRoutes);
export default routes;