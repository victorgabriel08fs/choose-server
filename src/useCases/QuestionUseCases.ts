import { AppError } from "../errors/AppError";
import { prisma } from "../prisma/client";

class QuestionUseCases {

    async create({ alt1, alt2, choose, userId }: { alt1: string, alt2: string, choose: string, userId: string }) {
        const question = await prisma.question.create({
            data: {
                alt1, alt2, choose, userId
            }
        });

        if (!question) {
            throw new AppError("Cannot create question");
        }

        return question;
    }

    async result({ alt1, alt2 }: { alt1: string, alt2: string }) {
        const sumAlt1 = await prisma.question.count({
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

        const sumAlt2 = await prisma.question.count({
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
    }

    async index() {
        const votes = await prisma.question.findMany({
            include: {
                user: true,
            }
        });

        return votes;
    }

}

export const questionUseCases = new QuestionUseCases();