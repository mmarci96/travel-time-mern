import BadRequestError from '../errors/BadRequestError';
import { parseFilterOptions } from './helperFunctions';
import { CountryModel } from '../model/CountryModel';

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
        throw new BadRequestError({
            code: 404,
            message: 'No countries found!',
            logging: true,
        });
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

export const filterCountries = async (options: {
    page?: string;
    limit?: string;
    search?: string;
    sort?: string;
    asc?: string;
}) => {
    const { page, limit, search, sort, asc } = parseFilterOptions(options);

    const sortOrder = asc ? 1 : -1;

    let sortCriteria: any = { [sort]: sortOrder };

    const countries = await CountryModel.find({
        $or: [
            { name: { $regex: search, $options: 'i' } },
            { continent: { $regex: search, $options: 'i' } },
        ],
    })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(sortCriteria)
        .collation({ locale: 'en', strength: 2 });

    if (!countries || countries.length === 0) {
        throw new BadRequestError({
            code: 404,
            message: 'No countries found!',
            logging: true,
        });
    }

    const results = await Promise.all(
        countries.map(async (country) => {
            return {
                name: country.name,
                capital: country.capital,
                continent: country.continent,
                subregion: country.subregion,
                population: country.population,
                start_of_week: country.start_of_week,
                timezones: country.timezones,
            };
        }),
    );
    return results;
};
