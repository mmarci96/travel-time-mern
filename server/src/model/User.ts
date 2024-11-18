import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    userDetails: {type: Schema.Types.ObjectId, ref: 'UserDetails'}
})

const User = mongoose.model('User', userSchema)
export default User