import CommentModel from '../model/CommentModel';
import { Types } from 'mongoose';

export const createComment = async (
    author_id: Types.ObjectId,
    post_id: Types.ObjectId,
    content: string,
) => {
    if (!author_id || !post_id || !content) {
        throw new Error('Missing fields failed to comment');
    }
    const comment = new CommentModel({
        author_id,
        post_id,
        content,
    });

    const result = await comment.save();
    return result;
};

export const getCommentsByPostId = async (post_id: Types.ObjectId) => {
    if (!post_id) throw new Error('Empty request, no comment...');

    const comments = await CommentModel.find(post_id);
    if (!comments) return [];

    return comments;
};

export const deleteComment = async (
    comment_id: Types.ObjectId,
    author_id: Types.ObjectId,
) => {
    if (!author_id || !comment_id) {
        throw new Error('Empty request, no comment...');
    }

    const comment = await CommentModel.findOne({ _id: comment_id, author_id });

    if (!comment)
        throw new Error(
            "Post not found or you don't have permission to delete it",
        );

    const result = await CommentModel.findByIdAndDelete(comment_id);
    if (!result) {
        throw new Error('Failed to delete comment');
    }

    return { message: 'Comment deleted successfully' };
};

export const updateComment = async (
    comment_id: Types.ObjectId,
    author_id: Types.ObjectId,
    content: string,
) => {
    if (!comment_id || !author_id || !content) {
        throw new Error('Missing required fields for update');
    }

    const existingComment = await CommentModel.findOne({
        _id: comment_id,
        author_id,
    });

    if (!existingComment) {
        throw new Error(
            "Comment not found or you don't have permission to update it",
        );
    }

    const updatedComment = await CommentModel.findByIdAndUpdate(
        comment_id,
        {
            content,
            updated_at: new Date(),
        },
        { new: true },
    );

    if (!updatedComment) {
        throw new Error('Failed to update comment');
    }

    return updatedComment;
};
