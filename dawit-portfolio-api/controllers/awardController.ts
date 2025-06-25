import { Request, Response } from "express-serve-static-core";
import Award, { IAward } from "../models/Award";

// GET all Awards
export const getAllAwards = async (req: Request, res: Response) => {
  try {
    // Sort by year in descending order (most recent awards first)
    const allAwards: IAward[] = await Award.find({}).sort({
      year: -1,
      createdAt: -1,
    });
    res.status(200).json(allAwards);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single Award by ID
export const getAwardById = async (req: Request, res: Response) => {
  try {
    const awardItem: IAward | null = await Award.findById(req.params.id);
    if (!awardItem) {
      return res.status(404).json({ message: "Award not found" });
    }
    res.status(200).json(awardItem);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST a new Award
export const createAward = async (req: Request, res: Response) => {
  const { title, awardingBody, year, description, link } = req.body;
  const newAwardItem: IAward = new Award({
    title,
    awardingBody,
    year,
    description,
    link,
  });

  try {
    const savedAwardItem: IAward = await newAwardItem.save();
    res.status(201).json(savedAwardItem);
  } catch (error: any) {
    if (error.code === 11000) {
      // MongoDB duplicate key error (if title is unique)
      return res
        .status(409)
        .json({ message: "Award with this title already exists." });
    }
    res.status(400).json({ message: error.message });
  }
};

// UPDATE an Award by ID (using PATCH for partial updates)
export const updateAward = async (req: Request, res: Response) => {
  try {
    const { title, awardingBody, year, description, link } = req.body;
    const updateData: Partial<IAward> = {};

    if (title !== undefined) updateData.title = title;
    if (awardingBody !== undefined) updateData.awardingBody = awardingBody;
    if (year !== undefined) updateData.year = year;
    if (description !== undefined) updateData.description = description;
    // For link, ensure it can be set to undefined/null to clear it if sent as such
    if (link !== undefined) {
      updateData.link = link;
    } else if ("link" in req.body && link === null) {
      updateData.link = undefined; // Set to undefined to remove the field from MongoDB
    }

    const updatedAwardItem: IAward | null = await Award.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedAwardItem) {
      return res.status(404).json({ message: "Award not found" });
    }
    res.status(200).json(updatedAwardItem);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE an Award by ID
export const deleteAward = async (req: Request, res: Response) => {
  try {
    const deletedAwardItem: IAward | null = await Award.findByIdAndDelete(
      req.params.id
    );
    if (!deletedAwardItem) {
      return res.status(404).json({ message: "Award not found" });
    }
    res.status(200).json({ message: "Award deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
