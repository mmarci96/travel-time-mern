import mongoose from 'mongoose';
const Schema = mongoose.Schema;

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

const UserDetailsModel = mongoose.model('UserDetails', userDetailsSchema);
export default UserDetailsModel;
