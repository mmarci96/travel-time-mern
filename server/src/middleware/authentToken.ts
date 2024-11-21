// import { JwtPayload } from "jsonwebtoken";
// import { Types } from "mongoose";

// interface CustomJwtPayload extends JwtPayload {
//     userId: string;
// }

// export const verifyToken = (token: string, id: Types.ObjectId) => {
//     if (!token) throw new Error('Token missing!');

//     const decoded = jwt.verify(token, secret_key) as CustomJwtPayload;
//     const uid: Types.ObjectId = new Types.ObjectId(decoded.userId);
//     if (uid.equals(id)) {
//         return true;
//     }
//     return false;
// };

// export const verifyRefreshToken = (
//     refreshToken: string,
//     id: Types.ObjectId,
// ) => {
//     if (!refreshToken) throw new Error('Token missing!');

//     const decoded = jwt.verify(
//         refreshToken,
//         refresh_secret_key,
//     ) as CustomJwtPayload;
//     const uid: Types.ObjectId = new Types.ObjectId(decoded.userId);
//     if (uid.equals(id)) {
//         return true;
//     }
//     return false;
// };

import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Types } from 'mongoose';
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
