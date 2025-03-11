import express, { Request, Response, NextFunction } from 'express';
import {
    getStorage,
    saveImage,
    mapUploadedFiles,
} from '../services/mediaService';

const router = express.Router();
const imageUpload = getStorage();

router.post(
    '/img-upload',
    imageUpload.array('image-file'),
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const files = await mapUploadedFiles(req.files);

            const image = await saveImage(files[0].name, files[0].url);
            const response = {
                imageUrl: image.filepath,
                filename: image.filename,
            };

            res.status(201).json(response);
        } catch (err) {
            next(err);
        }
    },
);

export default router;
