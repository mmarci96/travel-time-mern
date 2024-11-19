import User from '../model/User';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Types } from 'mongoose';
dotenv.config();

const secret_key = process.env.JWT_SECRET_KEY || '';

export const createToken = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('No user with email');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error('Wrong password!');
    }
    const token = jwt.sign({ userId: user._id }, secret_key, {
        expiresIn: '1h',
    });
    return token;
};

interface CustomJwtPayload extends JwtPayload {
    userId: string; 
}

export const verifyToken = (token: string, id: Types.ObjectId) => {
    if (!token) throw new Error('Token missing!');

    // Use a type assertion here to tell TypeScript the expected type of the decoded token
    const decoded = jwt.verify(token, secret_key) as CustomJwtPayload;

    // Access userId safely now that TypeScript knows it exists
    const uid: Types.ObjectId = new Types.ObjectId(decoded.userId);

    if (uid.equals(id)) {
        return true;
    }

    return false;
};
