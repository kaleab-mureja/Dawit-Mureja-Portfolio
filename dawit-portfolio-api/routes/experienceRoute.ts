import { Router } from "express"; // Essential: Imports the Router from Express
import {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController"

const router = Router(); 

// Define the routes and associate them with their respective controller functions
router.get("/", getAllExperiences); 
router.get("/:id", getExperienceById);
router.post("/", createExperience); 
router.patch("/:id", updateExperience); 
router.delete("/:id", deleteExperience);

export default router; 
