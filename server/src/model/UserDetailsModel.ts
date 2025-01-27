import mongoose, { Document, Schema, Date } from 'mongoose';

interface IUserDetails extends Document {
    _id: Schema.Types.ObjectId;
    first_name: string;
    last_name: string;
    birthdate: Date;
    bio?: string;
    location?: string;
    interests?: string[];
    visiting_list?: string[];
    gender?: string;
    social_media_links?: { platform: string; link: string };
    languages_spoken?: string[];
    avatar_url?: string;
    created_at: Date;
    updated_at?: Date;
}

const userDetailsSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    birthdate: { type: Date, required: true },
    bio: { type: String, default: '' },
    location: { type: String, default: '' },
    interests: { type: Array, default: [] },
    visiting_list: { type: Array, default: [] },
    gender: { type: String, default: null },
    social_media_links: { platform: String, link: String, default: {} },
    languages_spoken: { type: Array, default: [] },
    avatar_url: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date },
});

const UserDetailsModel = mongoose.model<IUserDetails>(
    'UserDetails',
    userDetailsSchema,
);
export { UserDetailsModel, IUserDetails };
