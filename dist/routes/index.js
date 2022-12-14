"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alternative_routes_1 = __importDefault(require("./alternative.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const question_routes_1 = __importDefault(require("./question.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const routes = (0, express_1.Router)();
routes.use("/alternative", alternative_routes_1.default);
routes.use("/auth", auth_routes_1.default);
routes.use("/user", user_routes_1.default);
routes.use("/question", question_routes_1.default);
exports.default = routes;
