// src/routes/publicationRoutes.ts
import { Router } from "express";
import {
  getAllPublications,
  getPublicationById,
  createPublication,
  updatePublication,
  deletePublication,
} from "../controllers/publicationController"; // Adjust path if necessary

const router = Router();

router.get("/", getAllPublications);
router.get("/:id", getPublicationById);
router.post("/", createPublication);
router.patch("/:id", updatePublication);
router.delete("/:id", deletePublication);

export default router;