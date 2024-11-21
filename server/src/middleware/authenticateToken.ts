import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret_key = process.env.JWT_SECRET_KEY || '';

export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const authHeader = req.headers['authorization'];
    const token: string = (authHeader && authHeader.split(' ')[1]) || '';
    if (token === '') {
        res.status(401).send();
        return;
    }

    let jwtPayload;
    try {
        jwtPayload = jwt.verify(token, secret_key) as any;
        req.username = jwtPayload['username'];
        req.userId = jwtPayload['userId'];
        req.userRole = jwtPayload['role'];
        next();
    } catch (error) {
        res.status(401).send();
        return;
    }
};
