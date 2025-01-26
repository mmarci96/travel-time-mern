import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    _id: Schema.Types.ObjectId;
    username: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at?: Date;
    user_details?: Schema.Types.ObjectId;
}

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date },
    user_details: { type: Schema.Types.ObjectId, ref: 'UserDetails' },
});

const UserModel = mongoose.model<IUser>('User', userSchema);
export { UserModel, IUser };
