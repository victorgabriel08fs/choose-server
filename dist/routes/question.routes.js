"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const QuestionController_1 = require("../controllers/QuestionController");
const questionRoutes = (0, express_1.Router)();
questionRoutes.post("/", QuestionController_1.questionController.create);
questionRoutes.get("/result/:alt1/:alt2", QuestionController_1.questionController.result);
exports.default = questionRoutes;
