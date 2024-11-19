import mongoose, { Types } from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    author_id: { type: Types.ObjectId, required: true },
    post_id: { type: Types.ObjectId, required: true },
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date },
});

const CommentModel = mongoose.model('Comment', commentSchema);
export default CommentModel;
