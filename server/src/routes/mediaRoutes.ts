import express, { Request, Response, NextFunction } from 'express';
import { getStorage } from '../services/mediaService';

const router = express.Router();

const imageUpload = getStorage();

// I guess the argument we send in will handle the upload?
router.post(
    '/img',
    imageUpload.array('image-file'),
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        if (!req.files) {
            return res.status(400).send('No file uploaded.');
        }
        try {
            // Type assertion for req.files
            const files = req.files as Express.Multer.File[];

            // Extract filenames
            const fileNames = files.map((file) => ({
                name: file.filename,
                path: file.path,
            }));

            // Send response with file names
            res.status(201).json({
                status: 'uploaded',
                name: fileNames[0].name,
                path: fileNames[0].path,
            });
        } catch (err) {
            next(err);
        }
    },
);

export default router;
