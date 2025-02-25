import mongoose, { Schema, Document, Date, Types } from 'mongoose';

interface ICountry extends Document {
  _id: Types.ObjectId;
  name: string;
  capital: string;
  continent: string;
  subregion: string;
  population: number;
  language: string;
  start_of_week: string;
  timezones: string;
  currency: string;
  created_at: Date;
  updated_at?: Date;
}

const countrySchema =new Schema({
  name: {type: String, required: true},
  capital: {type: String, required: true},
  continent: {type: String, required: true},
  subregion: {type: String, required: true},
  population: {type: String, required: true},
  language: {type: String, required: false},
  start_of_week: {type: String, required: true},
  timezones: {type: String, required: true},
  currency: {type: String, required: false},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date},
})


const CountryModel = mongoose.model<ICountry>('Country', countrySchema);
export { CountryModel, ICountry };


