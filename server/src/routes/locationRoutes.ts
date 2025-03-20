import express, { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/AuthRequest';
import { authenticateToken } from '../middleware/authenticateToken';
import { LocationModel } from '../model/LocationModel';
import { filterCountries } from '../services/CountryService';
import { Types } from 'mongoose';
import {
    getAllLocationsNames,
    getLocationByCityName,
    getLocationById,
} from '../services/LocationService';

const router = express.Router();

router.get(
    '/:location_id',
    authenticateToken,
    async (
        req: AuthRequest,
        res: Response,
        next: NextFunction,
    ): Promise<any> => {
        try {
            const location = await getLocationById(req.params.location_id);
            res.status(200).json({ location });
        } catch (err) {
            next(err);
        }
    },
);

router.get(
    '/cityName/:city_name',
    authenticateToken,
    async (
        req: AuthRequest,
        res: Response,
        next: NextFunction,
    ): Promise<any> => {
        try {
            const location = await getLocationByCityName(req.params.city_name);
            res.status(200).json({ location });
        } catch (err) {
            next(err);
        }
    },
);
router.get(
    '/countryNames',
    authenticateToken,
    (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
        return getAllLocationsNames();
    },
);

export default router;
