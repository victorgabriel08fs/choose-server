"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AlternativeController_1 = require("../controllers/AlternativeController");
const alternativeRoutes = (0, express_1.Router)();
alternativeRoutes.get("/", AlternativeController_1.alternativeController.index);
alternativeRoutes.post("/", AlternativeController_1.alternativeController.create);
alternativeRoutes.get("/random/:userId", AlternativeController_1.alternativeController.randomAlternatives);
exports.default = alternativeRoutes;
