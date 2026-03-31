import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICodeSnippet {
  title: string;
  language: string;
  code: string;
}

export interface ISetupStep {
  step: number;
  explanation: string;
  command?: string;
}

export interface IFramework extends Document {
  name: string;
  slug: string;
  category: "frontend" | "backend" | "fullstack" | "mobile" | "css" | "testing" | "devops";
  logo: string;
  color: string;
  description: string;
  longDescription: string;
  level: ("junior" | "mid" | "senior")[];
  tags: string[];
  language: string;
  stars: number;
  weeklyDownloads: number;
  releaseYear: number;
  pros: string[];
  cons: string[];
  useCases: string[];
  officialDocs: string;
  githubUrl: string;
  codeSnippets: ICodeSnippet[];
  setupSteps: ISetupStep[];
  relatedFrameworks: string[];
  reviews: mongoose.Types.ObjectId[];
  performance: number;
  learningCurve: number;
  ecosystem: number;
  jobMarket: number;
  createdAt: Date;
  updatedAt: Date;
}

const CodeSnippetSchema = new Schema<ICodeSnippet>({
  title: String,
  language: String,
  code: String,
});

const SetupStepSchema = new Schema<ISetupStep>({
  step: Number,
  explanation: String,
  command: String,
});

const FrameworkSchema = new Schema<IFramework>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: {
      type: String,
      enum: ["frontend", "backend", "fullstack", "mobile", "css", "testing", "devops"],
      required: true,
    },
    logo: { type: String, default: "" },
    color: { type: String, default: "#6366f1" },
    description: { type: String, required: true },
    longDescription: { type: String, default: "" },
    level: [{ type: String, enum: ["junior", "mid", "senior"] }],
    tags: [String],
    language: { type: String, default: "JavaScript" },
    stars: { type: Number, default: 0 },
    weeklyDownloads: { type: Number, default: 0 },
    releaseYear: { type: Number, default: 2020 },
    pros: [String],
    cons: [String],
    useCases: [String],
    officialDocs: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    codeSnippets: [CodeSnippetSchema],
    setupSteps: [SetupStepSchema],
    relatedFrameworks: [String],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    performance: { type: Number, min: 0, max: 100, default: 80 },
    learningCurve: { type: Number, min: 0, max: 100, default: 50 },
    ecosystem: { type: Number, min: 0, max: 100, default: 70 },
    jobMarket: { type: Number, min: 0, max: 100, default: 70 },
  },
  { timestamps: true }
);

const Framework: Model<IFramework> =
  mongoose.models.Framework || mongoose.model<IFramework>("Framework", FrameworkSchema);

export default Framework;
