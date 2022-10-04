import { AppError } from "../errors/AppError";
import { prisma } from "../prisma/client";
import { getRandomAlternative1, getRandomAlternative2 } from "../services/getRandomAlternatives";
import { verifyAlternatives } from "../services/verifyAlternatives";

class AlternativeUseCases {

    async index() {
        const alternatives = await prisma.alternative.findMany();

        return alternatives;
    }

    async create({ text }: { text: string }) {
        const alternative = await prisma.alternative.create({
            data: {
                text
            }
        });

        if (!alternative) {
            throw new AppError("Cannot create alternative");
        }

        return alternative;
    }

    async randomAlternatives() {
        const alternative1 = await getRandomAlternative1();
        const alternative2 = await getRandomAlternative2({ alt1: alternative1.id,type:alternative1.type });

        return [alternative1, alternative2];

    }
}

export const alternativeUseCases = new AlternativeUseCases();