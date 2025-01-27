import { Date, Schema, Types } from 'mongoose';

export interface UserDTO {
    id: string;
    username: string;
    email: string;
}

export const toUserDTO = (user: any): UserDTO => ({
    id: user._id.toString(),
    username: user.username,
    email: user.email,
});

export interface UserInfoDTO {
    id: Schema.Types.ObjectId;
    username: string;
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
    bio?: string;
    location?: string;
    created_at: Date;
}

export interface UserDetailsDTO {
    id: Schema.Types.ObjectId;
    username: string;
    first_name?: string;
    last_name?: string;
    birthdate?: Date | null;
    bio?: string;
    location?: string;
    interests?: string[];
    visiting_list?: string[];
    gender?: string;
    social_media_links?: object;
    languages_spoken?: string[];
    avatar_url?: string;
    following?: Types.ObjectId[];
    followers?: Types.ObjectId[];
    created_at: Date;
}
