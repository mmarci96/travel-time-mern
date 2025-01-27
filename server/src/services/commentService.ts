import { CommentModel, IComment } from '../model/CommentModel';
import { UserModel } from '../model/UserModel';
import { Types } from 'mongoose';
import BadRequestError from '../errors/BadRequestError';
import { CommentResponseDTO } from '../dto/comment.dto';
import { createNotification } from './notificationService';
import { PostModel } from '../model/PostModel';
import { NotificationType, TargetType } from '../model/NotificationModel';

const createCommentDto = async (
    comment: IComment,
): Promise<CommentResponseDTO> => {
    let authorName: string | undefined;

    if (
        typeof comment.author_id === 'object' &&
        'username' in comment.author_id
    ) {
        authorName = comment.author_id.username;
    } else {
        const author = await UserModel.findById(comment.author_id);
        authorName = author?.username;
        if (!authorName) {
            throw new BadRequestError({
                code: 404,
                message: `Missing authorname on comment: ${comment._id}`,
            });
        }
    }
    return {
        id: comment._id,
        author_id: comment.author_id,
        author_name: authorName,
        post_id: comment.post_id,
        content: comment.content,
        created_at: comment.created_at,
    };
};

export const createComment = async (
    author_id: Types.ObjectId,
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
    const post = await PostModel.findById(post_id);
    if (!post) {
        throw new BadRequestError({
            code: 404,
            message: 'Cannot find target post',
            logging: true,
        });
    }

    const user = await UserModel.findById(author_id);
    if (!user) {
        throw new BadRequestError({
            code: 404,
            message: 'Cannot find user...',
            logging: true,
        });
    }

    const message = `${user.username}, commented on your post: ${post.title}. ${result.content}`;
    await createNotification(
        post.author_id,
        author_id,
        NotificationType.COMMENT,
        comment._id,
        TargetType.COMMENT,
        message,
    );

    return await createCommentDto(result);
};

export const getCommentsByPostId = async (post_id: Types.ObjectId) => {
    if (!post_id) {
        throw new BadRequestError({
            code: 400,
            message: 'Failed to get comments. No post id provided',
            logging: true,
        });
    }

    const comments = await CommentModel.find({ post_id }).populate(
        'author_id',
        'username',
    );

    if (!comments || comments.length === 0) {
        throw new BadRequestError({
            code: 404,
            message: 'No comments found',
            logging: true,
        });
    }

    const results = Promise.all(
        comments.map(async (comment) => {
            const user = await UserModel.findById(comment.author_id);
            const username = user?.username;
            return {
                id: comment._id,
                author_id: comment.author_id,
                author_name: username,
                post_id: comment.post_id,
                content: comment.content,
                created_at: comment.created_at,
            };
        }),
    );

    return results;
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
    author_id: Types.ObjectId,
    content: string,
) => {
    if (!comment_id || !author_id || !content) {
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
