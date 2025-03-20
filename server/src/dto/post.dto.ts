import { Date, Types } from 'mongoose';

export interface PostCreateDTO {
    title: string;
    description?: string;
    location_name: string;
    image_url: string;
}

export interface PostRequestDTO {
    id: Types.ObjectId;
    author_id: Types.ObjectId;
    author_name?: string;
    title: string;
    description?: string;
    location_id: Types.ObjectId;
    location_name?: string;
    image_url: string;
    likes?: Types.ObjectId[];
    created_at: Date;
}

export interface PostUpdateDTO {
    title?: string;
    description?: string;
    location_name: string;
    image_url?: string;
}
