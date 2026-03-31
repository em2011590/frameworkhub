import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  framework: mongoose.Types.ObjectId;
  rating: number;
  body: string;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    framework: { type: Schema.Types.ObjectId, ref: "Framework", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
export default Review;
