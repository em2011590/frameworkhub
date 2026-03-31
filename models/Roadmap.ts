import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRoadmap extends Document {
  title: string;
  userId?: string;
  frameworks: Array<{ slug: string; estimatedWeeks: number; order: number }>;
  milestones: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RoadmapSchema = new Schema<IRoadmap>(
  {
    title: { type: String, required: true },
    userId: String,
    frameworks: [
      {
        slug: String,
        estimatedWeeks: { type: Number, default: 4 },
        order: { type: Number, default: 0 },
      },
    ],
    milestones: [String],
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    isPublic: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Roadmap: Model<IRoadmap> =
  mongoose.models.Roadmap || mongoose.model<IRoadmap>("Roadmap", RoadmapSchema);
export default Roadmap;
