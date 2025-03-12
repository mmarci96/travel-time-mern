import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import mediaRoutes from './routes/mediaRoutes';
import userRoutes from './routes/userRoutes';
import commentRoutes from './routes/commentRoutes';
import postRoutes from './routes/postRoutes';
import followRoutes from './routes/followRoutes';
import likeRoutes from './routes/likeRoutes';
import notificationRoutes from './routes/notificationRoutes';
import errorHandler from './middleware/errorHandler';
import countryRoutes from './routes/countryRoutes';

dotenv.config();

const app = express();
const { MONGO_URI, PORT = 8080 } = process.env;

const allowedOrigins = ['http://localhost:5173', 'http://localhost:80'];

const options: cors.CorsOptions = {
    origin: allowedOrigins,
};

app.use(cors(options));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/follows', followRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/notifications', notificationRoutes);
app.get('/api/hello', (req, res) => {
    res.send('Hello world!');
});

app.use(errorHandler);

const main = async () => {};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});

export default app;
