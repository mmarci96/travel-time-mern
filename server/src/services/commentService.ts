import { CommentModel, IComment } from '../model/CommentModel';
import { UserModel } from '../model/UserModel';
import { Types } from 'mongoose';
import BadRequestError from '../errors/BadRequestError';
import { CommentResponseDTO } from '../dto/comment.dto';
import { createNotification } from './notificationService';
import { PostModel } from '../model/PostModel';
import { NotificationType, TargetType } from '../model/NotificationModel';

export const createComment = async (
    author_id: Types.ObjectId,
    post_id: Types.ObjectId,
    content: string,
) => {
    if (!author_id || !post_id || !content) {
        throwMissingArgsError('author_id or post_id or content');
    }
    const post = await findByIdOrThrow(PostModel, post_id, 'Post');
    const user = await findByIdOrThrow(UserModel, author_id, 'User');

    const comment = new CommentModel({ author_id, post_id, content });
    const savedComment = await comment.save();
    const message = `You have a new comment from ${user.username}: "${savedComment.content}"! Check it out on your post.`;

    await createNotification(
        post.author_id,
        author_id,
        NotificationType.COMMENT,
        post_id,
        TargetType.COMMENT,
        message,
    );

    return await createCommentDto(savedComment);
};

export const getCommentsByPostId = async (post_id: Types.ObjectId) => {
    if (!post_id) {
        throwMissingArgsError('Post id');
    }

    const comments = await CommentModel.find({ post_id });

    if (!comments || comments.length === 0) {
        throw new BadRequestError({
            code: 404,
            message: 'No comments found',
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
        throwMissingArgsError('author id or comment id');
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
        throwMissingArgsError('commentid, or author id or content');
    }

    const comment = await CommentModel.findOne({ _id: comment_id, author_id });
    if (!comment) {
        throw new BadRequestError({
            code: 403,
            message: 'No permission to update this comment',
            logging: true,
        });
    }

    const updatedComment = await CommentModel.findByIdAndUpdate(
        comment_id,
        { content, updated_at: new Date() },
        { new: true },
    );

    if (!updatedComment) {
        throw new BadRequestError({
            code: 404,
            message: 'Comment not found',
            logging: true,
        });
    }

    return createCommentDto(updatedComment);
};

const findByIdOrThrow = async (
    Model: any,
    id: Types.ObjectId,
    resourceName: string,
) => {
    const resource = await Model.findById(id);
    if (!resource) {
        throw new BadRequestError({
            code: 404,
            message: `${resourceName} not found`,
            logging: true,
        });
    }
    return resource;
};

const throwMissingArgsError = (props: any) => {
    throw new BadRequestError({
        code: 400,
        message: 'Failed to create comment: Missing' + props,
        logging: true,
    });
};

const createCommentDto = async (
    comment: IComment,
): Promise<CommentResponseDTO> => {
    const author = await findByIdOrThrow(
        UserModel,
        comment.author_id,
        'Author',
    );

    return {
        id: comment._id,
        author_id: comment.author_id,
        author_name: author.username,
        post_id: comment.post_id,
        content: comment.content,
        created_at: comment.created_at,
    };
};
