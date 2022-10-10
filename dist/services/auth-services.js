"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateExpires = void 0;
const moment_1 = __importDefault(require("moment"));
function validateExpires({ expires }) {
    const now = new Date();
    const expiresDate = new Date(expires);
    const difference = (0, moment_1.default)(now).diff((0, moment_1.default)(expiresDate));
    const minutes = moment_1.default.duration(difference).asMinutes();
    return (minutes < 60 ? true : false);
}
exports.validateExpires = validateExpires;
