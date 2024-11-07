import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  family_name: { type: String, required: true },
  presentation: { type: String },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
