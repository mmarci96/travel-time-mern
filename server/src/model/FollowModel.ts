import mongoose, { Document, Schema, Types, Date } from 'mongoose';

interface IFollow extends Document {
    follower: Types.ObjectId; 
    following: Types.ObjectId;
    created_at: Date;
}

const followSchema = new Schema({
    follower: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    following: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    created_at: { type: Date, default: Date.now },
});

followSchema.index({ follower: 1, following: 1 }, { unique: true });

const FollowModel = mongoose.model<IFollow>('Follow', followSchema);

export { FollowModel, IFollow };
