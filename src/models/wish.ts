import mongoose, { Schema, type Document } from "mongoose";

export interface IWish extends Document {
  name: string;
  messWish: string;
  createdAt: Date;
}

const wishSchema = new Schema<IWish>({
  name: { type: String, require: true },
  messWish: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IWish>('Wish', wishSchema)
