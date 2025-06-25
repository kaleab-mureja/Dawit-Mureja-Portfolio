// src/routes/newsRoute.ts
import { Router } from "express";
import {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} from "../controllers/newsController"; 
const router = Router();

router.get("/", getAllNews);
router.get("/:id", getNewsById);
router.post("/", createNews);
router.patch("/:id", updateNews);
router.delete("/:id", deleteNews);

export default router;
