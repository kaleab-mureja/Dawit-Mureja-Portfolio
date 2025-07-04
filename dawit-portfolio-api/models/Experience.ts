import { Schema, model, Document, Model, models } from "mongoose"; // Added 'models' to the import

// Define the interface for the Experience document
export interface IExperience extends Document {
  image: string;
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
    image: {
      type: String,
      required: true,
    },
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

const Experience: Model<IExperience> =
  (models.Experience as Model<IExperience>) ||
  model<IExperience>("Experience", ExperienceSchema);

export default Experience;
