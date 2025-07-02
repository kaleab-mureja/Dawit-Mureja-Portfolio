// Your file path, e.g., src/models/Experience.ts
import { Schema, model, Document, Model } from 'mongoose'; // Import 'Model'

// Define the interface for the Experience document
export interface IExperience extends Document {
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string[]; // Optional array of strings
  createdAt: Date;
  updatedAt: Date;
}

// Define the Mongoose Schema for Work Experience
const ExperienceSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    organization: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: String,
      required: true,
      trim: true,
    },
    endDate: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: [String], // Array of strings
      required: false, // It's already marked as optional in the interface, good to have it here too
    },
  },
  {
    timestamps: true, 
  }
);

// This is crucial for Next.js development with hot module reloading
const Experience: Model<IExperience> =
  (model.models.Experience as Model<IExperience>) || 
  model<IExperience>('Experience', ExperienceSchema); 

export default Experience;