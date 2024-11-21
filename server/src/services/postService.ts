import { PostCreateDTO, PostUpdateDTO  } from '../dto/post.dto';
import PostModel from '../model/PostModel';
import { Types } from 'mongoose';

export const createPost = async (
    authorId: string,
    authorName: string,
    postData: PostCreateDTO
) => {
    const author_id = new Types.ObjectId(authorId);
    const author_name = authorName

    if (!postData) throw new Error(`Failed to create post: ${postData}`)
    
    const post = new PostModel({
        author_id,
        author_name,
        ...postData
    });

    const savedPost = await post.save();
    return savedPost;
};

export const getAllPost = async () => {
    const posts = await PostModel.find();
    if(!posts) throw new Error("No post were found")
    return posts;
};

export const getPostById = async (post_id: string) => {
    if (!post_id) throw new Error('No post id provided!');

    const post = await PostModel.findById(new Types.ObjectId(post_id));

    if (!post) throw new Error('No post found with post id:' + post_id);
    
    return post;
};

export const getPostByAuthorId = async (author_id: Types.ObjectId) => {
    if (!author_id) throw new Error('No author id provided!');

    const posts = await PostModel.find(author_id);

    if (!posts) throw new Error('No post with author id:' + author_id);

    return posts;
};

export const deletePost = async (
    post_id: Types.ObjectId,
    author_id: Types.ObjectId,
) => {
    if (!post_id) throw new Error('No post id provided!');

    const post = await PostModel.findOne({ _id: post_id, author_id });

    if (!post)
        throw new Error(
            "Post not found or you don't have permission to delete it",
        );

    await PostModel.findByIdAndDelete(post_id);
    return { message: 'Post deleted successfully' };
};

export const updatePost = async (
    post_id: Types.ObjectId,
    author_id: Types.ObjectId,
    updateData: Partial<PostUpdateDTO>,
) => {
    if (!post_id) throw new Error('No post id provided!');

    const existingPost = await PostModel.findOne({ _id: post_id, author_id });

    if (!existingPost) {
        throw new Error(
            "Post not found or you don't have permission to update it",
        );
    }

    const updatedPost = await PostModel.findByIdAndUpdate(
        post_id,
        {
            ...updateData,
            updated_at: new Date(),
        },
        { new: true },
    );

    if (!updatedPost) throw new Error('Failed to update post');

    return updatedPost;
};
