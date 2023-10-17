import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: Buffer,
  salt: Buffer,
  createdDate: Date,
});

export default mongoose.model("User", userSchema);
