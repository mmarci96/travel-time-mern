import cors from 'cors';
import express from 'express';
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
import { config } from './config';
import path from 'path';

const app = express();

const allowedOrigins = ['http://localhost:5173', 'http://localhost:80'];

const options: cors.CorsOptions = {
    origin: allowedOrigins,
};

app.use(cors(options));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
const { STORAGE_TYPE, LOCAL_STORAGE_PATH } = config;
if (STORAGE_TYPE === 'local') {
    const staticPath = path.resolve(LOCAL_STORAGE_PATH);
    app.use('/api/uploads', express.static(staticPath));
    console.log(`Serving local files from ${staticPath}`);
}

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/follows', followRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/notifications', notificationRoutes);

app.use('/api/countries', countryRoutes);
app.get('/health', (req, res) => {
    res.status(200).send({ message: 'ok' });
});

app.use(errorHandler);

export default app;
