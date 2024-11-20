import express, { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import {
    createPost,
    getAllPost,
    getPostById,
    getPostByAuthorId,
    deletePost,
    updatePost,
} from '../services/postService'; // Assuming a postService.ts file

const router = express.Router();

// Create a new post
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { author_id, image_url, title, description, location } = req.body;
        const newPost = await createPost(
            author_id,
            image_url,
            title,
            description,
            location,
        );
        res.status(201).json(newPost);
    } catch (error) {
        next(error);
    }
});

// Get all posts
router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await getAllPost();
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
});

// Get a post by ID
router.get(
    '/:postId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { postId } = req.params;
            const post = await getPostById(new Types.ObjectId(postId));
            res.status(200).json(post);
        } catch (error) {
            next(error);
        }
    },
);

// Get posts by author ID
router.get(
    '/by-author/:authorId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { authorId } = req.params;
            const posts = await getPostByAuthorId(new Types.ObjectId(authorId));
            res.status(200).json(posts);
        } catch (error) {
            next(error);
        }
    },
);

// Update a post
router.put(
    '/:postId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { postId } = req.params;
            const { author_id, updateData } = req.body;
            const updatedPost = await updatePost(
                new Types.ObjectId(postId),
                author_id,
                updateData,
            );
            res.status(200).json(updatedPost);
        } catch (error) {
            next(error);
        }
    },
);

// Delete a post
router.delete(
    '/:postId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { postId, author_id } = req.body;
            await deletePost(postId, author_id);
            res.status(200).json({ message: 'Post deleted successfully' });
        } catch (error) {
            next(error);
        }
    },
);

export default router;
