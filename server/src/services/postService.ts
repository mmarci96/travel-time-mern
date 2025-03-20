import { PostCreateDTO, PostUpdateDTO, PostRequestDTO } from '../dto/post.dto';
import { PostModel, IPost } from '../model/PostModel';
import { Types } from 'mongoose';
import BadRequestError from '../errors/BadRequestError';
import { UserModel } from '../model/UserModel';
import { FollowModel } from '../model/FollowModel';
import { LikeModel } from '../model/LikeModel';
import { parseFilterOptions } from './helperFunctions';
import { LocationModel } from '../model/LocationModel';

export const getPostsFromFollowing = async (
    userId: Types.ObjectId,
): Promise<any[]> => {
    const followings = await FollowModel.find({ follower: userId }).select(
        'following',
    );
    const followingIds = followings.map((follow) => follow.following);

    if (!followingIds.length) {
        return [];
    }

    const posts = await PostModel.find({
        author_id: { $in: followingIds },
    }).sort({ created_at: -1 });

    const result = await Promise.all(
        posts.map((post) => createPostResponse(post)),
    );

    return result;
};

const createPostResponse = async (post: IPost): Promise<PostRequestDTO> => {
    const user = await UserModel.findById(post.author_id);
    const username = user?.username;

    const likesOnPost = await LikeModel.find({ post: post._id })
        .select('user')
        .exec();

    const userIds = likesOnPost.map((like) => like.user);

    const location= await LocationModel.findById(post.location_id);
    const locationName=location?.city_name;

    return {
        id: post._id,
        author_id: post.author_id,
        author_name: username,
        title: post.title,
        description: post.description,
        location_id: post.location_id,
        location_name: locationName,
        image_url: post.image_url,
        likes: userIds,
        created_at: post.created_at,
    };
};

export const createPost = async (
    author_id: Types.ObjectId,
    postData: PostCreateDTO,
) => {
    if (!postData) {
        throw new BadRequestError({
            code: 400,
            message: 'Failed to create post: No post data provided',
            logging: true,
        });
    }

    const post = new PostModel({
        author_id,
        ...postData,
    });

    const saved = await post.save();
    return await createPostResponse(saved);
};

export const getPostById = async (post_id: string) => {
    if (!post_id) {
        throw new BadRequestError({
            code: 400,
            message: 'No post id provided!',
            logging: true,
        });
    }

    const post = await PostModel.findById(new Types.ObjectId(post_id));
    if (!post) {
        throw new BadRequestError({
            code: 404,
            message: `No post found with post id: ${post_id}`,
            logging: true,
        });
    }

    const result = await createPostResponse(post);

    return result;
};

export const getPostsByAuthorId = async (author_id: Types.ObjectId) => {
    if (!author_id) {
        throw new BadRequestError({
            code: 400,
            message: 'No author id provided!',
            logging: true,
        });
    }

    const posts = await PostModel.find({ author_id });

    if (!posts || posts.length === 0) {
        throw new BadRequestError({
            code: 404,
            message: `No posts found for author id: ${author_id}`,
            logging: true,
        });
    }

    const results = await Promise.all(
        posts.map(async (post) => {
            const likesOnPost = await LikeModel.find({ post: post._id }).select(
                'user',
            );
            const userIds = likesOnPost.map((like) => like.user);
            const user = await UserModel.findById(post.author_id);
            const username = user?.username;

            const location= await LocationModel.findById(post.location_id);
            const locationName=location?.city_name;

            return {
                id: post._id,
                author_id: post.author_id,
                author_name: username,
                title: post.title,
                description: post.description,
                location_id: post.location_id,
                location_name:locationName,
                image_url: post.image_url,
                likes: userIds,
                created_at: post.created_at,
            };
        }),
    );
    return results;
};

export const deletePost = async (
    post_id: Types.ObjectId,
    author_id: Types.ObjectId,
) => {
    if (!post_id) {
        throw new BadRequestError({
            code: 400,
            message: 'No post id provided!',
            logging: true,
        });
    }

    const deleteState = await PostModel.findByIdAndDelete({
        _id: post_id,
        author_id,
    });
    if (!deleteState) {
        throw new BadRequestError({
            code: 403,
            message: 'Unauthorized or post not found!',
        });
    }

    return { message: 'Post deleted successfully', status: 202 };
};

export const updatePost = async (
    post_id: Types.ObjectId,
    author_id: Types.ObjectId,
    updateData: Partial<PostUpdateDTO>,
) => {
    if (!post_id) {
        throw new BadRequestError({
            code: 400,
            message: 'No post id provided!',
            logging: true,
        });
    }

    const updatedPost = await PostModel.findOneAndUpdate(
        { _id: post_id, author_id },
        { ...updateData, updated_at: new Date() },
        { new: true },
    );

    if (!updatedPost) {
        throw new BadRequestError({
            code: 403, // Change to 403 if unauthorized, 400 if post doesn't exist
            message: 'Unauthorized or post not found!',
        });
    }

    return updatedPost;
};

export const filterPosts = async (options: {
    page?: string;
    limit?: string;
    search?: string;
    sort?: string;
    asc?: string;
}) => {
    const { page, limit, search, sort, asc } = parseFilterOptions(options);

    const sortOrder = asc ? 1 : -1;

    let sortCriteria: any = { [sort]: sortOrder };

    const posts = await PostModel.find({
        $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
        ],
    })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(sortCriteria)
        .collation({ locale: 'en', strength: 2 });

    if (!posts || posts.length === 0) {
        throw new BadRequestError({
            code: 404,
            message: 'No posts found!',
            logging: true,
        });
    }

    const results = await Promise.all(
        posts.map(async (post) => {
            const likesOnPost = await LikeModel.find({ post: post._id }).select(
                'user',
            );
            const userIds = likesOnPost.map((like) => like.user);
            const user = await UserModel.findById(post.author_id);
            const username = user?.username;

            const location= await LocationModel.findById(post.location_id);
            const locationName=location?.city_name;

            return {
                id: post._id,
                author_id: post.author_id,
                author_name: username,
                title: post.title,
                description: post.description,
                location_id: post.location_id,
                location_name: locationName,
                image_url: post.image_url,
                likes: userIds,
                created_at: post.created_at,
            };
        }),
    );
    return results;
};
