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
exports.questionController = void 0;
const QuestionUseCases_1 = require("../useCases/QuestionUseCases");
class QuestionController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { alt1, alt2, choose, userId } = req.body;
            const result = yield QuestionUseCases_1.questionUseCases.create({ alt1, alt2, choose, userId });
            return res.status(201).json(result);
        });
    }
    result(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { alt1, alt2 } = req.params;
            const result = yield QuestionUseCases_1.questionUseCases.result({ alt1, alt2 });
            const resultArray = result[0] === 0 && result[1] === 0 ? {
                alt1: 50,
                alt2: 50
            } : (result[0] === 0 || result[1] === 0 ? {
                alt1: result[0] === 0 ? 1 : 99,
                alt2: result[1] === 0 ? 1 : 99
            } : {
                alt1: (result[0] / (result[0] + result[1]) * 100),
                alt2: (result[1] / (result[0] + result[1]) * 100)
            });
            return res.status(200).json(resultArray);
        });
    }
}
exports.questionController = new QuestionController();
