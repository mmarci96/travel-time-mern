import express, { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types/AuthRequest';
import { authenticateToken } from '../middleware/authenticateToken';
import { CountryModel } from '../model/CountryModel';
import { filterCountries } from '../services/CountryService';

const router = express.Router();

router.get(
    '/',
    authenticateToken,
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const countries = await filterCountries(req.query);
            res.status(200).json({ countries });
        } catch (err) {
            next(err);
        }
    },
);

router.get(
    '/:country_id',
    authenticateToken,
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const country = await CountryModel.findById(req.params.country_id);
            res.status(200).json({ country });
        } catch (err) {
            next(err);
        }
    },
);

interface CountryRequestParams {
    country_name: string;
}
router.get(
    '/countryName/:country_name',
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { country_name } = req.params as { country_name: string };

            const country = await CountryModel.findOne({
                'name.common': country_name,
            });

            if (!country) {
                return res.status(404).json({ message: 'Country not found' });
            }

            res.status(200).json({ country });
        } catch (err) {
            next(err);
        }
    },
);

export default router;
