import express, { Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { authenticateToken } from '../middleware/authenticateToken';
import { AuthRequest } from '../types/AuthRequest';
import {
    deleteNotification,
    getNotifications,
    getUnreadNotification,
    markRead,
} from '../services/notificationService';

const router = express.Router();

router.get(
    '/unread',
    authenticateToken,
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const userId = req.userId as Types.ObjectId;
            const notifications = await getUnreadNotification(userId);
            console.log(notifications);

            res.status(200).send({ notifications: notifications });
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
            const notifications = await getNotifications(userId);

            res.status(200).send({ notifications: notifications });
        } catch (err) {
            next(err);
        }
    },
);

router.patch(
    '/',
    authenticateToken,
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const userId = req.userId as Types.ObjectId;
            const notificationId = req.body.notificationId as Types.ObjectId;
            const read = await markRead(notificationId, userId);
            res.status(201).send({ notification: read });
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
            const notificationId = req.body.notificationId as Types.ObjectId;
            await deleteNotification(notificationId, userId);
            res.status(204).send({ success: 'Deleted' });
        } catch (err) {
            next(err);
        }
    },
);

export default router;
