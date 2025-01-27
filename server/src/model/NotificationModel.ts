import mongoose, { Date, Document, Schema } from 'mongoose';

enum NotificationType {
    FOLLOW = 'FOLLOW',
    LIKE = 'LIKE',
    COMMENT = 'COMMENT',
}

enum TargetType {
    POST = 'POST',
    COMMENT = 'COMMENT',
    USER = 'USER',
}

interface INotification extends Document {
    _id: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    type: NotificationType;
    actorId: Schema.Types.ObjectId;
    targetId?: Schema.Types.ObjectId;
    targetType?: TargetType;
    message?: string;
    metadata?: Record<string, any>;
    read: boolean;
    createdAt: Date;
}

const notificationSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    type: {
        type: String,
        enum: Object.values(NotificationType),
        required: true,
    },
    actorId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    targetId: { type: Schema.Types.ObjectId, required: false },
    targetType: {
        type: String,
        enum: Object.values(TargetType),
        required: false,
    },
    message: { type: String, required: false },
    metadata: { type: Schema.Types.Mixed, required: false },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

const NotificationModel = mongoose.model<INotification>(
    'Notification',
    notificationSchema,
);
export { NotificationModel, INotification, NotificationType, TargetType };
