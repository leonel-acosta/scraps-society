import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId, // Unique identifier for each post
    posted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type_of_cycle: {
      type: String,
      enum: ["collect", "give"],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    collection_deadline: {
      type: Date,
    },
    additional_info_1: {
      type: String,
    },
    additional_info_2: {
      type: String,
    },
    additional_info_3: {
      type: String,
    },
    frequency: {
      type: String,
      enum: ["one-time", "recurrent"],
      required: true,
    },
    tags: [
      {
        type: Number,
      },
    ],
    pictures: [
      {
        type: String, // URLs for images
      },
    ],
    location: {
      address: {
        type: String,
        required: true,
      },
      address_additional_info: {
        type: String,
      },
      zipcode: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["draft", "available", "reserved", "closed"],
      required: true,
    },
    reserved_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
    },
    wishlisted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to User model
      },
    ],
    collect: {
      purpose: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("post", postSchema);

export default Post;
