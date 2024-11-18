import express from 'express';
import { MongoClient } from "mongodb";

const connectionUrl: string = process.env.MONGO_DB_CONNECTION
const client = new MongoClient(connectionUrl);

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript Node Express!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
