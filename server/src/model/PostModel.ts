import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema({
    author_id: { typre: Schema.Types.ObjectId, ref: 'User'},
    image_url: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    location: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date },
})

const PostModel = mongoose.model('Post', postSchema)
export default PostModel
