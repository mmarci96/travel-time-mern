import express, { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import {
    createComment,
    getCommentsByPostId,
    updateComment,
    deleteComment,
} from '../services/commentService';

const router = express.Router();

router.post(
    '/',
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { author_id, post_id, content } = req.body;
            const comment = await createComment(author_id, post_id, content);
            res.status(201).send(comment);
        } catch (err: any) {
            next(err);
        }
    },
);

router.get(
    '/:post_id',
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { post_id } = req.params;
            const _id: Types.ObjectId = new Types.ObjectId(post_id);
            const comments = await getCommentsByPostId(_id);
            res.status(200).send(comments);
        } catch (err: any) {
            next(err);
        }
    },
);

router.put(
    '/',
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { content, author_id, comment_id } = req.body;
            const updatedComment = await updateComment(
                author_id,
                comment_id,
                content,
            );
            res.status(200).send(updatedComment);
        } catch (err: any) {
            next(err);
        }
    },
);

router.delete(
    '/',
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { comment_id, author_id } = req.body;
            await deleteComment(comment_id, author_id);
            res.status(200).send({ message: 'Comment deleted successfully' });
        } catch (err: any) {
            next(err);
        }
    },
);

export default router;
