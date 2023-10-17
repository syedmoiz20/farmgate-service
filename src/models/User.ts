import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  createdDate: { type: Date, default: Date.now },
  image: Buffer,
});

export default mongoose.model("User", userSchema);
