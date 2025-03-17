import mongoose from 'mongoose';
import { CountryModel } from '../src/model/CountryModel';
import countriesData from '../data/countries.json';
import { config } from '../src/config';

const mongoUri = config.MONGO_URI;
interface CountryData {
    name: string;
    capitals: string[];
    continents: string[];
    subregion: string;
    population: number;
    startOfWeek: string;
    timezones: string[];
}

if (!mongoUri) {
    console.error('MongoDB URI is missing. Please check your .env file.');
    process.exit(1);
}

mongoose
    .connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

const createCountry = async () => {
    try {
        await CountryModel.insertMany(
            countriesData.map((country: CountryData) => ({
                name: country.name.common,
                capital: country.capitals[0] || 'no capital',
                continent: country.continents[0],
                subregion: country.subregion || 'no subregion',
                population: country.population,
                start_of_week: country.startOfWeek,
                timezones: country.timezones[0],
            })),
        );
        console.log('All countries inserted successfully');
    } catch (error) {
        console.error('Error inserting countries:', error);
    } finally {
        mongoose
            .disconnect()
            .then(() => console.log('Database connection closed.'));
    }
};

createCountry();
