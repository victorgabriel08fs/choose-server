import { Request, Response } from "express";
import { questionUseCases } from "../useCases/QuestionUseCases";

class QuestionController {

    async create(req: Request, res: Response) {
        const { alt1, alt2, choose, userId } = req.body;

        const result = await questionUseCases.create({ alt1, alt2, choose, userId });

        return res.status(201).json(result);
    }

    async result(req: Request, res: Response) {
        const { alt1, alt2 } = req.params;
        const result = await questionUseCases.result({ alt1, alt2 });
        const resultArray = result[0] === 0 && result[1] === 0 ? {
            alt1: 50,
            alt2: 50
        } : (result[0] === 0 || result[1] === 0 ? {
            alt1: result[0] === 0 ? 1 : 99,
            alt2: result[1] === 0 ? 1 : 99
        } : {
            alt1: (result[0] / (result[0] + result[1]) * 100),
            alt2: (result[1] / (result[0] + result[1]) * 100)
        })

        return res.status(200).json(resultArray);
    }
}

export const questionController = new QuestionController();