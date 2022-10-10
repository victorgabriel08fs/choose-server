"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const userRoutes = (0, express_1.Router)();
userRoutes.post("/", UserController_1.userController.create);
exports.default = userRoutes;
