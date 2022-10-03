import { Request, Response } from "express";
import { alternativeUseCases } from "../useCases/AlternativeUseCases";

class AlternativeController {

    async index(req: Request, res: Response) {
        const result = await alternativeUseCases.index();

        return res.status(200).json(result);
    }

    async create(req: Request, res: Response) {
        const { text } = req.body;
        const result = await alternativeUseCases.create({ text });

        return res.status(201).json(result);
    }

    async randomAlternatives(req: Request, res: Response) {
        const result = await alternativeUseCases.randomAlternatives();

        return res.status(200).json(result);
    }

}

export const alternativeController = new AlternativeController();