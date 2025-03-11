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

const app = express();

const allowedOrigins = ['http://localhost:5173', 'http://localhost:80'];

const options: cors.CorsOptions = {
    origin: allowedOrigins,
};

app.use(cors(options));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/follows', followRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/notifications', notificationRoutes);
app.get('/health', (req, res) => {
    res.status(200).send({ message: 'ok' });
});

app.use(errorHandler);

export default app;
