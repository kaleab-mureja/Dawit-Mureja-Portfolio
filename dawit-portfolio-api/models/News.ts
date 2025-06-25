import { Schema, model, Document } from 'mongoose';

// Define the interface for the News document
export interface INews extends Document {
  content: string;        // The main text of the News
  eventDate?: Date;       // The date the event mentioned in the News occurs (e.g., "August 2025")
  createdAt: Date;
  updatedAt: Date;      
}

// Define the News schema
const NewsSchema = new Schema<INews>({
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,  
    maxlength: 500, 
  },
  eventDate: {
    type: Date,
    required: false, // This date is optional as not all News might refer to a future event
    },
}, {
  timestamps: true, 
  collection: 'News', // Explicitly name the collection 'News'
});

const News = model<INews>('News', NewsSchema);

export default News;