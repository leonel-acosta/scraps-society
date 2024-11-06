import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    display_name: {
      type: String,
      default: "Purr",
    },
    name: {
      type: String,
      required: true,
    },
    family_name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
    },
    user_type: {
      type: String,
      enum: ["person", "organisation", "business"],
      required: true,
    },
    activity_field: [
      {
        type: String,
      },
    ],
    short_description: {
      type: String,
      default: "Carpenter & Artisan",
    },
    introduction: {
      type: String,
      default: "Lorem ipsum",
    },
    contact_information: {
      email_address: {
        type: String,
        required: true,
        match: /.+\@.+\..+/, // Simple regex for email format
      },
      phone: {
        type: String,
      },
      address: {
        type: String,
      },
      zip_code: {
        type: String,
      },
      city: {
        type: String,
      },
      country: {
        type: String,
      },
    },
    profile_picture: {
      type: String,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", // Reference to Post model
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", // Reference to Post model
      },
    ],
    reservation_requests: [
      {
        post_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
