import { model, Document, Schema } from "mongoose";

// Define the interface for the Education document
export interface IEducation extends Document {
  degree: string;
  university: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  thesis?: string;
  advisors?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Define the Education schema

const EducationSchema = new Schema<IEducation>(
  {
    degree: {
      type: String,
      required: true,
      trim: true,
    },
    university: {
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
    gpa: {
      type: String,
      trim: true,
    },
    thesis: {
      type: String,
      trim: true,
    },
    advisors: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps automatically
  }
);

const Education = model<IEducation>("Education", EducationSchema);

export default Education;
