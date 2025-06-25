import { Request, Response } from "express-serve-static-core";
import Publication, { IPublication } from "../models/Publication"

// GET all Publications
export const getAllPublications = async (req: Request, res: Response) => {
  try {
    // Sort by year in descending order (most recent publications first)
    const allPublications: IPublication[] = await Publication.find({}).sort({
      year: -1,
      createdAt: -1,
    });
    res.status(200).json(allPublications);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single Publication by ID
export const getPublicationById = async (req: Request, res: Response) => {
  try {
    const publicationItem: IPublication | null = await Publication.findById(
      req.params.id
    );
    if (!publicationItem) {
      return res.status(404).json({ message: "Publication not found" });
    }
    res.status(200).json(publicationItem);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST a new Publication
export const createPublication = async (req: Request, res: Response) => {
  const { title, authors, conferenceOrJournal, year, pdfLink, codeLink } =
    req.body;
  const newPublicationItem: IPublication = new Publication({
    title,
    authors,
    conferenceOrJournal,
    year,
    pdfLink,
    codeLink,
  });

  try {
    const savedPublicationItem: IPublication = await newPublicationItem.save();
    res.status(201).json(savedPublicationItem);
  } catch (error: any) {
    if (error.code === 11000) {
      // MongoDB duplicate key error (if title is unique)
      return res
        .status(409)
        .json({ message: "Publication with this title already exists." });
    }
    res.status(400).json({ message: error.message });
  }
};

// UPDATE a Publication by ID (using PATCH for partial updates)
export const updatePublication = async (req: Request, res: Response) => {
  try {
    const { title, authors, conferenceOrJournal, year, pdfLink, codeLink } =
      req.body;
    const updateData: Partial<IPublication> = {};

    if (title !== undefined) updateData.title = title;
    if (authors !== undefined) updateData.authors = authors;
    if (conferenceOrJournal !== undefined)
      updateData.conferenceOrJournal = conferenceOrJournal;
    if (year !== undefined) updateData.year = year;

    // Handle optional links: If explicitly sent as null, set to undefined to clear them in DB
    if (pdfLink !== undefined) {
      updateData.pdfLink = pdfLink;
    } else if ("pdfLink" in req.body && pdfLink === null) {
      updateData.pdfLink = undefined;
    }

    if (codeLink !== undefined) {
      updateData.codeLink = codeLink;
    } else if ("codeLink" in req.body && codeLink === null) {
      updateData.codeLink = undefined;
    }

    const updatedPublicationItem: IPublication | null =
      await Publication.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true } // `new: true` returns the updated document; `runValidators` applies schema validation
      );

    if (!updatedPublicationItem) {
      return res.status(404).json({ message: "Publication not found" });
    }
    res.status(200).json(updatedPublicationItem);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a Publication by ID
export const deletePublication = async (req: Request, res: Response) => {
  try {
    const deletedPublicationItem: IPublication | null =
      await Publication.findByIdAndDelete(req.params.id);
    if (!deletedPublicationItem) {
      return res.status(404).json({ message: "Publication not found" });
    }
    res.status(200).json({ message: "Publication deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
