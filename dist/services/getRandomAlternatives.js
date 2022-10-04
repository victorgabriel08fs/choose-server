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
exports.getRandomAlternative2 = exports.getRandomAlternative1 = void 0;
const client_1 = require("../prisma/client");
function getRandomAlternative1() {
    return __awaiter(this, void 0, void 0, function* () {
        const alternativesCount = yield client_1.prisma.alternative.count();
        const skip = Math.floor(Math.random() * (alternativesCount - 1));
        const alternative = yield client_1.prisma.alternative.findMany({});
        return alternative[skip];
    });
}
exports.getRandomAlternative1 = getRandomAlternative1;
function getRandomAlternative2({ alt1, type }) {
    return __awaiter(this, void 0, void 0, function* () {
        const alternativesCount = yield client_1.prisma.alternative.count({
            where: {
                id: {
                    not: alt1
                },
                type: type
            }
        });
        const skip = Math.floor(Math.random() * (alternativesCount - 1));
        const alternative = yield client_1.prisma.alternative.findMany({
            where: {
                id: {
                    not: alt1
                },
                type: type
            }
        });
        return alternative[skip];
    });
}
exports.getRandomAlternative2 = getRandomAlternative2;
