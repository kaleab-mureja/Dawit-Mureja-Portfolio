import { Request, Response } from "express-serve-static-core";
import Publication, { IPublication } from "../models/Publication";

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
    // Log the error for debugging purposes
    console.error("Error fetching all publications:", error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
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
    // Log the error for debugging purposes
    console.error(
      `Error fetching publication with ID ${req.params.id}:`,
      error
    );
    // Check for invalid ID format (e.g., CastError)
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid Publication ID format" });
    }
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

// POST a new Publication
export const createPublication = async (req: Request, res: Response) => {
  const {
    image, // Include the new image field
    title,
    authors,
    conferenceOrJournal,
    year,
    pdfLink,
    codeLink,
  } = req.body;

  const newPublicationItem: IPublication = new Publication({
    image, // Assign the image field
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
    // Log the error for debugging purposes
    console.error("Error creating publication:", error);
    if (error.code === 11000) {
      // MongoDB duplicate key error (if title is unique)
      return res
        .status(409)
        .json({ message: "Publication with this title already exists." });
    }
    // Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (err: any) => err.message
      );
      return res
        .status(400)
        .json({ message: "Validation failed", errors: messages });
    }
    res.status(400).json({ message: error.message || "Bad Request" });
  }
};

// UPDATE a Publication by ID (using PATCH for partial updates)
export const updatePublication = async (req: Request, res: Response) => {
  try {
    const {
      image, // Include the new image field
      title,
      authors,
      conferenceOrJournal,
      year,
      pdfLink,
      codeLink,
    } = req.body;
    const updateData: Partial<IPublication> = {};

    // Add image to updateData if provided or explicitly set to null
    if (image !== undefined) {
      updateData.image = image;
    } else if ("image" in req.body && image === null) {
      // If image is explicitly sent as null, set to undefined to clear it in DB
      updateData.image = undefined;
    }

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
    // Log the error for debugging purposes
    console.error(
      `Error updating publication with ID ${req.params.id}:`,
      error
    );
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "Publication with this title already exists." });
    }
    // Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (err: any) => err.message
      );
      return res
        .status(400)
        .json({ message: "Validation failed", errors: messages });
    }
    // Check for invalid ID format (e.g., CastError)
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid Publication ID format" });
    }
    res.status(400).json({ message: error.message || "Bad Request" });
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
    // Log the error for debugging purposes
    console.error(
      `Error deleting publication with ID ${req.params.id}:`,
      error
    );
    // Check for invalid ID format (e.g., CastError)
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid Publication ID format" });
    }
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
