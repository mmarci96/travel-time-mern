import express, { NextFunction, Response } from 'express';
import { AuthRequest } from '../types/AuthRequest';
import {
    getUserDetailsById,
    getUserInfoList,
    getUsers,
} from '../services/userService';
import { authenticateToken } from '../middleware/authenticateToken';
import { Types } from 'mongoose';

const router = express.Router();
router.get(
    '/',
    authenticateToken,
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const users = await getUsers();
            res.status(200).send({ users: users });
        } catch (err) {
            next(err);
        }
    },
);

router.get(
    '/discover',
    authenticateToken,
    async (
        req: AuthRequest,
        res: Response,
        next: NextFunction,
    ): Promise<any> => {
        try {
            const { limit, page } = req.query;
            const users = await getUserInfoList(limit, page);

            res.status(200).send({ users: users });
        } catch (error) {
            next(error);
        }
    },
);

router.get(
    '/:userId',
    authenticateToken,
    async (
        req: AuthRequest,
        res: Response,
        next: NextFunction,
    ): Promise<any> => {
        try {
            const { userId } = req.params;
            const user = await getUserDetailsById(new Types.ObjectId(userId));
            return res.status(200).send({ user: user });
        } catch (error) {
            next(error);
        }
    },
);

export default router;
