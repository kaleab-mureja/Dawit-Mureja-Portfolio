import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors"; // Added CORS import
import awardRoutes from "./routes/awardRoute";
import educationRoutes from "./routes/educationRoute";
import experienceRoutes from "./routes/experienceRoute";
import newsRoutes from "./routes/newsRoute";
import publicationRoutes from "./routes/publicationRoute";
import serviceRoutes from "./routes/serviceRoute";
import connectDB from "./config/db";

dotenv.config();
// Connect to database
connectDB();

const PORT = process.env.PORT || 5000;

const app: Application = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes (consider specific origins for production)

app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});

// API Routes - prefixed with /api/ for clear distinction
app.use("/api/award", awardRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/publication", publicationRoutes);
app.use("/api/service", serviceRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access API at http://localhost:${PORT}`);
});
