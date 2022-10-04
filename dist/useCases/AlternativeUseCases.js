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
exports.alternativeUseCases = void 0;
const AppError_1 = require("../errors/AppError");
const client_1 = require("../prisma/client");
const getRandomAlternatives_1 = require("../services/getRandomAlternatives");
class AlternativeUseCases {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            const alternatives = yield client_1.prisma.alternative.findMany();
            return alternatives;
        });
    }
    create({ text }) {
        return __awaiter(this, void 0, void 0, function* () {
            const alternative = yield client_1.prisma.alternative.create({
                data: {
                    text
                }
            });
            if (!alternative) {
                throw new AppError_1.AppError("Cannot create alternative");
            }
            return alternative;
        });
    }
    randomAlternatives() {
        return __awaiter(this, void 0, void 0, function* () {
            const alternative1 = yield (0, getRandomAlternatives_1.getRandomAlternative1)();
            const alternative2 = yield (0, getRandomAlternatives_1.getRandomAlternative2)({ alt1: alternative1.id, type: alternative1.type });
            return [alternative1, alternative2];
        });
    }
}
exports.alternativeUseCases = new AlternativeUseCases();
