// These interfaces represent the shape of data *after* JSON serialization,
// which is what your Next.js components will receive.

export interface EducationEntry {
  _id: string;
  degree: string;
  university: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  thesis?: string;
  advisors?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface NewsEntry {
  _id: string;
  content: string;
  eventDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
