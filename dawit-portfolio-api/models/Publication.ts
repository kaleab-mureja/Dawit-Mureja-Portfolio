import mongoose, { Document, Schema } from "mongoose";

export interface IPublication extends Document {
  title: string;
  authors: string[]; 
  conferenceOrJournal: string; 
  year: number;
  pdfLink?: string; 
  codeLink?: string; 
  createdAt: Date;
  updatedAt: Date;
}

const PublicationSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Publication title is required."],
      unique: true, // Assuming titles are unique
      trim: true, // Removes whitespace from beginning/end
      minlength: [5, "Title must be at least 5 characters long."],
    },
    authors: {
      type: [String], // Array of strings
      required: [true, "Authors are required."],
      validate: {
        validator: function (v: string[]) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "At least one author is required.",
      },
    },
    conferenceOrJournal: {
      type: String,
      required: [true, "Conference or journal name is required."],
      trim: true,
      minlength: [
        3,
        "Conference/journal name must be at least 3 characters long.",
      ],
    },
    year: {
      type: Number,
      required: [true, "Publication year is required."],
      min: [1900, "Year must be after 1900."],
      max: [new Date().getFullYear() + 5, "Year cannot be in the far future."], // Adjust max year as needed
    },
    pdfLink: {
      type: String,
      trim: true,
      validate: {
        validator: function (v?: string) {
          if (!v) return true; // Optional, so allow undefined/empty
          return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v); // Basic URL regex validation
        },
        message: (props) => `${props.value} is not a valid URL for PDF Link!`,
      },
    },
    codeLink: {
      type: String,
      trim: true,
      validate: {
        validator: function (v?: string) {
          if (!v) return true; // Optional, so allow undefined/empty
          return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v); // Basic URL regex validation
        },
        message: (props) => `${props.value} is not a valid URL for Code Link!`,
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Optional: Add an index to the title for faster lookups and unique enforcement
PublicationSchema.index({ title: 1 }, { unique: true });

// 3. Create and Export the Mongoose Model
const Publication = mongoose.model<IPublication>(
  "Publication",
  PublicationSchema
);

export default Publication;
