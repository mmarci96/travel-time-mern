import { Types } from "mongoose";
import { LikeModel } from "../model/LikeModel";
import BadRequestError from "../errors/BadRequestError";


export const likePost = async (
    userId: Types.ObjectId, 
    postId: Types.ObjectId 
) => {
    if(!userId || !postId ){
        throw new BadRequestError({
            code: 400,
            message: "Missing arguments",
            logging: true,
        })
    }
    const like = new LikeModel({
        user: userId,
        post: postId,
    })

    const likeCreated = await like.save()
    return likeCreated;
}

export const unlikePost = async (userId: Types.ObjectId, postId: Types.ObjectId) => {
    await LikeModel.deleteOne({ user: userId, post: postId });
};

export const getPostLikes = async (postId: Types.ObjectId) => {
    return await LikeModel.find({ post: postId }).populate('user', 'username');
};

export const getLikedPosts = async (userId: string) => {
    return await LikeModel.find({ user: userId }).populate('post', 'title');
};

