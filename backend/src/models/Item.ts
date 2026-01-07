// backend/src/models/Item.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IItemDocument extends Document {
  name: string;
  bought: boolean;
  createdAt: Date;
}

const ItemSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  bought: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IItemDocument>("Item", ItemSchema);
