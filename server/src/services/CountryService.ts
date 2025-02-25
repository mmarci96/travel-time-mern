import BadRequestError from '../errors/BadRequestError';
import { CountryModel } from '../model/CountryModel';
import { CountryCreateDTO } from '../dto/country.dto';
import { PostModel } from '../model/PostModel';
import { Types } from 'mongoose';

export const getAllCountries = async () => {
    try {
        const countries = await CountryModel.find();

        return countries.map((country) => ({
            name: country.name,
            capital: country.capital,
            continent: country.continent,
            subregion: country.subregion,
            population: country.population,
            start_of_week: country.start_of_week,
            timezones: country.timezones,
        }));
    } catch (error) {
        throw new BadRequestError('Failed to fetch countries');
    }
};

export const getCountryById = async (country_id: string) => {
    if (!country_id) {
        throw new BadRequestError({
            code: 400,
            message: 'No country id provided!',
            logging: true,
        });
    }

    const country = await CountryModel.findById(new Types.ObjectId(country_id));
    if (!country) {
        throw new BadRequestError({
            code: 404,
            message: `No country found with country id: ${country_id}`,
            logging: true,
        });
    }

    const result = {
        name: country.name,
        capital: country.capital,
        continent: country.continent,
        subregion: country.subregion,
        population: country.population,
        start_of_week: country.start_of_week,
        timezones: country.timezones,
    };
    return result;
};
