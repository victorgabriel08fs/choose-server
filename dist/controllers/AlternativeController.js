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
Object.defineProperty(exports, "__esModule", { value: true });
exports.alternativeController = void 0;
const AlternativeUseCases_1 = require("../useCases/AlternativeUseCases");
class AlternativeController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield AlternativeUseCases_1.alternativeUseCases.index();
            return res.status(200).json(result);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { text } = req.body;
            const result = yield AlternativeUseCases_1.alternativeUseCases.create({ text });
            return res.status(201).json(result);
        });
    }
    randomAlternatives(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield AlternativeUseCases_1.alternativeUseCases.randomAlternatives();
            return res.status(200).json(result);
        });
    }
}
exports.alternativeController = new AlternativeController();
