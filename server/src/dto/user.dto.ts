import { Date, Types } from 'mongoose';

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
    id: Types.ObjectId;
    username: string;
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
    bio?: string;
    location?: string;
    created_at: Date;
}

export interface UserDetailsDTO {
    id: Types.ObjectId;
    username: string;
    first_name?: string;
    last_name?: string;
    birthdate?: Date;
    bio?: string;
    location?: string;
    interests?: [];
    visiting_list?: [];
    gender?: string;
    social_media_links?: object;
    languages_spoken?: [];
    avatar_url: string;
    created_at: Date;
}

