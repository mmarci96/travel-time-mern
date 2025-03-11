import mongoose from 'mongoose';
import app from './app';
import { config } from './config';

const { MONGO_URI, PORT, HOST } = config;

const main = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        const db = MONGO_URI.split('/')[MONGO_URI.split('/').length - 1];
        console.log('Connected to mongo db: ' + db);

        app.listen(Number(PORT), HOST, () => {
            console.log(`Server is running on http://${HOST}:${PORT}`);
        });
    } catch (err) {
        console.error(err);
    }
};

main();
