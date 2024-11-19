import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import bodyParser from 'body-parser';
import errorHandler from './middleware/errorHandler';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import mediaRoutes from './routes/mediaRoutes';
dotenv.config();

const app = express();
const { MONGO_URL, PORT = 8080 } = process.env;

app.use(express.json());
app.use(errorHandler);

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);

const main = async () => {
    const url = MONGO_URL;
    if (!url) {
        console.error('Missing MONGO_URL environment variable');
        process.exit(1);
    }
    await mongoose.connect(url);

    app.listen(PORT, () => {
        console.log('App is listening on ', PORT);
    });
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
