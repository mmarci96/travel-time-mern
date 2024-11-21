import express, { Request, Response, NextFunction } from 'express';
import { createUser } from '../services/userService';
import { createToken, createRefreshToken } from '../services/authService';

const router = express.Router();

router.post(
    '/signup',
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { username, email, password } = req.body;
            const user = await createUser(username, email, password);

            return res.status(201).send(user);
        } catch (err: any) {
            next(err);
        }
    },
);

router.post(
    '/login',
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { email, password } = req.body;

            const newToken = await createToken(email, password);
            const refreshToken = await createRefreshToken(email, password);

            const response = { token: newToken, refreshToken: refreshToken };
            return res.status(200).send(response);
        } catch (err: any) {
            next(err);
        }
    },
);

export default router;
