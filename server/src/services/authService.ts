import UserModel from '../model/UserModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import BadRequestError from '../errors/BadRequestError'; // Import the BadRequestError class
dotenv.config();

const secret_key = process.env.JWT_SECRET_KEY || '';
const refresh_secret_key = process.env.JWT_REFRESH_SECRET_KEY || '';

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

    //TODO: user role add
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
