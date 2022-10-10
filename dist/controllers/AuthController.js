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
exports.authController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthUseCases_1 = require("../useCases/AuthUseCases");
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const privateKey = "victor";
            const user = yield AuthUseCases_1.authUseCases.login({ email, password });
            if (user) {
                jsonwebtoken_1.default.sign(user, privateKey, (err, token) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        res
                            .status(500)
                            .json({ mensagem: "Erro ao gerar o JWT" });
                        return;
                    }
                    if (token != null) {
                        yield AuthUseCases_1.authUseCases.tokenCommit({ token, userId: user.id });
                        res.set("x-access-token", token);
                        return res.status(201).json({ user: user, token });
                    }
                }));
            }
            else {
                return res.status(404).json({ error: "NOT FOUND" });
            }
        });
    }
    verifyToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.body;
            const result = yield AuthUseCases_1.authUseCases.verifyToken({ token });
            return res.status(200).json(result);
        });
    }
}
exports.authController = new AuthController();
