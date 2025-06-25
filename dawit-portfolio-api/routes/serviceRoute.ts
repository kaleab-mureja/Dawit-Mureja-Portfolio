// src/routes/serviceRoutes.ts
import { Router } from "express";
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController"; // Adjust path if necessary

const router = Router();

router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.post("/", createService);
router.patch("/:id", updateService);
router.delete("/:id", deleteService);

export default router;
