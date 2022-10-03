import { Router } from "express";
import { alternativeController } from "../controllers/AlternativeController";

const alternativeRoutes = Router();

alternativeRoutes.get("/", alternativeController.index);
alternativeRoutes.post("/", alternativeController.create);
alternativeRoutes.get("/random", alternativeController.randomAlternatives);

export default alternativeRoutes;