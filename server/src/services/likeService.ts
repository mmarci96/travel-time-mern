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
