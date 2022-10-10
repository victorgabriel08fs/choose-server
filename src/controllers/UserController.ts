import { Request, Response } from "express";
import { userUseCases } from "../useCases/UserUseCases";

class UserController {
    async create(req: Request, res: Response) {
        const { email, name, password } = req.body;

        const result = await userUseCases.create({ email, name, password });

        return res.status(201).json(result);
    }
}

export const userController = new UserController();