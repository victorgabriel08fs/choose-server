"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUseCases = void 0;
const client_1 = require("../prisma/client");
const crypto_js_1 = __importDefault(require("crypto-js"));
const AppError_1 = require("../errors/AppError");
const auth_services_1 = require("../services/auth-services");
const moment_1 = __importDefault(require("moment"));
class AuthUseCases {
    login({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield client_1.prisma.user.findUnique({
                where: {
                    email
                }
            });
            if (user != null) {
                var bytes = crypto_js_1.default.AES.decrypt(user.password, 'victor');
                console.log(bytes);
                var decryptedData = JSON.parse(bytes.toString(crypto_js_1.default.enc.Utf8));
                console.log(decryptedData);
                if (decryptedData != password) {
                    throw new AppError_1.AppError("Email or password invalid");
                }
                else {
                    const returnableUser = yield client_1.prisma.user.findUnique({
                        where: {
                            id: user.id
                        },
                        select: {
                            name: true,
                            email: true,
                            id: true,
                            isAdmin: true
                        }
                    });
                    return returnableUser;
                }
            }
        });
    }
    verifyToken({ token }) {
        return __awaiter(this, void 0, void 0, function* () {
            const findedToken = yield client_1.prisma.session.findFirst({
                where: {
                    sessionToken: token
                }
            });
            return { status: findedToken ? (0, auth_services_1.validateExpires)({ expires: findedToken.expires }) : false };
        });
    }
    tokenCommit({ token, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            const nowMoment = (0, moment_1.default)(now).add(60, "minutes").toDate();
            const session = yield client_1.prisma.session.create({
                data: {
                    sessionToken: token,
                    userId,
                    expires: nowMoment
                }
            });
            return session;
        });
    }
}
exports.authUseCases = new AuthUseCases();
