import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { authUseCases } from "../useCases/AuthUseCases";

class AuthController {
    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const privateKey = "victor";

        const user = await authUseCases.login({ email, password });

        if (user) {

            jwt.sign(user, privateKey, async (err, token) => {
                if (err) {
                    res
                        .status(500)
                        .json({ mensagem: "Erro ao gerar o JWT" });

                    return;
                }
                if (token != null) {
                    await authUseCases.tokenCommit({ token, userId: user.id })
                    res.set("x-access-token", token);
                    return res.status(201).json({ user: user, token });
                }
            });
        } else {
            return res.status(404).json({ error: "NOT FOUND" });
        }
    }

    async verifyToken(req: Request, res: Response) {
        const { token } = req.body;

        const result = await authUseCases.verifyToken({ token });

        return res.status(200).json(result);
    }
}

export const authController = new AuthController();