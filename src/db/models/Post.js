import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
  title: { type: String, required: true },
  cycle_type: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: String },
  unit: { type: String },
  pickup_deadline: { type: String },
  image_url: { type: String },
  address: { type: String },
  zipcode: { type: Number },
  city: { type: String },
  country: { type: String },
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
