import express, { NextFunction, Request, Response } from 'express';
import UserModel from '../model/UserModel';
import { Types } from 'mongoose';
import { getUserById } from '../services/userService';
import { authenticateToken } from '../middleware/authentToken';

const router = express.Router();
router.get('/', async (req, res, next) => {
    try {
        console.log(req.body);
        const users = await UserModel.find();
        res.status(200).send(users);
    } catch (err) {
        next(err);
    }
});

router.get(
    '/:userId',
    authenticateToken,
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
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
