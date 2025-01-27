import { Types } from 'mongoose';
import { LikeModel } from '../model/LikeModel';
import BadRequestError from '../errors/BadRequestError';
import { createNotification } from './notificationService';
import { UserModel } from '../model/UserModel';
import { PostModel } from '../model/PostModel';
import { NotificationType, TargetType } from '../model/NotificationModel';

export const likePost = async (
    userId: Types.ObjectId,
    postId: Types.ObjectId,
) => {
    if (!userId || !postId) {
        throw new BadRequestError({
            code: 400,
            message: 'Missing arguments',
            logging: true,
        });
    }
    const like = new LikeModel({
        user: userId,
        post: postId,
    });

    const likeCreated = await like.save();

    const liker = await UserModel.findById(userId);
    const post = await PostModel.findById(postId);
    if (!post) {
        throw new BadRequestError({
            code: 400,
            message: 'No post found!',
            logging: true,
        });
    }
    const message = `${liker?.username} liked your post! Check it out and see what they found interesting.`;    await createNotification(
        post.author_id,
        userId,
        NotificationType.LIKE,
        postId,
        TargetType.POST,
        message,
    );

    return likeCreated;
};

export const unlikePost = async (
    userId: Types.ObjectId,
    postId: Types.ObjectId,
) => {
    await LikeModel.deleteOne({ user: userId, post: postId });
};

export const getPostLikes = async (postId: Types.ObjectId) => {
    return await LikeModel.find({ post: postId }).populate('user', 'username');
};

export const getLikedPosts = async (userId: string) => {
    return await LikeModel.find({ user: userId }).populate('post', 'title');
};
