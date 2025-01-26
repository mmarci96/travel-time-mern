import express, { Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import {
    createComment,
    getCommentsByPostId,
    updateComment,
    deleteComment,
} from '../services/commentService';
import { authenticateToken } from '../middleware/authenticateToken';
import { AuthRequest } from '../types/AuthRequest';

const router = express.Router();

router.post(
    '/',
    authenticateToken,
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const author_id = req.userId as Types.ObjectId;
            const { post_id, content } = req.body;
            const comment = await createComment(author_id, post_id, content);
            res.status(201).send(comment);
        } catch (err) {
            next(err);
        }
    },
);

router.get(
    '/:post_id',
    authenticateToken,
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const { post_id } = req.params;
            const _id: Types.ObjectId = new Types.ObjectId(post_id);
            const comments = await getCommentsByPostId(_id);
            res.status(200).send(comments);
        } catch (err) {
            next(err);
        }
    },
);

router.put(
    '/',
    authenticateToken,
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const author_id = req.userId as Types.ObjectId;
            const { content, post_id } = req.body;
            const updatedComment = await updateComment(
                author_id,
                post_id,
                content,
            );
            res.status(200).send(updatedComment);
        } catch (err) {
            next(err);
        }
    },
);

router.delete(
    '/',
    authenticateToken,
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const author_id = req.userId as Types.ObjectId;
            const { comment_id } = req.body;
            const result = await deleteComment(comment_id, author_id);
            res.status(200).send(result);
        } catch (err) {
            next(err);
        }
    },
);

export default router;
