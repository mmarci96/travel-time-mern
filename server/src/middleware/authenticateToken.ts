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
    let jwtPayload;
    try {
        jwtPayload = <any>jwt.verify(token, secret_key);
        res.locals.jwtPayload = jwtPayload;
        res.locals.userId = jwtPayload['userId'];
        next();
    } catch (error) {
        res.status(401).send();
        return;
    }
};
