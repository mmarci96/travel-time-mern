import mongoose, { Schema, Document, Date, Types } from 'mongoose';

interface IPost extends Document {
    _id: Types.ObjectId;
    author_id: Types.ObjectId;
    image_url: string;
    title: string;
    description?: string;
    location_id: Types.ObjectId;
    created_at: Date;
    updated_at?: Date;
}

const postSchema = new Schema({
    author_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    image_url: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    location_id: { type: Types.ObjectId, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date },
});

const PostModel = mongoose.model<IPost>('Post', postSchema);
export { PostModel, IPost };
