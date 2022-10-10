import { Request, Response } from "express";
import { userUseCases } from "../useCases/UserUseCases";

class UserController {
    async create(req: Request, res: Response) {
        const { email, name, password } = req.body;

        const result = await userUseCases.create({ email, name, password });

        return res.status(201).json(result);
    }

    async index(req: Request, res: Response) {
        const result = await userUseCases.index();

        return res.status(200).json(result);
    }
}

export const userController = new UserController();