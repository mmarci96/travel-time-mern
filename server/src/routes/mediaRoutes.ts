import express, { Request, Response, NextFunction } from 'express';
import {
    getStorage,
    saveImage,
    mapUploadedFiles,
} from '../services/mediaService';

const router = express.Router();
const imageUpload = getStorage();

router.post(
    '/img',
    imageUpload.array('image-file'),
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const files = mapUploadedFiles(req.files);

            const image = await saveImage(files[0].name, files[0].path);

            res.status(201).json(image);
        } catch (err) {
            next(err);
        }
    },
);

router.get('/');

export default router;
