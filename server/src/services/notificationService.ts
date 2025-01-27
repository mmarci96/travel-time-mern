import { Types } from 'mongoose';
import BadRequestError from '../errors/BadRequestError';
import {
    NotificationModel,
    NotificationType,
    TargetType,
} from '../model/NotificationModel';
import { UserModel } from '../model/UserModel';
import { toNotificationDto } from '../dto/notification.dto';

export const getNotifications = async (userId: Types.ObjectId) => {
    if (!userId) {
        throw new BadRequestError({
            code: 404,
            message: 'No userid provided',
            logging: true,
        });
    }

    const notifications = await NotificationModel.find({ userId: userId }).sort(
        { ['createdAt']: -1 },
    );
    if (!notifications) {
        throw new BadRequestError({
            code: 404,
            message: 'No new notifications',
            logging: false,
        });
    }
    const response = Promise.all(
        notifications.map(async (notification) => {
            const user = await UserModel.findById(notification.actorId);
            if (!user)
                throw new BadRequestError({ code: 404, message: 'Not found' });
            const actorName = user.username;
            return toNotificationDto(notification, actorName);
        }),
    );

    return response;
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

export const markRead = async (
    notificationId: Types.ObjectId,
    userId: Types.ObjectId,
) => {
    if (!userId) {
        throw new BadRequestError({
            code: 401,
            message: 'Unauthorized',
            logging: false,
        });
    }
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
    const actor = await UserModel.findById(notification.actorId);
    if (!actor) {
        throw new BadRequestError({
            code: 400,
            message: 'Did not found actor',
            logging: true,
        });
    }
    return toNotificationDto(notification, actor.username);
};

export const deleteNotification = async (
    notificationId: Types.ObjectId,
    userId: Types.ObjectId,
) => {
    if (!userId) {
        throw new BadRequestError({
            code: 403,
            message: 'Unautorized',
            logging: false,
        });
    }
    await NotificationModel.findByIdAndDelete(notificationId);

    return { success: true };
};
