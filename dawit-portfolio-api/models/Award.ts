// src/models/Award.ts
import mongoose, { Document, Schema } from "mongoose";

// 1. Define the TypeScript Interface
export interface IAward extends Document {
  title: string;
  awardingBody: string;
  year: number;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Define the Mongoose Schema
const AwardSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Award title is required."],
      unique: true, // Assuming award titles are unique per individual
      trim: true,
      minlength: [3, "Award title must be at least 3 characters long."],
    },
    awardingBody: {
      type: String,
      required: [true, "Awarding body is required."],
      trim: true,
      minlength: [2, "Awarding body must be at least 2 characters long."],
    },
    year: {
      type: Number,
      required: [true, "Award year is required."],
      min: [1900, "Year must be after 1900."],
      max: [new Date().getFullYear() + 1, "Year cannot be in the future."], // Awards are typically in the past or current year
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// 3. Create and Export the Mongoose Model
const Award = mongoose.model<IAward>("Award", AwardSchema);

export default Award;
