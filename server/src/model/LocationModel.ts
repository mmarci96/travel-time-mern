import mongoose, { Date, Document, Schema, Types } from 'mongoose';

interface ILocation extends Document {
    _id: Types.ObjectId;
    city_name: string;
    country: Types.ObjectId;
    latitude: number;
    longitude: number;
    created_at: Date;
    updated_at: Date;
}

const LocationSchema = new Schema({
    city_name: { type: String, required: true },
    country: { type: Schema.Types.ObjectId, ref: 'Country', required: true },
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date },
});

const LocationModel = mongoose.model<ILocation>('Location', LocationSchema);
export { LocationModel, ILocation };
