import dbConnect from "@/db/connect";
import Post from "@/db/models/Post";
import formidable from "formidable";
import cloudinary from "cloudinary";

export default async function handler(request, response) {
  try {
    await dbConnect();
    console.log("Database connected");
  } catch (error) {
    console.log("Database not connected");
    return response.satus(500).json({ error: "Database connection failed" });
  }

  if (request.method == "POST") {
    try {
      const postData = request.body;
      await Post.create(postData);
      response.status(201).json({ status: "New post created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "GET") {
    const posts = await Post.find();
    return response.status(200).json(posts);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
