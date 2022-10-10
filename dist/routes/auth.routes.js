"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const authRoutes = (0, express_1.Router)();
authRoutes.post("/login", AuthController_1.authController.login);
authRoutes.post("/verifytoken", AuthController_1.authController.verifyToken);
exports.default = authRoutes;
