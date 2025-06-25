import { Schema, model, Document } from 'mongoose';

// Define the interface for the Experience document
export interface IExperience extends Document {
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Define the Experience schema

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
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Experience = model<IExperience>('Experience', ExperienceSchema);

export default Experience;