import { Router } from "express";
import { questionController } from "../controllers/QuestionController";

const questionRoutes = Router();

questionRoutes.get("/",questionController.index);

questionRoutes.post("/", questionController.create);
questionRoutes.get("/result/:alt1/:alt2", questionController.result);

export default questionRoutes;