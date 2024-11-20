import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import errorHandler from './middleware/errorHandler';
import authRoutes from './routes/authRoutes';
import mediaRoutes from './routes/mediaRoutes';
import userRoutes from './routes/userRoutes';
import commentRoutes from './routes/commentRoutes';
import postRoutes from './routes/postRoutes';
dotenv.config();

const app = express();
const { MONGO_URI, PORT = 8080 } = process.env;

// adding CORS, but no idea about port, I guess it's not good, add endpoints
//use roles
const allowedOrigins = ['http://localhost:5173'];

const options: cors.CorsOptions = {
    origin: allowedOrigins,
};

// trying to add middleware
app.use(cors(options));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

const main = async () => {
    const url = MONGO_URI;
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
