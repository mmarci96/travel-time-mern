import { PostCreateDTO, PostUpdateDTO } from '../dto/post.dto';
import PostModel from '../model/PostModel';
import { Types } from 'mongoose';

export const createPost = async (
    author_id: Types.ObjectId,
    authorName: string,
    postData: PostCreateDTO,
) => {
    const author_name = authorName;

    if (!postData)
        throw {
            status: 400,
            message: `Failed to create post: No post data provided`,
        };

    const post = new PostModel({
        author_id,
        author_name,
        ...postData,
    });

    const savedPost = await post.save();
    return savedPost;
};

export const getAllPost = async () => {
    const posts = await PostModel.find();
    if (!posts || posts.length === 0)
        throw { status: 404, message: 'No posts were found' };
    return posts;
};

export const getPostById = async (post_id: string) => {
    if (!post_id) throw { status: 400, message: 'No post id provided!' };

    const post = await PostModel.findById(new Types.ObjectId(post_id));

    if (!post)
        throw {
            status: 404,
            message: 'No post found with post id: ' + post_id,
        };

    return post;
};

export const getPostsByAuthorId = async (author_id: Types.ObjectId) => {
    if (!author_id) throw { status: 400, message: 'No author id provided!' };

    const posts = await PostModel.find({ author_id });

    if (!posts || posts.length === 0)
        throw {
            status: 404,
            message: 'No posts found for author id: ' + author_id,
        };

    return posts;
};

export const deletePost = async (
    post_id: Types.ObjectId,
    author_id: Types.ObjectId,
) => {
    if (!post_id) throw { status: 400, message: 'No post id provided!' };

    const post = await PostModel.findOne({ _id: post_id, author_id });

    if (!post)
        throw { status: 403, message: 'No permission to delete this post' };

    await PostModel.findByIdAndDelete(post_id);

    return { message: 'Post deleted successfully', status: 202 };
};

export const updatePost = async (
    post_id: Types.ObjectId,
    author_id: Types.ObjectId,
    updateData: Partial<PostUpdateDTO>,
) => {
    if (!post_id) throw { status: 400, message: 'No post id provided!' };
    if (!author_id)
        throw { status: 403, message: 'No permission to update this post!' };

    const existingPost = await PostModel.findOne({ _id: post_id, author_id });
    if (!existingPost) throw { status: 404, message: 'Post not found' };

    const updatedPost = await PostModel.findByIdAndUpdate(
        post_id,
        {
            ...updateData,
            updated_at: new Date(),
        },
        { new: true },
    );
    if (!updatedPost) throw { status: 400, message: 'Failed to update post' };

    return updatedPost;
};
