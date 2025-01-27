import { Types, Date } from 'mongoose';
import {
    INotification,
    NotificationType,
    TargetType,
} from '../model/NotificationModel';

export interface NotificationDTO {
    id: Types.ObjectId;
    userId: Types.ObjectId;
    type: NotificationType;
    actorId: Types.ObjectId;
    actorUsername: string;
    targetId?: Types.ObjectId;
    targetType?: TargetType;
    message?: string;
    read: boolean;
    createdAt: Date;
}

export const toNotificationDto = (
    notification: INotification,
    actorUsername: string,
): NotificationDTO => ({
    id: notification._id,
    actorUsername: actorUsername,
    userId: notification.userId,
    type: notification.type,
    actorId: notification.actorId,
    targetId: notification.targetId,
    targetType: notification.targetType,
    message: notification.message,
    read: notification.read,
    createdAt: notification.createdAt,
});
