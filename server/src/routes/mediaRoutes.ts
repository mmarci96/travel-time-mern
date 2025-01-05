
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
            // Map the uploaded files (returns name and URL from S3)
            const files = await mapUploadedFiles(req.files);

            // Save the first file's metadata (using URL instead of path)
            const image = await saveImage(files[0].name, files[0].url);
            const response = {
                imageUrl: image.filepath,
                filename: image.filename
            }

            // Respond with the saved image metadata
            res.status(201).json(response);
        } catch (err) {
            next(err); // Pass errors to error-handling middleware
        }
    },
);

export default router;

