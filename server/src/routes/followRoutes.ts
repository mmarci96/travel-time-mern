import express, { Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { authenticateToken } from '../middleware/authenticateToken';
import { AuthRequest } from '../types/AuthRequest';
import {
    followUser,
    getFollowers,
    getFollowing,
    unfollowUser,
} from '../services/followService';

const router = express.Router();

router.post(
    '/',
    authenticateToken,
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const userId = req.userId as Types.ObjectId;
            const followId = req.body.followId as Types.ObjectId;
            const follow = await followUser(
                userId,
                new Types.ObjectId(followId),
            );
            res.status(201).send({ data: follow });
        } catch (err) {
            next(err);
        }
    },
);

router.delete(
    '/',
    authenticateToken,
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const userId = req.userId as Types.ObjectId;
            const unfollowId = req.body.unfollowId as Types.ObjectId;
            await unfollowUser(userId, unfollowId);
            res.status(204).send({ success: true });
        } catch (err) {
            next(err);
        }
    },
);

router.get(
    '/',
    authenticateToken,
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const userId = req.userId as Types.ObjectId;
            const followers = await getFollowers(userId);
            const following = await getFollowing(userId);
            const result = {
                followers,
                following,
            };
            res.status(200).send({ data: result });
        } catch (err) {
            next(err);
        }
    },
);

export default router;
