import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 8080,
    HOST: process.env.HOST || '0.0.0.0',
    MONGO_URI: process.env.MONGO_URI as string,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
    JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY as string,
    AWS_REGION: process.env.AWS_REGION as string,
    AWS_ROLE_ARN: process.env.AWS_ROLE_ARN as string,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME as string,
    STORAGE_TYPE: process.env.STORAGE_TYPE as string,
    LOCAL_STORAGE_PATH: process.env.LOCAL_STORAGE_PATH as string,
    LOCAL_STORAGE_BASE_URL: process.env.LOCAL_STORAGE_BASE_URL as string,
};
