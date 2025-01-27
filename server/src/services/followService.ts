import { Types } from "mongoose";
import { FollowModel, IFollow } from "../model/FollowModel";
import BadRequestError from "../errors/BadRequestError";

export const followUser = async (followerId: Types.ObjectId, followingId: Types.ObjectId) => {
    if (!followerId || !followingId ) {
        throw new BadRequestError({
            code: 400,
            message: "Missing arguments",
            logging: true,
        })
    }
    const follow = await FollowModel.create({
        follower: followerId,
        following: followingId,
    });

    return follow; 
};

export const unfollowUser = async (followerId: Types.ObjectId, followingId: Types.ObjectId) => {
    if (!followerId || !followingId ) {
        throw new BadRequestError({
            code: 400,
            message: "Missing arguments",
            logging: true,
        })
    }
    await FollowModel.deleteOne({ follower: followerId, following: followingId });
}

export const getFollowers = async (userId: Types.ObjectId): Promise<Types.ObjectId[]> => {
    if (!userId) {
        throw new BadRequestError({
            code: 400,
            message: 'Missing arguments',
            logging: true,
        });
    }

    const followers = await FollowModel.find({ following: userId })
        .populate<{ follower: { _id: Types.ObjectId } }>('follower', '_id');
    return followers.map((follower) => follower.follower._id);
};

export const getFollowing = async (userId: Types.ObjectId): Promise<Types.ObjectId[]> => {
    if (!userId) {
        throw new BadRequestError({
            code: 400,
            message: 'Missing arguments',
            logging: true,
        });
    }

    const following = await FollowModel.find({ follower: userId })
        .populate<{ following: { _id: Types.ObjectId } }>('following', '_id');
    return following.map((following) => following.following._id);
};
