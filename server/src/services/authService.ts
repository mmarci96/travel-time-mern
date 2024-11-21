import UserModel from '../model/UserModel';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Types } from 'mongoose';
dotenv.config();

const secret_key = process.env.JWT_SECRET_KEY || '';
const refresh_secret_key = process.env.JWT_REFRESH_SECRET_KEY || '';

export const createToken = async (email: string, password: string) => {
    const user = await UserModel.findOne({ email });
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

export const createRefreshToken = async (email: string, password: string) => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new Error('No user with email');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error('Wrong password!');
    }
    const refreshToken = jwt.sign({ userId: user._id }, refresh_secret_key, {
        expiresIn: '7d',
    });
    return refreshToken;
};

interface CustomJwtPayload extends JwtPayload {
    userId: string;
}

export const verifyToken = (token: string, id: Types.ObjectId) => {
    if (!token) throw new Error('Token missing!');

    const decoded = jwt.verify(token, secret_key) as CustomJwtPayload;
    const uid: Types.ObjectId = new Types.ObjectId(decoded.userId);
    if (uid.equals(id)) {
        return true;
    }
    return false;
};

export const verifyRefreshToken = (
    refreshToken: string,
    id: Types.ObjectId,
) => {
    if (!refreshToken) throw new Error('Token missing!');

    const decoded = jwt.verify(
        refreshToken,
        refresh_secret_key,
    ) as CustomJwtPayload;
    const uid: Types.ObjectId = new Types.ObjectId(decoded.userId);
    if (uid.equals(id)) {
        return true;
    }
    return false;
};
