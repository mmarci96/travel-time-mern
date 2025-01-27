import express, { Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { authenticateToken } from '../middleware/authenticateToken';
import { AuthRequest } from '../types/AuthRequest';
import { followUser } from '../services/followService';

const router = express.Router()

router.post(
    '/', 
    authenticateToken,
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const userId = req.userId as Types.ObjectId
            const followId = req.body.followId as Types.ObjectId;
            const follow = await followUser(userId, new Types.ObjectId(followId))
            res.status(201).send({ data: follow })
        } catch (err) {
            next(err)
        }
    }
)



export default router;
