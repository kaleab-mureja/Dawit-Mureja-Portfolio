// src/models/Award.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IAward extends Document {
  title: string;
  awardingBody: string;
  year: number;
  createdAt: Date;
  updatedAt: Date;
}

const AwardSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Award title is required."],
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
      max: [new Date().getFullYear() + 1, "Year cannot be in the future."],
    },
  },
  {
    timestamps: true,
  }
);

AwardSchema.index({ title: 1, year: 1, awardingBody: 1 }, { unique: true });

const Award = mongoose.model<IAward>("Award", AwardSchema);

export default Award;
