import dotenv from 'dotenv';
import { ImageModel } from '../model/ImageModel';
import multer from 'multer';
dotenv.config();

const { UPLOAD_PATH } = process.env;

export const getStorage = () => {
    if (!UPLOAD_PATH) {
        throw new Error('dotenv not loaded');
    }
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, UPLOAD_PATH);
        },

        filename: function (req, file, cb) {
            cb(
                null,
                `${file.fieldname}_dateVal_${Date.now()}_${file.originalname}`,
            );
        },
    });

    return multer({ storage: storage });
};

export const mapUploadedFiles = (
    files: unknown,
): { name: string; path: string }[] => {
    if (!Array.isArray(files)) {
        throw new Error('Invalid files: files should be an array.');
    }

    return (files as Express.Multer.File[]).map((file) => ({
        name: file.filename,
        path: file.path,
    }));
};

export const saveImage = async (filename: string, filepath: string) => {
    if (!filename || !filepath) {
        throw new Error(
            'Something went wrong uploading the image; filename or filepath missing',
        );
    }

    const image = new ImageModel({
        filename: filename,
        filepath: filepath,
    });
    return await image.save();
};
