import express, { NextFunction, Request, Response } from 'express';
import UserModel from '../model/UserModel';
import UserDetailsModel from '../model/UserDetailsModel';
import { verifyToken } from '../services/authService';
import { Types } from 'mongoose';
import { getUserById } from '../services/userService';

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

router.get('/:userId', async (req: Request, res: Response, next: NextFunction) :Promise<any> => {
    try {
        if (!req.headers.authorization) {
            return res.status(403).send({ error: 'No credentials sent!' });
        }
        const authHeader = req.headers['authorization']; // Get the auth header
        const token = authHeader && authHeader.split(' ')[1]; // Extract token (Bearer TOKEN)       
         const userId: string = req.params.userId;
        const id: Types.ObjectId = new Types.ObjectId(userId);
        const verify = verifyToken(token, id);

        if (!verify) {
            return res.status(403).send({ error: 'Not valid' });
        }
        const user= await getUserById(id);
        return res.status(200).send(user);
    } catch (error) {
        next(error);
    }
});

export default router;
