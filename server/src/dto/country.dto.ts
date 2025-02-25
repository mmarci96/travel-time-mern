export interface CountryCreateDTO {
    name: string;
    capital: string;
    continent: string;
    subregion: string;
    population: number;
    language?: string;
    start_of_week: string;
    timezones: string;
    currency?: string;
}
