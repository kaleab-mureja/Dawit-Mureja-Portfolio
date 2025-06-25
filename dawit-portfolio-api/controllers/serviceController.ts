// src/controllers/serviceController.ts
import { Request, Response } from "express-serve-static-core";
import Service, { IService } from "../models/Service";

// GET all Services
export const getAllServices = async (req: Request, res: Response) => {
  try {
    // Sort services by category for consistent display
    const allServices: IService[] = await Service.find({}).sort({
      category: 1,
    });
    res.status(200).json(allServices);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single Service by ID
export const getServiceById = async (req: Request, res: Response) => {
  try {
    const serviceItem: IService | null = await Service.findById(req.params.id);
    if (!serviceItem) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(serviceItem);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST a new Service
export const createService = async (req: Request, res: Response) => {
  // Now expecting 'category' and 'details' array in the request body
  const { category, details } = req.body;

  // Basic validation for details array structure
  if (
    !Array.isArray(details) ||
    !details.every((d: any) => typeof d.item === "string")
  ) {
    return res.status(400).json({
      message: "Details must be an array of objects with an 'item' string.",
    });
  }

  const newServiceItem: IService = new Service({
    category,
    details: details.map((d: { item: string }) => ({ item: d.item })), // Ensure correct structure
  });

  try {
    const savedServiceItem: IService = await newServiceItem.save();
    res.status(201).json(savedServiceItem);
  } catch (error: any) {
    if (error.code === 11000) {
      // MongoDB duplicate key error (for unique category)
      return res
        .status(409)
        .json({ message: "Service with this category already exists." });
    }
    res.status(400).json({ message: error.message });
  }
};

// UPDATE a Service by ID (using PATCH for partial updates)
export const updateService = async (req: Request, res: Response) => {
  try {
    // Now expecting 'category' and/or 'details' in the request body
    const { category, details } = req.body;
    const updateData: Partial<IService> = {};

    if (category !== undefined) updateData.category = category;

    if (details !== undefined) {
      // Validate details array structure if provided
      if (
        !Array.isArray(details) ||
        !details.every((d: any) => typeof d.item === "string")
      ) {
        return res.status(400).json({
          message: "Details must be an array of objects with an 'item' string.",
        });
      }
      updateData.details = details.map((d: { item: string }) => ({
        item: d.item,
      }));
    }

    const updatedServiceItem: IService | null = await Service.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true } // `new: true` returns the updated document; `runValidators` applies schema validation
    );

    if (!updatedServiceItem) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(updatedServiceItem);
  } catch (error: any) {
    res.status(400).json({ message: error.message }); // Handles validation errors or unique constraint violations if category is updated
  }
};

// DELETE a Service by ID
export const deleteService = async (req: Request, res: Response) => {
  try {
    const deletedServiceItem: IService | null = await Service.findByIdAndDelete(
      req.params.id
    );
    if (!deletedServiceItem) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
