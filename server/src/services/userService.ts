import { Schema, Types } from 'mongoose';
import { UserModel } from '../model/UserModel';
import bcrypt from 'bcrypt';
import BadRequestError from '../errors/BadRequestError';
import { UserDetailsDTO, UserInfoDTO } from '../dto/user.dto';
import { UserDetailsModel } from '../model/UserDetailsModel';

export const getUserInfoList = async (limit: any, page: any) => {
    if (!limit || !page) {
        limit = '10';
        page = '1';
    }
    let limitNum = parseInt(limit);
    let pageCount = parseInt(page);
    if (isNaN(limitNum) && isNaN(pageCount)) {
        limitNum = 10;
        pageCount = 1;
    }

    const users = await UserModel.find()
        .skip((pageCount - 1) * limitNum)
        .limit(limitNum);

    const results = await Promise.all(
        users.map(async (user) => {
            const userDetail = await UserDetailsModel.findById(
                user.user_details,
            );
            if (!userDetail) {
                console.log('missing user_details');
                return null; // Return null for users with missing details
            }

            return {
                id: user._id,
                username: user.username,
                first_name: userDetail.first_name,
                last_name: userDetail.last_name,
                avatar_url: userDetail.avatar_url,
                bio: userDetail.bio,
                location: userDetail.location,
                created_at: user.created_at,
            } as UserInfoDTO;
        }),
    );

    // Filter out any null results (users with missing details)
    return results.filter((result) => result !== null);
};

export const getUserDetailsById = async (
    id: string,
): Promise<UserDetailsDTO> => {
    if (!id) {
        throw new BadRequestError({
            message: 'No user id provided!',
            code: 400,
            logging: true,
        });
    }
    const userId = new Schema.Types.ObjectId(id);
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new BadRequestError({
            message: 'No user found',
            code: 404,
            logging: true,
        });
    }
    const userDetails = await UserDetailsModel.findById(user.user_details);

    if (!user._id) {
        throw new BadRequestError({
            message: 'No user found',
            code: 404,
            logging: true,
        });
    }
    if (!userDetails) {
        const empty: UserDetailsDTO = {
            id: user._id,
            username: user.username,
            created_at: user?.created_at,
        };
        return empty;
    }
    const result: UserDetailsDTO = {
        id: user._id,
        username: user.username,
        first_name: userDetails?.first_name,
        last_name: userDetails?.last_name,
        birthdate: userDetails?.birthdate,
        bio: userDetails?.bio,
        location: userDetails?.location,
        interests: userDetails?.interests,
        visiting_list: userDetails?.visiting_list,
        gender: userDetails?.gender,
        social_media_links: userDetails?.social_media_links,
        avatar_url: userDetails?.avatar_url,
        created_at: user.created_at,
    };

    return result;
};

export const createUser = async (
    username: string,
    email: string,
    password: string,
) => {
    if (!username || !email || !password) {
        throw new BadRequestError({
            message: 'Missing required field',
        });
    }
    const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) {
        throw new BadRequestError({
            message: 'Username is already taken',
            code: 400,
            logging: true,
        });
    }

    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
        throw new BadRequestError({
            message: 'Email is already taken',
            code: 400,
            logging: true,
        });
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
        throw new BadRequestError({
            message: 'No user found',
            code: 404,
            logging: true,
        });
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
