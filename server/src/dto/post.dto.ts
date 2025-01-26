import { Date, Schema } from "mongoose";

export interface PostCreateDTO {
    title: string;
    description?: string;
    location?: string;
    image_url: string;
}

export interface PostRequestDTO {
    id: Schema.Types.ObjectId;
    author_name: string;
    title: string;
    description?: string;
    location?: string;
    image_url: string;
    created_at: Date;
}

export interface PostUpdateDTO {
    title?: string;
    description?: string;
    location?: string;
    image_url?: string;
}
