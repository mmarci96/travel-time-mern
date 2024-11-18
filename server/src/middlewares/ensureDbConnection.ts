import { Request, Response, NextFunction } from 'express';
import { connectToDatabase } from '../connect';

let db: any; // Persist the database instance

const ensureDbConnection = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    if (!db) {
        try {
            db = await connectToDatabase();
        } catch (error) {
            res.status(500).send("Failed to connect to the database.");
            return;
        }
    }=
    req.db = db;
    next();
};

export default ensureDbConnection;
