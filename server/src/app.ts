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
import errorHandler from './middleware/errorHandler';

dotenv.config();

const app = express();
const { MONGO_URI, PORT = 8080 } = process.env;

const allowedOrigins = ['http://localhost:5173', 'http://localhost:80'];

const options: cors.CorsOptions = {
    origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/follows', followRoutes)
app.get('/api/hello', (req, res) => {
    res.send('Hello world!');
});

app.use(errorHandler);

const main = async () => {
    const url = MONGO_URI;
    if (!url) {
        console.error('Missing MONGO_URL environment variable');
        process.exit(1);
    }
    await mongoose.connect(url);

    app.listen(PORT as number, '0.0.0.0', () => {
        console.log('App is listening on ', PORT);
    });
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
