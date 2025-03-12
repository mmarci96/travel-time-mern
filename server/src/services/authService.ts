import { UserModel } from '../model/UserModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import BadRequestError from '../errors/BadRequestError';
import { Types } from 'mongoose';
import { config } from '../config';

const secret_key = config.JWT_SECRET_KEY;
const refresh_secret_key = config.JWT_REFRESH_SECRET_KEY;

export const createToken = async (
    email: string,
    password: string,
): Promise<string> => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new BadRequestError({
            code: 400,
            message: 'No user with email',
            logging: true,
        });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new BadRequestError({
            code: 400,
            message: 'Wrong password!',
            logging: false,
        });
    }

    const token = jwt.sign(
        { userId: user._id, role: 'user', username: user.username },
        secret_key,
        {
            expiresIn: '1h',
        },
    );
    if (!token) {
        throw new BadRequestError({
            code: 400,
            message: 'Could not create token',
            logging: true,
        });
    }
    return token;
};

export const createRefreshToken = async (
    email: string,
    password: string,
): Promise<string> => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new BadRequestError({
            code: 400,
            message: 'No user with email',
            logging: true,
        });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new BadRequestError({
            code: 400,
            message: 'Wrong password!',
            logging: true,
        });
    }
    const refreshToken = jwt.sign({ userId: user._id }, refresh_secret_key, {
        expiresIn: '7d',
    });
    if (!refreshToken) {
        throw new BadRequestError({
            code: 400,
            message: 'Could not create refresh token',
            logging: true,
        });
    }

    return refreshToken;
};

export const validateRefreshToken = (refreshToken: string) => {
    const jwtPayload = jwt.verify(refreshToken, refresh_secret_key) as any;
    const userId = jwtPayload['userId'];

    return userId;
};

export const refreshToken = async (userId: Types.ObjectId) => {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new BadRequestError({
            code: 400,
            message: 'No user with id',
            logging: true,
        });
    }
    const token = jwt.sign(
        { userId: user._id, role: 'user', username: user.username },
        secret_key,
        {
            expiresIn: '1h',
        },
    );
    if (!token) {
        throw new BadRequestError({
            code: 400,
            message: 'Error getting token!',
            logging: true,
        });
    }
    return token;
};
