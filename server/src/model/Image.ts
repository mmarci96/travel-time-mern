import mongoose, { Schema, Document } from 'mongoose';

// Define the structure of the image document
interface IImage extends Document {
    filename: string;
    filepath: string;
    userId?: string | null; // Optional field for the user who uploaded the image
    uploadedAt: Date;
}

// Define the schema
const ImageSchema = new Schema<IImage>({
    filename: { type: String, required: true },
    filepath: { type: String, required: true },
    userId: { type: String, default: null }, // Default to null if no user ID is provided
    uploadedAt: { type: Date, default: Date.now },
});

// Create and export the model
const ImageModel = mongoose.model<IImage>('Image', ImageSchema);

export { ImageModel, IImage };
