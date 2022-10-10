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
exports.questionUseCases = void 0;
const AppError_1 = require("../errors/AppError");
const client_1 = require("../prisma/client");
class QuestionUseCases {
    create({ alt1, alt2, choose, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const question = yield client_1.prisma.question.create({
                data: {
                    alt1, alt2, choose, userId
                }
            });
            if (!question) {
                throw new AppError_1.AppError("Cannot create question");
            }
            return question;
        });
    }
    result({ alt1, alt2 }) {
        return __awaiter(this, void 0, void 0, function* () {
            const sumAlt1 = yield client_1.prisma.question.count({
                where: {
                    AND: [
                        {
                            OR: [{
                                    AND: [{
                                            alt1: { equals: alt1 }
                                        },
                                        {
                                            alt2: { equals: alt2 }
                                        }]
                                },
                                {
                                    AND: [{
                                            alt1: { equals: alt2 }
                                        },
                                        {
                                            alt2: { equals: alt1 }
                                        }
                                    ]
                                }]
                        },
                        {
                            choose: {
                                equals: alt1
                            }
                        }
                    ]
                }
            });
            const sumAlt2 = yield client_1.prisma.question.count({
                where: {
                    AND: [
                        {
                            OR: [{
                                    AND: [{
                                            alt1: { equals: alt1 }
                                        },
                                        {
                                            alt2: { equals: alt2 }
                                        }]
                                },
                                {
                                    AND: [{
                                            alt1: { equals: alt2 }
                                        },
                                        {
                                            alt2: { equals: alt1 }
                                        }
                                    ]
                                }]
                        },
                        {
                            choose: {
                                equals: alt2
                            }
                        }
                    ]
                }
            });
            return [sumAlt1, sumAlt2];
        });
    }
}
exports.questionUseCases = new QuestionUseCases();
