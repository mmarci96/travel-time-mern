import CommentModel from '../model/CommentModel';
import { Types } from 'mongoose';
import BadRequestError from '../errors/BadRequestError';

export const createComment = async (
    author_id: Types.ObjectId,
    author_name: string,
    post_id: Types.ObjectId,
    content: string,
) => {
    if (!author_id || !post_id || !content) {
        throw new BadRequestError({
            code: 400,
            message: 'Failed to create comment: Missing dta',
            logging: true,
        });
    }
    const comment = new CommentModel({
        author_id,
        author_name,
        post_id,
        content,
    });

    if (!comment) {
        throw new BadRequestError({
            code: 400,
            message: 'Failed to create comment',
            logging: true,
        });
    }

    const result = await comment.save();

    if (!result) {
        throw new BadRequestError({
            code: 400,
            message: 'Failed to save comment',
            logging: true,
        });
    }

    return result;
};

export const getCommentsByPostId = async (post_id: Types.ObjectId) => {
    if (!post_id) {
        throw new BadRequestError({
            code: 400,
            message: 'Failed to get comments. No post id provided',
            logging: true,
        });
    }
    const comments = await CommentModel.find(post_id);
    if (!comments) {
        throw new BadRequestError({
            code: 404,
            message: 'No comments found',
            logging: true,
        });
    }

    return comments;
};

export const deleteComment = async (
    comment_id: Types.ObjectId,
    author_id: Types.ObjectId,
) => {
    if (!author_id || !comment_id) {
        throw new BadRequestError({
            code: 400,
            message: 'Failed to delete comment: Missing data',
            logging: true,
        });
    }

    const comment = await CommentModel.findOne({ _id: comment_id, author_id });

    if (!comment)
        throw new BadRequestError({
            code: 403,
            message: 'No permission to delete this comment',
            logging: true,
        });

    const result = await CommentModel.findByIdAndDelete(comment_id);
    if (!result) {
        throw new BadRequestError({
            code: 404,
            message: 'Comment not found',
            logging: true,
        });
    }

    return { message: 'Comment deleted successfully' };
};

export const updateComment = async (
    comment_id: Types.ObjectId,
    author_name : string,
    author_id: Types.ObjectId,
    content: string,
) => {
    if (!comment_id || !author_id || !author_name || !content) {
        throw new BadRequestError({
            code: 400,
            message: 'Failed to update comment: Missing data',
            logging: true,
        });
    }

    const existingComment = await CommentModel.findOne({
        _id: comment_id,
        author_id,
    });

    if (!existingComment) {
        throw new BadRequestError({
            code: 403,
            message: 'No permission to update this comment',
            logging: true,
        });
    }

    const updatedComment = await CommentModel.findByIdAndUpdate(
        comment_id,
        {
            author_name,
            content,
            updated_at: new Date(),
        },
        { new: true },
    );

    if (!updatedComment) {
        throw new BadRequestError({
            code: 404,
            message: 'Comment not found',
            logging: true,
        });
    }

    return updatedComment;
};
