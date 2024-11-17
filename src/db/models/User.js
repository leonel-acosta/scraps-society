import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String },
    username: { type: String },
    password: { type: String },
    description: { type: String },
    profile_picture: { type: String },
    phone: { type: String },
    city: { type: String },
    country: { type: String },
    zipcode: { type: String },
    wishlist: { type: [String], default: [] },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
