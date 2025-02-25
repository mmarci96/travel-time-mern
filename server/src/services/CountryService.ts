import BadRequestError from '../errors/BadRequestError';
import { CountryModel } from '../model/CountryModel';
import { CountryCreateDTO } from '../dto/country.dto';

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
