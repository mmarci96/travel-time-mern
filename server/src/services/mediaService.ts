import fs from 'fs/promises';
import path from 'path';
import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { STSClient, AssumeRoleCommand } from '@aws-sdk/client-sts';
import { ImageModel } from '../model/ImageModel';
import { config } from '../config';
import { Types } from 'mongoose';

const {
    STORAGE_TYPE,
    LOCAL_STORAGE_PATH,
    AWS_BUCKET_NAME,
    AWS_REGION,
    AWS_ROLE_ARN,
    HOST,
    PORT,
} = config;

const stsClient = new STSClient({ region: AWS_REGION });

const uploadToLocal = async (file: Express.Multer.File) => {
    try {
        const randomId = new Types.UUID();
        const filename = `${randomId}_${file.originalname}`;
        const uploadPath = path.join(LOCAL_STORAGE_PATH, filename);

        await fs.mkdir(LOCAL_STORAGE_PATH, { recursive: true });

        await fs.writeFile(uploadPath, file.buffer);

        const LOCAL_STORAGE_BASE_URL = `http://${HOST}:${PORT}/uploads`;
        return {
            filename,
            url: `${LOCAL_STORAGE_BASE_URL}/${filename}`,
        };
    } catch (error) {
        console.error('Local file upload failed:', error);
        throw error;
    }
};

const assumeRole = async () => {
    try {
        const params = {
            RoleArn: AWS_ROLE_ARN!,
            RoleSessionName: 'S3UploadSession',
        };
        console.log(AWS_ROLE_ARN);

        const command = new AssumeRoleCommand(params);
        const response = await stsClient.send(command);

        if (!response.Credentials) {
            throw new Error(
                'Failed to assume IAM role. No credentials returned.',
            );
        }

        const { AccessKeyId, SecretAccessKey, SessionToken } =
            response.Credentials;

        return {
            accessKeyId: AccessKeyId!,
            secretAccessKey: SecretAccessKey!,
            sessionToken: SessionToken!,
        };
    } catch (error) {
        console.error('Error assuming IAM role:', error);
        throw error;
    }
};

const getS3Client = async () => {
    const credentials = await assumeRole();

    return new S3Client({
        region: AWS_REGION,
        credentials,
    });
};

export const getStorage = () =>
    multer({
        storage: multer.memoryStorage(),
        limits: { fileSize: 10 * 1024 * 1024 },
    });

const uploadFileToS3 = async (file: Express.Multer.File) => {
    try {
        const key = `${file.fieldname}_dateVal_${Date.now()}_${file.originalname}`;
        const s3Client = await getS3Client();

        const params = {
            Bucket: AWS_BUCKET_NAME!,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        await s3Client.send(new PutObjectCommand(params));

        return {
            filename: key,
            url: `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`,
        };
    } catch (error) {
        console.error('Error uploading file to S3:', error);
        throw error;
    }
};

export const mapUploadedFiles = async (
    files: unknown,
): Promise<{ name: string; url: string }[]> => {
    if (!Array.isArray(files)) {
        throw new Error('Invalid files: files should be an array.');
    }

    if (STORAGE_TYPE === 's3') {
        return Promise.all(
            (files as Express.Multer.File[]).map(async (file) => {
                const { filename, url } = await uploadFileToS3(file);
                return { name: filename, url };
            }),
        );
    }

    return Promise.all(
        (files as Express.Multer.File[]).map(async (file) => {
            const { filename, url } = await uploadToLocal(file);
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
