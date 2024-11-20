import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date },
    user_details: { type: Schema.Types.ObjectId, ref: 'UserDetails' },
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
