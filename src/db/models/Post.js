import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
  title: { type: String, required: true },
  cycle_type: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: String },
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
