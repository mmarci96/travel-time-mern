import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import ensureDbConnection from './middlewares/ensureDbConnection'; // Import the middleware

dotenv.config();

const app = express();
const port = 8080;

app.use(express.json());
app.use(ensureDbConnection);

// Routes
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Node Express!');
});

app.get('/data', async (req: Request, res: Response) => {
    try {
        const collection = req.db?.collection("FunCollection"); // Using the database instance
        const data = await collection?.find({}).toArray();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send("Failed to fetch data.");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
