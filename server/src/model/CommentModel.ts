import mongoose, { Types, Document, Date } from 'mongoose';
const Schema = mongoose.Schema;

interface IComment extends Document {
    _id: Types.ObjectId;
    author_id:
        | Types.ObjectId
        | { _id: Types.ObjectId; username: string };
    post_id: Types.ObjectId;
    content: string;
    created_at: Date;
    updated_at?: Date;
}

const commentSchema = new Schema({
    author_id: { type: Types.ObjectId, required: true, ref: 'User' },
    post_id: { type: Types.ObjectId, required: true, ref: 'Post' },
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date },
});

const CommentModel = mongoose.model<IComment>('Comment', commentSchema);
export { CommentModel, IComment }
