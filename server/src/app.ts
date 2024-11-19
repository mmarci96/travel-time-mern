import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import errorHandler from './middleware/errorHandler';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
dotenv.config();

const app = express();
const { MONGO_URL, PORT = 8080 } = process.env;
console.log(MONGO_URL);

if (!MONGO_URL) {
    console.error('Missing MONGO_URL environment variable');
    process.exit(1);
}

app.use(express.json());
app.use(errorHandler);

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

const main = async () => {
    const url = MONGO_URL;
    await mongoose.connect(url);

    app.listen(PORT, () => {
        console.log('App is listening on ', PORT);
    });
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
