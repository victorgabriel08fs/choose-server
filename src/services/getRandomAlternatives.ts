import { prisma } from "../prisma/client";
import { Alternative } from '@prisma/client';

export async function getRandomAlternative1({ userId }: { userId: string }): Promise<Alternative> {
    const alternativesCount = await prisma.alternative.count();
    const skip = Math.floor(Math.random() * (alternativesCount - 1));
    const alternative = await prisma.alternative.findMany({});

    return alternative[skip];
}
export async function getRandomAlternative2({ alt1, type, userId }: { alt1: string, type: string, userId: string }): Promise<Alternative> {
    const alternativesCount = await prisma.alternative.count({
        where: {
            id: {
                not: alt1
            },
            type: type

        }
    });
    const skip = Math.floor(Math.random() * (alternativesCount - 1));
    const alternative = await prisma.alternative.findMany({
        where: {
            id: {
                not: alt1
            },
            type: type

        }
    });

    const question = await prisma.question.findFirst({
        where: {
            AND: [
                {
                    OR: [{
                        AND: [{
                            alt1: { equals: alt1 }
                        },
                        {
                            alt2: { equals: alternative[skip].id }
                        }]
                    },
                    {
                        AND: [{
                            alt1: { equals: alternative[skip].id }
                        },
                        {
                            alt2: { equals: alt1 }
                        }
                        ]
                    }]
                },
                {
                    userId: {
                        equals: userId
                    }
                }
            ]
        }
    });

    if (question != null) {
        getRandomAlternative1({ userId });
    }

    return alternative[skip];
}