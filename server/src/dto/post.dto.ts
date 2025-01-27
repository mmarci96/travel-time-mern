import { Date, Schema } from 'mongoose';

export interface PostCreateDTO {
    title: string;
    description?: string;
    location?: string;
    image_url: string;
}

export interface PostRequestDTO {
    id: Schema.Types.ObjectId;
    author_id:
        | Schema.Types.ObjectId
        | { _id: Schema.Types.ObjectId; username: string };
    author_name?: string;
    title: string;
    description?: string;
    location?: string;
    image_url: string;
    likes?: Schema.Types.ObjectId[]
    created_at: Date;
}

export interface PostUpdateDTO {
    title?: string;
    description?: string;
    location?: string;
    image_url?: string;
}
