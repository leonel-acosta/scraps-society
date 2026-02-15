import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
  title: { type: String, required: true },
  cycle_type: { type: String, required: true },
  created_by: { type: String },
  category: { type: String, required: true },
  status: { type: String, required: true, default: "available" },
  quantity: { type: Number },
  details: { type: String },
  requested_by: { type: String },
  unit: { type: String },
  deadline: { type: String },
  image_url: { type: String },
  address: { type: String },
  zipcode: { type: Number },
  city: { type: String },
  full_address: { type: String },
  lngLat: {
    type: [Number],
    validate: {
      validator: (arr) => arr.length === 2,
      message: "lngLat must be an array of two numbers: [longitude, latitude]",
    },
  },
  country: { type: String },
  wishlist: [{ type: String }],
});

const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);

export default Post;
