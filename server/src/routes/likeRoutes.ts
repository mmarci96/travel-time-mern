import express, { Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { authenticateToken } from '../middleware/authenticateToken';
import { AuthRequest } from '../types/AuthRequest';
import { likePost } from '../services/likeService';

const router = express.Router()

router.post(
    '/',
    authenticateToken,
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const userId = req.userId as Types.ObjectId;
            const postId = req.body.postId as Types.ObjectId;
            const like = await likePost(userId, postId)
            res.status(201).send({data: like})
        } catch(err) {
            next(err)
        }
    }
)



export default router;

