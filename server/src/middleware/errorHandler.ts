import { Request, Response, NextFunction } from 'express';

const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.error(err.stack);

    const statusCode = err.status || 500; // Fallback to 500 if status is not defined
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        error: {
            message,
            status: statusCode,
        },
    });
};

export default errorHandler;
