import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGO_DB_CONNECTION = process.env.MONGO_DB_CONNECTION || "";
const client = new MongoClient(MONGO_DB_CONNECTION);

let isConnected = false;

export const connectToDatabase = async () => {
    if (!isConnected) {j
        try {
            await client.connect();
            console.log("Successfully connected to MongoDB Atlas");
            isConnected = true; // Update the flag after successful connection
        } catch (err) {
            console.error("Database connection failed", err.stack);
            throw err;
        }
    }
    return client.db(); // Return the database instance for further use
};

export default client; // Optionally export the raw client
