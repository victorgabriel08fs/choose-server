import { prisma } from "../prisma/client";
import { Alternative } from '@prisma/client';

export async function getRandomAlternative1(): Promise<Alternative> {
    const alternativesCount = await prisma.alternative.count();
    const skip = Math.floor(Math.random() * (alternativesCount - 1));
    const alternative = await prisma.alternative.findMany({});

    return alternative[skip];
}
export async function getRandomAlternative2({ alt1, type }: { alt1: string, type: string }): Promise<Alternative> {
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

    return alternative[skip];
}