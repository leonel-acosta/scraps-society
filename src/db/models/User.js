import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  family_name: { type: String },
  short_description: { type: String },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
