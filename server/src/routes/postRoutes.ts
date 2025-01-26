import express, { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/AuthRequest';
import { Types } from 'mongoose';
import {
    createPost,
    getPostById,
    getPostsByAuthorId,
    deletePost,
    updatePost,
    filterPosts,
} from '../services/postService';
import { PostCreateDTO } from '../dto/post.dto';
import { authenticateToken } from '../middleware/authenticateToken';

const router = express.Router();

router.post(
    '/',
    authenticateToken,
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const { image_url, title, description, location } = req.body;
            const authorId = req.userId as Types.ObjectId;

            const post: PostCreateDTO = {
                title,
                description,
                location,
                image_url,
            };

            const newPost = await createPost(authorId, post);
            res.status(201).json(newPost);
        } catch (error) {
            next(error);
        }
    },
);

router.get(
    '/',
    authenticateToken,
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const posts = await filterPosts(req.query);
            res.status(200).json({ posts });
        } catch (err) {
            next(err);
        }
    },
);

router.get(
    '/:postId',
    authenticateToken,
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const { postId } = req.params;
            const post = await getPostById(postId);
            res.status(200).json(post);
        } catch (error) {
            next(error);
        }
    },
);

// Get posts by author ID
router.get(
    '/by-author/:authorId',
    authenticateToken,
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const { authorId } = req.params;
            const posts = await getPostsByAuthorId(
                new Types.ObjectId(authorId),
            );
            res.status(200).json(posts);
        } catch (error) {
            next(error);
        }
    },
);

// Update a post
router.put(
    '/:postId',
    authenticateToken,
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const { postId } = req.params;
            const author_id = req.userId as Types.ObjectId;
            const author_name = req.username;
            const { title, description, location, image_url } = req.body;
            const update = {
                title,
                description,
                location,
                image_url,
                author_name,
            };
            const updatedPost = await updatePost(
                new Types.ObjectId(postId),
                author_id,
                update,
            );
            res.status(200).json(updatedPost);
        } catch (error) {
            next(error);
        }
    },
);

router.delete(
    '/:postId',
    authenticateToken,
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const { postId } = req.params;
            const author_id = req.userId as Types.ObjectId;
            await deletePost(new Types.ObjectId(postId), author_id);
            res.status(200).json({ message: 'Post deleted successfully' });
        } catch (error) {
            next(error);
        }
    },
);

export default router;
