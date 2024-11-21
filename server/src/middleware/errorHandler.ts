import { Request, Response, NextFunction } from 'express';

const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.error(err.stack);
    console.error(err);

    res.status(err.status || err._code || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
        },
    });
};

export default errorHandler;
