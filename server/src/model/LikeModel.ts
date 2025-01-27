import mongoose, { Document, Types, Schema, Date } from 'mongoose';

interface ILike extends Document {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    post: Types.ObjectId;
    created_at: Date;
}

const likeSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    created_at: { type: Date, default: Date.now },
});

likeSchema.index({ user: 1, post: 1 }, { unique: true });

const LikeModel = mongoose.model<ILike>('Like', likeSchema);

export { LikeModel, ILike };
