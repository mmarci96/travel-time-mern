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
    getPostsFromFollowing,
} from '../services/postService';
import { PostCreateDTO } from '../dto/post.dto';
import { authenticateToken } from '../middleware/authenticateToken';

const router = express.Router();

router.get(
    '/following',
    authenticateToken,
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const userId = req.userId as Types.ObjectId;
            const posts = await getPostsFromFollowing(userId);
            res.status(200).send({ posts: posts });
        } catch (err) {
            next(err);
        }
    },
);

router.post(
    '/',
    authenticateToken,
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const { image_url, title, description, location_id } = req.body;
            const authorId = req.userId as Types.ObjectId;

            const post: PostCreateDTO = {
                title,
                description,
                location_id,
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

router.get(
    '/by-author/:authorId',
    authenticateToken,
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const { authorId } = req.params;
            const posts = await getPostsByAuthorId(
                new Types.ObjectId(authorId),
            );
            res.status(200).json({ posts: posts });
        } catch (error) {
            next(error);
        }
    },
);

router.patch(
    '/:postId',
    authenticateToken,
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const { postId } = req.params;
            const author_id = req.userId as Types.ObjectId;
            const { title, description, location_id, image_url } = req.body;
            const update = {
                title,
                description,
                location_id,
                image_url,
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
