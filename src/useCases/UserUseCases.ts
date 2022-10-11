import CryptoJS, { MD5 } from 'crypto-js';
import { prisma } from '../prisma/client';

class UserUseCases {
    async create({ email, name, password }: { email: string, name: string, password: string }) {
        const ciphertext = MD5(password).toString();
        const user = await prisma.user.create({
            data: {
                email, name, password: ciphertext
            }
        });

        return user;
    }

    async index() {
        const users = await prisma.user.findMany();

        return users;
    }
}

export const userUseCases = new UserUseCases();