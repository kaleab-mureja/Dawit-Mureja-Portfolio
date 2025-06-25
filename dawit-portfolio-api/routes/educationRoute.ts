import { Router } from "express";
import {
  getAllEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../controllers/educationController"; // Adjust path if necessary

const router = Router();

router.get("/", getAllEducation);
router.get("/:id", getEducationById);
router.post("/", createEducation);
router.patch("/:id", updateEducation);
router.delete("/:id", deleteEducation);

export default router;