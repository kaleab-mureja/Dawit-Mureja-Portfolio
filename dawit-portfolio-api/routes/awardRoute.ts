import { Router } from "express";
import {
  getAllAwards,
  getAwardById,
  createAward,
  updateAward,
  deleteAward,
} from "../controllers/awardController"; 

const router = Router();

router.get("/", getAllAwards);
router.get("/:id", getAwardById);
router.post("/", createAward);
router.patch("/:id", updateAward);
router.delete("/:id", deleteAward);

export default router;
