import { Request, Response } from "express-serve-static-core";
import Experience, { IExperience } from "../models/Experience"; 

// GET all Experiences
export const getAllExperiences = async (req: Request, res: Response) => {
  try {
    // Sort by end date descending (most recent first), then start date descending
    const experiences: IExperience[] = await Experience.find().sort({
      endDate: -1,
      startDate: -1,
    });
    res.status(200).json(experiences);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single Experience by ID
export const getExperienceById = async (req: Request, res: Response) => {
  try {
    const experienceItem: IExperience | null = await Experience.findById(
      req.params.id
    );
    if (!experienceItem) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.status(200).json(experienceItem);
  } catch (error: any) {
    // This catch block handles cases where the ID format is invalid (e.g., not a valid MongoDB ObjectId)
    // or other server errors during the find operation.
    res.status(500).json({ message: error.message });
  }
};

// POST a new Experience
export const createExperience = async (req: Request, res: Response) => {
  const { title, organization, location, startDate, endDate, description } =
    req.body;
  const newExperienceItem: IExperience = new Experience({
    title,
    organization,
    location,
    startDate,
    endDate,
    description,
  });

  try {
    const savedExperienceItem: IExperience = await newExperienceItem.save();
    res.status(201).json(savedExperienceItem);
  } catch (error: any) {
    // Handles Mongoose validation errors or other save-related issues
    res.status(400).json({ message: error.message });
  }
};

// UPDATE an Experience by ID (using PATCH for partial updates)
export const updateExperience = async (req: Request, res: Response) => {
  try {
    const { title, organization, location, startDate, endDate, description } =
      req.body;
    const updateData: Partial<IExperience> = {};

    // Only add fields to updateData if they are provided in the request body
    if (title !== undefined) updateData.title = title;
    if (organization !== undefined) updateData.organization = organization;
    if (location !== undefined) updateData.location = location;
    if (startDate !== undefined) updateData.startDate = startDate;
    if (endDate !== undefined) updateData.endDate = endDate;
    if (description !== undefined) updateData.description = description;

    const updatedExperienceItem: IExperience | null =
      await Experience.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true } // `new: true` returns the updated document; `runValidators` applies schema validation on update
      );

    if (!updatedExperienceItem) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.status(200).json(updatedExperienceItem);
  } catch (error: any) {
    res.status(400).json({ message: error.message }); // Handles validation errors or other update issues
  }
};

// DELETE an Experience by ID
export const deleteExperience = async (req: Request, res: Response) => {
  try {
    const deletedExperienceItem: IExperience | null =
      await Experience.findByIdAndDelete(req.params.id);
    if (!deletedExperienceItem) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.status(200).json({ message: "Experience deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
