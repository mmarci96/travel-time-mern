import { PostCreateDTO, PostUpdateDTO } from '../dto/post.dto';
import PostModel from '../model/PostModel';
import { Types } from 'mongoose';
import BadRequestError from '../errors/BadRequestError';

export const createPost = async (
    author_id: Types.ObjectId,
    authorName: string,
    postData: PostCreateDTO,
) => {
    const author_name = authorName;

    if (!postData) {
        throw new BadRequestError({
            code: 400,
            message: 'Failed to create post: No post data provided',
            logging: true,
        });
    }

    const post = new PostModel({
        author_id,
        author_name,
        ...postData,
    });

    return await post.save();
};

export const getAllPost = async () => {
    const posts = await PostModel.find();
    if (!posts || posts.length === 0) {
        throw new BadRequestError({
            code: 404,
            message: 'No posts were found',
            logging: true,
        });
    }
    return posts;
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

    return post;
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

    return posts;
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

    const post = await PostModel.findOne({ _id: post_id, author_id });

    if (!post) {
        throw new BadRequestError({
            code: 403,
            message: 'No permission to delete this post',
            logging: true,
        });
    }

    await PostModel.findByIdAndDelete(post_id);

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
    if (!author_id) {
        throw new BadRequestError({
            code: 403,
            message: 'No permission to update this post!',
            logging: true,
        });
    }

    const existingPost = await PostModel.findOne({ _id: post_id, author_id });
    if (!existingPost) {
        throw new BadRequestError({
            code: 404,
            message: 'Post not found',
            logging: true,
        });
    }

    const updatedPost = await PostModel.findByIdAndUpdate(
        post_id,
        {
            ...updateData,
            updated_at: new Date(),
        },
        { new: true },
    );
    if (!updatedPost) {
        throw new BadRequestError({
            code: 400,
            message: 'Failed to update post',
            logging: true,
        });
    }

    return updatedPost;
};

const parseFilterOptions = (options: {
    page?: string;
    limit?: string;
    search?: string;
    sort?: string;
    asc?: string;
}) => {
    const {
        page = '1',
        limit = '5',
        search = '',
        sort = 'created_at',
        asc = 'true',
    } = options;

    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    const parsedAsc = asc === 'true';

    if (isNaN(parsedPage) || parsedPage < 1) {
        throw new BadRequestError({
            code: 400,
            message: 'Invalid page number. Must be a positive integer.',
        });
    }

    if (isNaN(parsedLimit) || parsedLimit < 1) {
        throw new BadRequestError({
            code: 400,
            message: 'Invalid limit. Must be a positive integer.',
        });
    }

    return { page: parsedPage, limit: parsedLimit, search, sort, asc: parsedAsc };
};

export const filterPosts = async (
  options: { page?: string; limit?: string; search?: string; sort?: string; asc?: string }
) => {
    const { page, limit, search, sort, asc } = parseFilterOptions(options);

    const posts = await PostModel.find({
        $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { author_name: { $regex: search, $options: 'i' } },
        ],
    })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ [sort]: asc ? 1 : -1 });

    if (!posts || posts.length === 0) {
        throw new BadRequestError({
            code: 404,
            message: 'No posts found!',
            logging: true,
        });
    }

    return posts;
};
