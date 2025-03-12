import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/AuthRequest';
import { config } from '../config';

const secret_key = config.JWT_SECRET_KEY;

export const authenticateToken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    const authHeader = req.headers['authorization'];
    const token: string = (authHeader && authHeader.split(' ')[1]) || '';

    try {
        const jwtPayload = jwt.verify(token, secret_key) as any;
        req.username = jwtPayload['username'] || '';
        req.userId = jwtPayload['userId'];
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized', log: error });
    }
};
