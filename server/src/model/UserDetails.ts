import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userDetailsSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthdate: { type: Date, required: true },
    bio: { type: String, default: '' },
    location: { type: String, default: '' },
    interests: { type: Array, default: [] },
    visitingList: { type: Array, default: [] },
    gender: { type: String, default: null },
    socialMediaLinks: { platform: String, link: String, default: {} },
    languagesSpoken: { type: Array, default: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
})

const UserDetails = mongoose.model('UserDetails', userDetailsSchema)
export default UserDetails