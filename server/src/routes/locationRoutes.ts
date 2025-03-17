import express, { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/AuthRequest';
import { authenticateToken } from '../middleware/authenticateToken';
import { LocationModel } from '../model/LocationModel';
import { filterCountries } from '../services/CountryService';
import { Types } from 'mongoose';

const router=express.Router();

router.get(
  '/:location_id',
  authenticateToken,
  async (req: AuthRequest, res: Response, next: NextFunction): Promise <any> => {
    try {
     const location_id= new Types.ObjectId(req.params.location_id) ;

     if (!location_id){
       return res.status(400).json({message: 'Location id not found'});
     }
      const location = await LocationModel.findById(location_id); // Fixed parameter name


      if (!location) {
        return res.status(404).json({ message: "Location not found" });
      }
      res.status(200).json({ location });
    } catch (err) {
      next(err);
    }
  },
);


export default router;



