import dotenv from 'dotenv';
import multer from 'multer';
import { S3 } from 'aws-sdk';
import { ImageModel } from '../model/ImageModel';

dotenv.config();

const { AWS_BUCKET_NAME, AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

const s3 = new S3({
    region: AWS_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

export const getStorage = () => {
    const storage = multer.memoryStorage(); 

    return multer({ storage: storage });
};

const uploadFileToS3 = async (file: Express.Multer.File) => {
    const key = `${file.fieldname}_dateVal_${Date.now()}_${file.originalname}`;

    const params = {
        Bucket: AWS_BUCKET_NAME!, 
        Key: key, 
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    const uploadResult = await s3.upload(params).promise();

    return {
        filename: key,
        url: uploadResult.Location,
    };
};

export const mapUploadedFiles = async (
    files: unknown,
): Promise<{ name: string; url: string }[]> => {
    if (!Array.isArray(files)) {
        throw new Error('Invalid files: files should be an array.');
    }

    return Promise.all(
        (files as Express.Multer.File[]).map(async (file) => {
            const { filename, url } = await uploadFileToS3(file); 
            return { name: filename, url }; 
        }),
    );
};

export const saveImage = async (filename: string, url: string) => {
    if (!filename || !url) {
        throw new Error(
            'Something went wrong uploading the image; filename or URL missing',
        );
    }

    const image = new ImageModel({
        filename: filename,
        filepath: url, 
    });
    return await image.save();
};

