import mongoose, { Date, Document, Schema, Types } from 'mongoose';

interface ILocation extends Document {
  _id: Types.ObjectId;
  cityName: string;
  country: string;
  latitude: number;
  longitude: number;
  created_at: Date;
  updated_at: Date;

}

const LocationSchema = new Schema({
  cityName: { type: String, required: true },
  country: { type: String, required: true },
  latitude: { type: Number, required: false },
  longitude: { type: Number, required: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date},
})


const LocationModel = mongoose.model<ILocation>("Location", LocationSchema);
export { LocationModel, ILocation };
