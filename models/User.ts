import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  avatar?: string;
  savedFrameworks: string[];
  completedRoadmaps: string[];
  recentlyViewed: string[];
  level: "junior" | "mid" | "senior";
  preferences: {
    languages: string[];
    categories: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: String,
    savedFrameworks: [String],
    completedRoadmaps: [String],
    recentlyViewed: [String],
    level: { type: String, enum: ["junior", "mid", "senior"], default: "junior" },
    preferences: {
      languages: [String],
      categories: [String],
    },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
