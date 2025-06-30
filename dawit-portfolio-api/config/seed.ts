import dotenv from "dotenv";
import mongoose from "mongoose";
import News, { INews } from "../models/News";
import Publication, { IPublication } from "../models/Publication";
import Award, { IAward } from "../models/Award";
import Experience, { IExperience } from "../models/Experience";
import Education, { IEducation } from "../models/Education";
import Service, { IService } from "../models/Service";

dotenv.config();

// --- Seed Data Definitions ---

const newsSeedData: Partial<INews>[] = [
  {
    content:
      "Apr. 2025: I will be joining Netflix (Los Gatos, CA) as a Research Scientist starting in August 2025. Thrilled to begin this next chapter!",
    eventDate: new Date("2025-08-01T00:00:00Z"),
  },
  {
    content:
      "Mar. 2025: I started my postdoctoral research at the Multimodal AI Lab, KAIST, under the supervision of Prof. Joon Son Chung.",
  },
  {
    content:
      "Feb. 2025: I received the prestigious Jang Young Sil Postdoctoral Fellowship.",
  },
  {
    content:
      'Jan. 2025: Our paper "High-Quality Joint Image and Video Tokenization with Causal VAE" was accepted to ICLR 2025. Excited to present!',
    eventDate: new Date("2025-01-01T00:00:00Z"),
  },
  {
    content:
      'Nov. 2024: Successfully defended my Ph.D. dissertation titled "Deep Long-form Video Understanding".',
  },
];

const publicationsSeedData: Partial<IPublication>[] = [
  {
    image:
      "https://placehold.co/400x250/A3E635/000?text=MambaVision+for+Discrete...",
    title:
      "MambaVision for Discrete Video Tokenization with Channel-Split Quantization",
    authors: [
      "Dawit Mureja Argaw",
      "Xian Liu",
      "Joon Son Chung",
      "Ming-Yu Liu",
      "Fitsum Reda",
    ],
    conferenceOrJournal: "Under Review",
    year: 2025,
    pdfLink: "https://placeholder.com/coming_soon.pdf",
  },
  {
    image:
      "https://placehold.co/400x250/FF6347/FFF?text=High-Quality+Joint+Image...",
    title: "High-Quality Joint Image and Video Tokenization with Causal VAE",
    authors: [
      "Dawit Mureja Argaw",
      "Xian Liu",
      "Qinsheng Zhang",
      "Joon Son Chung",
      "Ming-Yu Liu",
      "Fitsum Reda",
    ],
    conferenceOrJournal:
      "International Conference on Learning Representations (ICLR)",
    year: 2025,
    pdfLink: "https://openreview.net/pdf?id=aRD1NqcXTC",
  },
  {
    image:
      "https://placehold.co/400x250/4682B4/FFF?text=Scaling+Up+Video+Summarization...",
    title:
      "Scaling Up Video Summarization Pretraining with Large Language Models",
    authors: [
      "Dawit Mureja Argaw",
      "Seunghyun Yoon",
      "Fabian Caba Heilbron",
      "Hanieh Deilamsalehy",
      "Trung Bui",
      "Zhaowen Wang",
      "Franck Dernoncourt",
      "Joon Son Chung",
    ],
    conferenceOrJournal:
      "IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)",
    year: 2024,
    pdfLink: "https://arxiv.org/pdf/2404.03398.pdf",
  },
  {
    image:
      "https://placehold.co/400x250/8A2BE2/FFF?text=Towards+Automated+Movie+Trailer...",
    title: "Towards Automated Movie Trailer Generation",
    authors: [
      "Dawit Mureja Argaw",
      "Mattia Soldan",
      "Alejandro Pardo",
      "Chen Zhao",
      "Fabian Caba Heilbron",
      "Joon Son Chung",
      "Bernard Ghanem",
    ],
    conferenceOrJournal:
      "IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)",
    year: 2024,
    pdfLink: "https://arxiv.org/pdf/2404.03398.pdf",
  },
  {
    image:
      "https://placehold.co/400x250/DAA520/000?text=Long-range+Multimodal+Pretraining...",
    title: "Long-range Multimodal Pretraining for Movie Understanding",
    authors: [
      "Dawit Mureja Argaw",
      "Joon-Young Lee",
      "Markus Woodson",
      "In So Kweon",
      "Fabian Caba Heilbron",
    ],
    conferenceOrJournal: "International Conference on Computer Vision (ICCV)",
    year: 2023,
    pdfLink: "https://arxiv.org/pdf/2308.09775",
    codeLink: "https://github.com/dawitmureja/LMP",
  },
  {
    image:
      "https://placehold.co/400x250/3CB371/FFF?text=The+Anatomy+of+Video+Editing...",
    title:
      "The Anatomy of Video Editing: A Dataset and Benchmark Suite for AI-Assisted Video Editing",
    authors: [
      "Dawit Mureja Argaw",
      "Fabian Caba Heilbron",
      "Joon-Young Lee",
      "Markus Woodson",
      "In So Kweon",
    ],
    conferenceOrJournal: "European Conference on Computer Vision (ECCV)",
    year: 2022,
    pdfLink: "https://arxiv.org/pdf/2207.09812",
    codeLink: "https://github.com/dawitmureja/AVE",
  },
  {
    image:
      "https://placehold.co/400x250/BDB76B/000?text=Long-term+Video+Frame...",
    title: "Long-term Video Frame Interpolation via Feature Propagation",
    authors: ["Dawit Mureja Argaw", "In So Kweon"],
    conferenceOrJournal:
      "IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)",
    year: 2022,
    pdfLink: "https://arxiv.org/pdf/2203.15427",
  },
  {
    image:
      "https://placehold.co/400x250/CD5C5C/FFF?text=Motion-blurred+Video+Interpolation...",
    title: "Motion-blurred Video Interpolation and Extrapolation",
    authors: [
      "Dawit Mureja Argaw",
      "Junsik Kim",
      "Francois Rameau",
      "In So Kweon",
    ],
    conferenceOrJournal:
      "Association for the Advancement of Artificial Intelligence (AAAI)",
    year: 2021,
    pdfLink: "https://arxiv.org/pdf/2103.02984",
  },
  {
    image:
      "https://placehold.co/400x250/ADD8E6/000?text=Optical+Flow+Estimation...",
    title: "Optical Flow Estimation from a Single Motion-blurred Image",
    authors: [
      "Dawit Mureja Argaw",
      "Junsik Kim",
      "Francois Rameau",
      "Jae Won Cho",
      "In So Kweon",
    ],
    conferenceOrJournal:
      "Association for the Advancement of Artificial Intelligence (AAAI)",
    year: 2021,
    pdfLink: "https://arxiv.org/pdf/2103.02996",
  },
  {
    image:
      "https://placehold.co/400x250/DA70D6/FFF?text=Blurry+Video+Compression...",
    title:
      "Blurry Video Compression: A Trade-off between Visual Enhancement and Data Compression",
    authors: ["Dawit Mureja Argaw", "Junsik Kim", "In So Kweon"],
    conferenceOrJournal:
      "IEEE/CVF Winter Conference on Applications of Computer Vision (WACV)",
    year: 2024,
    pdfLink: "https://arxiv.org/pdf/2311.04430",
  },
  {
    image:
      "https://placehold.co/400x250/20B2AA/FFF?text=Restoration+of+Video+Frames...",
    title:
      "Restoration of Video Frames from a Single Blurred Image with Motion Understanding",
    authors: [
      "Dawit Mureja Argaw",
      "Junsik Kim",
      "Francois Rameau",
      "Chaoning Zhang",
      "In So Kweon",
    ],
    conferenceOrJournal:
      "IEEE/CVF Conference on Computer Vision and Pattern Recognition Workshops (CVPRW)",
    year: 2021,
    pdfLink: "https://arxiv.org/pdf/2104.09134",
  },
  {
    image:
      "https://placehold.co/400x250/FFD700/000?text=Empirical+Study+on+Using...",
    title:
      "Empirical Study on Using Adapters for Debiased Visual Question Answering",
    authors: [
      "Jae Won Cho",
      "Dawit Mureja Argaw",
      "Yeongtaek Oh",
      "Dong-Jin Kim",
      "In So Kweon",
    ],
    conferenceOrJournal: "Computer Vision and Image Understanding (CVIU)",
    year: 2023,
    pdfLink:
      "https://www.sciencedirect.com/science/article/abs/pii/S1077314223002229",
  },
  {
    image:
      "https://placehold.co/400x250/9370DB/FFF?text=LEMMS:+Label+Estimation...",
    title: "LEMMS: Label Estimation of Multi-feature Movie Segments",
    authors: ["Bartolomeo Vacchetti", "Dawit Mureja Argaw", "Tania Cequtelli"],
    conferenceOrJournal:
      "International Conference on Computer Vision Workshops (ICCVW)",
    year: 2023,
    pdfLink:
      "https://openaccess.thecvf.com/content/ICCV2023W/CVEU/papers/Vacchetti_LEMMS_Label_Estimation_of_Multi-Feature_Movie_Segments_ICCVW_2023_paper.pdf",
  },
  {
    image:
      "https://placehold.co/400x250/F08080/000?text=ResNet+or+DenseNet:...",
    title: "ResNet or DenseNet: Introducing Shortcuts to ResNet",
    authors: [
      "Chaoning Zhang",
      "Philipp Benz",
      "Dawit Mureja Argaw",
      "Seokju Lee",
      "Junsik Kim",
      "Francois Rameau",
      "Jean Charles Bazin",
      "In So Kweon",
    ],
    conferenceOrJournal:
      "IEEE/CVF Winter Conference on Applications of Computer Vision (WACV)",
    year: 2021,
    pdfLink:
      "https://openaccess.thecvf.com/content/WACV2021/papers/Zhang_ResNet_or_DenseNet_Introducing_Dense_Shortcuts_to_ResNet_WACV_2021_paper.pdf",
  },
  {
    image:
      "https://placehold.co/400x250/5F9EA0/FFF?text=DeePTZ:+Deep+Self-Calibration...",
    title: "DeePTZ: Deep Self-Calibration for PTZ Cameras",
    authors: [
      "Chaoning Zhang",
      "Francois Rameau",
      "Junsik Kim",
      "Dawit Mureja Argaw",
      "Jean Charles Bazin",
      "In So Kweon",
    ],
    conferenceOrJournal:
      "IEEE/CVF Winter Conference on Applications of Computer Vision (WACV)",
    year: 2020,
    pdfLink:
      "https://openaccess.thecvf.com/content_WACV_2020/papers/Zhang_DeepPTZ_Deep_Self-Calibration_for_PTZ_Cameras_WACV_2020_paper.pdf",
  },
  {
    image:
      "https://placehold.co/400x250/DDA0DD/000?text=Revisiting+Residual+Networks...",
    title: "Revisiting Residual Networks with Nonlinear Shortcuts",
    authors: [
      "Chaoning Zhang",
      "Francois Rameau",
      "Seokju Lee",
      "Junsik Kim",
      "Philipp Benz",
      "Dawit Mureja Argaw",
      "Jean Charles Bazin",
      "In So Kweon",
    ],
    conferenceOrJournal: "British Machine Vision Conference (BMVC)",
    year: 2019,
    pdfLink: "https://bmvc2019.org/wp-content/uploads/papers/0740-paper.pdf",
  },
  {
    image:
      "https://placehold.co/400x250/98FB98/000?text=Automatic+Spine+Segmentation...",
    title:
      "Automatic Spine Segmentation from CT Images Using Convolutional Neural Network via Redundant Generation of Class Labels",
    authors: ["Dawit Mureja Argaw", "Malinda Vania", "Deukhee Lee"],
    conferenceOrJournal:
      "Journal of Computational Design and Engineering (JCDE), Vol 6, Issue 2",
    year: 2019,
    pdfLink: "https://academic.oup.com/jcde/article/6/2/224/5732333",
  },
];

const awardsSeedData: Partial<IAward>[] = [
  {
    title: "Jang Young Sil Postdoctoral Fellowship",
    awardingBody: "KAIST",
    year: 2025,
  },
  {
    title: "Top Weights and Biases User (>800K hours tracked in 2024)",
    awardingBody: "Weights & Biases",
    year: 2024,
  },
  {
    title: "Top Reviewer Award",
    awardingBody:
      "Conference on Neural Information Processing Systems (NeurIPS)",
    year: 2023,
  },
  {
    title: "Outstanding Reviewer Award",
    awardingBody: "International Conference on Computer Vision (ICCV)",
    year: 2023,
  },
  {
    title: "Best Poster Award",
    awardingBody: '"What is Motion For?" (WiMF) Workshop at ECCV 2022',
    year: 2022,
  },
  {
    title: "ECCV Travel Grant",
    awardingBody: "European Conference on Computer Vision (ECCV)",
    year: 2022,
  },
  {
    title: "Outstanding Reviewer Award",
    awardingBody: "European Conference on Computer Vision (ECCV)",
    year: 2022,
  },
  {
    title: "CVPR Travel Grant",
    awardingBody:
      "Conference on Computer Vision and Pattern Recognition (CVPR)",
    year: 2022,
  },
  {
    title: "Finalist",
    awardingBody: "Qualcomm Innovation Fellowship Korea",
    year: 2021,
  },
  {
    title: "Magna Cum Laude",
    awardingBody: "KAIST Electrical Engineering Department",
    year: 2018,
  },
  {
    title:
      "Full Scholarship Recipient for B.S. and Integrated M.S./Ph.D. Program (2014-2024)",
    awardingBody: "KAIST",
    year: 2014,
  },
];

const workExperiencesSeedData: Partial<IExperience>[] = [
  {
    title: "Postdoctoral Researcher",
    organization: "Multimodal AI Lab, KAIST",
    location: "Daejeon, South Korea",
    startDate: "Mar 2025",
    endDate: "Present",
    description: [
      "Supported by the Jang Young Sil Fellowship, focusing on advanced research in multimodal AI.",
    ],
  },
  {
    title: "Research Intern",
    organization: "NVIDIA",
    location: "Santa Clara, CA, USA (Remote)",
    startDate: "Nov 2023",
    endDate: "Sep 2024",
    description: [
      "Developed novel methods for efficient video tokenization, delivering state-of-the-art results in quality, compression, and token efficiency.",
      "Contributions led to two U.S. patent filings, integration into NVIDIA’s Cosmos tokenizer, an ICLR 2025 publication, and an ICCV 2025 submission.",
    ],
  },
  {
    title: "Research Intern",
    organization: "Adobe",
    location: "San Jose, CA, USA",
    startDate: "May 2023",
    endDate: "Sep 2023",
    description: [
      "Engineered scalable video summarization dataset generation (250K+ synthetic pairs via LLMs) and developed a state-of-the-art autoregressive summarization model.",
      "Work resulted in a CVPR 2024 publication, a U.S. patent filing, and technology transfer within Adobe.",
    ],
  },
  {
    title: "Research Intern",
    organization: "KAUST",
    location: "Thuwal, Saudi Arabia (Remote)",
    startDate: "Nov 2022",
    endDate: "May 2023",
    description: [
      "Developed Trailer Generation Transformer (TGT), the first large-scale AI framework for automated movie trailer generation from full-length movies.",
      "Led to a first-author publication at CVPR 2024.",
    ],
  },
  {
    title: "Research Intern",
    organization: "Adobe",
    location: "San Jose, CA, USA (Remote)",
    startDate: "Aug 2021",
    endDate: "Nov 2021",
    description: [
      'Co-developed the "Anatomy of Video Editing" benchmark dataset (ECCV 2022 publication).',
      "Initiated a long-range multimodal pretraining strategy, foundational for a state-of-the-art model (23 tasks) and an ICCV 2023 first-author publication.",
    ],
  },
  {
    title: "Graduate Research Assistant",
    organization: "KAIST",
    location: "Daejeon, South Korea",
    startDate: "Aug 2018",
    endDate: "Feb 2025",
    description: [
      "Conducted Ph.D. research on deep learning for long-form video understanding and generative modeling.",
      "Key Accomplishments: First-authored 10+ publications at top-tier venues (CVPR, ICLR, ICCV, ECCV, AAAI, WACV); Presented research at major international conferences; Received multiple Outstanding Reviewer Awards (NeurIPS, ICCV, ECCV).",
    ],
  },
];

const educationSeedData: Partial<IEducation>[] = [
  {
    degree: "Ph.D. in Electrical Engineering",
    university: "KAIST",
    location: "Daejeon, South Korea",
    startDate: "Aug 2018",
    endDate: "Feb 2025",
    thesis: "Deep Long-form Video Understanding",
    advisors: [
      "Prof. Joon Son Chung (2023–2025)",
      "Prof. In So Kweon (2018–2023)",
    ],
  },
  {
    degree: "B.S. in Electrical Engineering",
    university: "KAIST",
    location: "Daejeon, South Korea",
    startDate: "Sep 2014",
    endDate: "Aug 2018",
    gpa: "3.9 / 4.3 (Magna Cum Laude)",
  },
];

const serviceSeedData: Partial<IService>[] = [
  {
    category: "Journal Reviewer",
    details: [
      {
        item: "Transactions on Pattern Analysis and Machine Intelligence (TPAMI)",
      },
    ],
  },
  {
    category: "Conference Reviewer",
    details: [
      {
        item: "Machine Learning: ICML (2024-2025), ICLR (2024-2025), NeurIPS (2023-2025)",
      },
      {
        item: "Computer Vision: CVPR (2022-2025), ICCV (2021, 2023, 2025), ECCV (2022, 2024)",
      },
    ],
  },
  {
    category: "Student Volunteer",
    details: [{ item: "ICLR (2020), ICML (2020), NeurIPS (2020)" }],
  },
];

async function seedDatabase() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error("Error: MONGO_URI is not defined in environment variables.");
    console.error(
      "Please ensure your .env file exists and contains MONGO_URI."
    );
    process.exit(1);
  }

  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(mongoUri);
    console.log("MongoDB Atlas connected successfully for seeding!");

    // Clearing existing data for all collections
    await News.deleteMany({});
    await Publication.deleteMany({});
    await Award.deleteMany({});
    await Experience.deleteMany({});
    await Education.deleteMany({});
    await Service.deleteMany({});

    // Inserting new data for all collections
    await News.insertMany(newsSeedData);
    await Publication.insertMany(publicationsSeedData);
    await Award.insertMany(awardsSeedData);
    await Experience.insertMany(workExperiencesSeedData);
    await Education.insertMany(educationSeedData);
    await Service.insertMany(serviceSeedData);

    console.log("Database seeding complete.");
  } catch (error: any) {
    if (error.code === 11000) {
      console.error(
        "Seeding error: Duplicate key error. This typically means there's a unique constraint violated in your data or schema."
      );
      console.error(
        "The error details above indicate the specific field (e.g., 'title') that caused it."
      );
    } else {
      console.error(`Error during seeding: ${error.message}`);
    }
    console.error("Full error details:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
}

seedDatabase();
