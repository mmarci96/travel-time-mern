import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
 
const MONGO_DB_CONNECTION = process.env.MONGO_DB_CONNECTION || "";

const client = new MongoClient(MONGO_DB_CONNECTION);

async function run() {
    try {
        await client.connect();
        console.log("Successfully connected to Atlas");

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);