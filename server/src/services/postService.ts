import { PostCreateDTO, PostUpdateDTO, PostRequestDTO } from '../dto/post.dto';
import { PostModel, IPost } from '../model/PostModel';
import { Types } from 'mongoose';
import BadRequestError from '../errors/BadRequestError';
import { UserModel } from '../model/UserModel';

const createPostResponse = async (post: IPost): Promise<PostRequestDTO> => {
    let authorName: string | undefined;

    if (typeof post.author_id === 'object' && 'username' in post.author_id) {
        authorName = post.author_id.username;
    } else {
        const author = await UserModel.findById(post.author_id);
        authorName = author?.username;
        if (!authorName) {
            throw new BadRequestError({
                code: 404,
                message: `Missing authorname on post: ${post._id}`,
            });
        }
    }

    return {
        id: post._id,
        author_id: post.author_id,
        author_name: authorName,
        title: post.title,
        description: post.description,
        location: post.location,
        image_url: post.image_url,
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

    const results = posts.map((post) => ({
        id: post._id,
        author_id: post.author_id,
        author_name:
            typeof post.author_id === 'object' && 'username' in post.author_id
                ? post.author_id.username
                : undefined,
        title: post.title,
        description: post.description,
        location: post.location,
        image_url: post.image_url,
        created_at: post.created_at,
    }));

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
        limit = '25',
        search = '',
        sort = 'created_at',
        asc = 'false',
    } = options;

    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    const parsedAsc = asc === 'false';

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

    return {
        page: parsedPage,
        limit: parsedLimit,
        search,
        sort,
        asc: parsedAsc,
    };
};

export const filterPosts = async (options: {
    page?: string;
    limit?: string;
    search?: string;
    sort?: string;
    asc?: string;
}) => {
    const { page, limit, search, sort, asc } = parseFilterOptions(options);

    const posts = await PostModel.find({
        $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
        ],
    })
        .populate('author_id', 'username')
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

    const results = posts.map((post) => ({
        id: post._id,
        author_id: post.author_id,
        author_name:
            typeof post.author_id === 'object' && 'username' in post.author_id
                ? post.author_id.username
                : undefined,
        title: post.title,
        description: post.description,
        location: post.location,
        image_url: post.image_url,
        created_at: post.created_at,
    }));

    return results;
};
