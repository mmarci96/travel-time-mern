import { Request, Response, NextFunction } from 'express';

const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (err._logging) {
        console.log('We pring everything here: ', err);
    }
    if (!err._code) {
        console.error(err);
    }

    res.status(err.status || err._code || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
        },
    });
};

export default errorHandler;
