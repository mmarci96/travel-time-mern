import mongoose, { Document, Schema, Date, Types } from 'mongoose';

interface IUser extends Document {
    _id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at?: Date;
    user_details?: Types.ObjectId;
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
