import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const { Schema } = mongoose;

const listingSchema = new Schema({
  title: String,
  user: ObjectId,
  location: String,
  type: String,
  quantity: Number,
  unit: String,
  date: { type: Date, default: Date.now },
  image: Buffer,
});

export default mongoose.model("Listing", listingSchema);
