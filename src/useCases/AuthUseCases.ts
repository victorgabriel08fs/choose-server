import { prisma } from "../prisma/client";
import CryptoJS from 'crypto-js';
import { AppError } from "../errors/AppError";
import { validateExpires } from "../services/auth-services";
import moment from 'moment';
import { MD5 } from "crypto-js";

class AuthUseCases {
    async login({ email, password }: { email: string, password: string }) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (user != null) {
            var encryptedData = MD5(password).toString();
            if (encryptedData != user.password) {
                throw new AppError("Email or password invalid");
            }
            else {
                const returnableUser = await prisma.user.findUnique({
                    where: {
                        id: user.id
                    },
                    select: {
                        name: true,
                        email: true,
                        id: true,
                        isAdmin: true
                    }
                })

                return returnableUser;
            }
        }
    }

    async verifyToken({ token }: { token: string }) {
        const findedToken = await prisma.session.findFirst({
            where: {
                sessionToken: token
            }
        });

        return { status: findedToken ? validateExpires({ expires: findedToken.expires }) : false };
    }

    async tokenCommit({ token, userId }: { token: string, userId: string }) {
        const now = new Date();

        const nowMoment = moment(now).add(60, "minutes").toDate();

        const session = await prisma.session.create({
            data: {
                sessionToken: token,
                userId,
                expires: nowMoment
            }
        });

        return session;
    }

}

export const authUseCases = new AuthUseCases();
