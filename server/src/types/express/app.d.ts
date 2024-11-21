import 'express';

declare module 'express' {
    export interface Request {
        userId?: string;
        userRole?: string;
        username?: string;
    }
}
