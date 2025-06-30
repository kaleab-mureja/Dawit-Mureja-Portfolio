// src/models/Service.ts
import { Schema, model, Document } from "mongoose";

// Define a sub-interface for the individual service details,
export interface IServiceDetail {
  item: string;
}

// Define the TypeScript Interface for the Service document.
export interface IService extends Document {
  category: string; // e.g., "Journal Reviewer", "Conference Reviewer", "Student Volunteer"
  details: IServiceDetail[]; // An array holding specific items/roles within the category
  createdAt: Date;
  updatedAt: Date;
}

// Define the Mongoose Schema for Service.
const serviceSchema = new Schema<IService>(
  {
    category: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    details: [
      {
        item: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Service = model<IService>("Service", serviceSchema);

export default Service;
