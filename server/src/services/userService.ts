import { Types } from 'mongoose';
import UserModel from '../model/UserModel';
import bcrypt from 'bcrypt';
import BadRequestError from '../errors/BadRequestError';

export const createUser = async (
    username: string,
    email: string,
    password: string,
) => {
    if (!username || !email || !password) {
        throw new Error('Missing required fields');
    }
    const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) {
        throw new Error('Username is already taken');
    }

    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
        throw new Error('Email is already registered');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new UserModel({
        username,
        email,
        password: hashedPassword,
    });

    const savedUser = await user.save();

    return {
        username: savedUser.username,
        email: savedUser.email,
    };
};

export const getUserById = async (userId: Types.ObjectId) => {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new Error('No user found');
    }
    return {
        username: user.username,
        email: user.email,
    };
};

export const getUsers = async () => {
    const users = await UserModel.find().select('-password');
    if (!users) {
        throw new BadRequestError({
            message: 'No users found',
            code: 404,
            logging: true,
        });
    }
    return users;
};
