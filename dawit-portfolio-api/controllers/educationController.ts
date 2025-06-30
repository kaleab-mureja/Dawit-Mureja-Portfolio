import { Request, Response } from "express-serve-static-core";
import Education, { IEducation } from "../models/Education"; // Adjust path if necessary

// GET all Education entries
export const getAllEducation = async (req: Request, res: Response) => {
  try {
    const educationEntries: IEducation[] = await Education.find().sort({
      endDate: -1,
      startDate: -1,
    });
    res.status(200).json(educationEntries);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single Education entry by ID
export const getEducationById = async (req: Request, res: Response) => {
  try {
    const educationItem: IEducation | null = await Education.findById(
      req.params.id
    );
    if (!educationItem) {
      return res.status(404).json({ message: "Education entry not found" });
    }
    res.status(200).json(educationItem);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST a new Education entry
export const createEducation = async (req: Request, res: Response) => {
  const {
    degree,
    university,
    location,
    startDate,
    endDate,
    gpa,
    thesis,
    advisors,
  } = req.body;
  const newEducationItem: IEducation = new Education({
    degree,
    university,
    location,
    startDate,
    endDate,
    gpa,
    thesis,
    advisors,
  });

  try {
    const savedEducationItem: IEducation = await newEducationItem.save();
    res.status(201).json(savedEducationItem);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE an Education entry by ID (using PATCH for partial updates)
export const updateEducation = async (req: Request, res: Response) => {
  try {
    const {
      degree,
      university,
      location,
      startDate,
      endDate,
      gpa,
      thesis,
      advisors,
    } = req.body;
    const updateData: Partial<IEducation> = {};

    if (degree !== undefined) updateData.degree = degree;
    if (university !== undefined) updateData.university = university;
    if (location !== undefined) updateData.location = location;
    if (startDate !== undefined) updateData.startDate = startDate;
    if (endDate !== undefined) updateData.endDate = endDate;
    if (gpa !== undefined) updateData.gpa = gpa;
    if (thesis !== undefined) updateData.thesis = thesis;
    if (advisors !== undefined) updateData.advisors = advisors;

    const updatedEducationItem: IEducation | null =
      await Education.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
        runValidators: true,
      });

    if (!updatedEducationItem) {
      return res.status(404).json({ message: "Education entry not found" });
    }
    res.status(200).json(updatedEducationItem);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE an Education entry by ID
export const deleteEducation = async (req: Request, res: Response) => {
  try {
    const deletedEducationItem: IEducation | null =
      await Education.findByIdAndDelete(req.params.id);
    if (!deletedEducationItem) {
      return res.status(404).json({ message: "Education entry not found" });
    }
    res.status(200).json({ message: "Education entry deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
