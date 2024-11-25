import express, { NextFunction, Response } from 'express';
import { AuthRequest } from '../types/AuthRequest';
import { Types } from 'mongoose';
import { getUserById, getUsers } from '../services/userService';
import { authenticateToken } from '../middleware/authenticateToken';

const router = express.Router();
router.get(
    '/',
    authenticateToken,
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const users = await getUsers();
            res.status(200).send(users);
        } catch (err) {
            next(err);
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
            const userId: string = req.params.userId;
            const id: Types.ObjectId = new Types.ObjectId(userId);
            const user = await getUserById(id);
            return res.status(200).send(user);
        } catch (error) {
            next(error);
        }
    },
);

export default router;
