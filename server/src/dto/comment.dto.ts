import { Date, Types } from 'mongoose';

export interface CommentResponseDTO {
    id: Types.ObjectId;
    author_id:
        | Types.ObjectId
        | { _id: Types.ObjectId; username: string };
    author_name: string;
    post_id: Types.ObjectId;
    content: string;
    created_at: Date;
}
