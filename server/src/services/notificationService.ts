import { Types } from 'mongoose';
import BadRequestError from '../errors/BadRequestError';
import {
    NotificationModel,
    NotificationType,
    TargetType,
} from '../model/NotificationModel';

export const getNotifications = async (userId: Types.ObjectId) => {
    if (!userId) {
        throw new BadRequestError({
            code: 404,
            message: 'No userid provided',
            logging: true,
        });
    }

    const notifications = await NotificationModel.find({ userId: userId });
    if (!notifications) {
        throw new BadRequestError({
            code: 404,
            message: 'No new notifications',
            logging: false,
        });
    }
    return notifications;
};

export const createNotification = async (
    userId: Types.ObjectId,
    actorId: Types.ObjectId,
    type: NotificationType,
    targetId: Types.ObjectId,
    targetType: TargetType,
    message: string,
) => {
    const newNotification = new NotificationModel({
        userId,
        type,
        actorId,
        targetId,
        targetType,
        message,
        read: false,
    });

    await newNotification.save();
    console.log('Notification saved:', newNotification);
};

export const markRead = async (notificationId: Types.ObjectId) => {
    if (!notificationId) {
        throw new BadRequestError({
            code: 404,
            message: 'No id provided',
            logging: false,
        });
    }
    const notification = await NotificationModel.findOneAndUpdate(
        { _id: notificationId },
        { read: true },
    );
    if (!notification) {
        throw new BadRequestError({
            code: 400,
            message: 'Did not found notification',
            logging: true,
        });
    }

    return notification;
};

export const deleteNotification = async (notificationId: Types.ObjectId) => {
    await NotificationModel.findByIdAndDelete(notificationId);

    return { success: true };
};
