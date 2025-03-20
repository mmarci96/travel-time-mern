import BadRequestError from '../errors/BadRequestError';
import { Types } from 'mongoose';
import { LocationModel } from '../model/LocationModel';

export const getLocationById = async (location_id: string) => {
    if (!location_id) {
        throw new BadRequestError({
            code: 400,
            message: 'No country id provided!',
            logging: true,
        });
    }

    const location = await LocationModel.findById(
        new Types.ObjectId(location_id),
    );

    if (!location) {
        throw new BadRequestError({
            code: 404,
            message: `No location found with location id: ${location_id}`,
            logging: true,
        });
    }

    return {
        cityName: location.city_name,
        country: location.country,
        latitude: location.latitude,
        longitude: location.longitude,
    };
};

export const getLocationByCityName = async (city_name: string) => {
    if (!city_name) {
        throw new BadRequestError({
            code: 400,
            message: 'No city name provided!',
            logging: true,
        });
    }

    const location = await LocationModel.findOne({ city_name: city_name });
    if (!location) {
        throw new BadRequestError({
            code: 404,
            message: `No location found with city name: ${city_name}`,
        });
    }

    return {
        cityName: location.city_name,
        country: location.country,
        latitude: location.latitude,
        longitude: location.longitude,
    };
};

export const getAllLocationsNames = async () => {
    const locations = await LocationModel.find({});
    return locations.map((location) => location.country);
};
