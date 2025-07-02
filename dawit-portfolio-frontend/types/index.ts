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

export interface PublicationEntry {
  _id: string; 
  image?: string;
  title: string;
  authors: string[];
  conferenceOrJournal: string;
  year: number;
  pdfLink?: string;
  codeLink?: string;
  createdAt: string; 
  updatedAt: string; 
}

export interface AwardEntry {
  title: string;
  awardingBody: string;
  year: number;
  createdAt: Date;
  updatedAt: Date;
}
