import { Request, Response } from "express-serve-static-core";
import News, { INews } from "../models/News"; 

// GET all News
export const getAllNews = async (req: Request, res: Response) => {
  try {
    const allNews: INews[] = await News.find({});
    res.status(200).json(allNews);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single News by ID
export const getNewsById = async (req: Request, res: Response) => {
  try {
    const newsItem: INews | null = await News.findById(req.params.id);
    if (!newsItem) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json(newsItem);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST a new News
export const createNews = async (req: Request, res: Response) => {
  const { content, eventDate } = req.body;
  const newNewsItem: INews = new News({
    content,
    eventDate: eventDate ? new Date(eventDate) : undefined,
  });

  try {
    const savedNewsItem: INews = await newNewsItem.save();
    res.status(201).json(savedNewsItem);
  } catch (error: any) {
    if (error.code === 11000) {
      // MongoDB duplicate key error
      return res
        .status(409)
        .json({ message: "News with this content already exists." });
    }
    res.status(400).json({ message: error.message });
  }
};

// UPDATE a news by ID (using PATCH for partial updates)
export const updateNews = async (req: Request, res: Response) => {
  try {
    const { content, eventDate } = req.body;
    const newsData: Partial<INews> = {};

    if (content !== undefined) newsData.content = content;
    // Handle explicit null for eventDate to clear it, otherwise update or leave undefined
    if (eventDate !== undefined) {
      newsData.eventDate = eventDate ? new Date(eventDate) : undefined;
    } else if ("eventDate" in req.body && eventDate === null) {
      newsData.eventDate = undefined; // Set to undefined to remove the field from MongoDB
    }

    const updatedNewsItem: INews | null = await News.findByIdAndUpdate(
      req.params.id,
      newsData,
      { new: true, runValidators: true }
    );

    if (!updatedNewsItem) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json(updatedNewsItem);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a News by ID
export const deleteNews = async (req: Request, res: Response) => {
  try {
    const deletedNewsItem: INews | null = await News.findByIdAndDelete(
      req.params.id
    );
    if (!deletedNewsItem) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json({ message: "News deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
