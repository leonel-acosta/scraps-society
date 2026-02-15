import dbConnect from "@/db/connect";
import Post from "@/db/models/Post";

export default async function handler(request, response) {
  try {
    await dbConnect();
    console.log("Database connected");
  } catch (error) {
    console.log("Database not connected");
    return response.status(500).json({ error: "Database connection failed" });
  }
  const { id } = request.query;

  if (request.method === "GET") {
    const post = await Post.findById(id);

    if (!post) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(post);
  }

  if (request.method === "POST") {
    try {
      const post = await Post.findById(id);
      await post.save();
      return response.status(201).json({ status: "Post created" });
    } catch (error) {
      console.error("Error in post-id");
      return response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "PATCH") {
    try {
      const updatedData = request.body;
      const updatedPost = await Post.findByIdAndUpdate(id, updatedData, {
        new: true,
      });

      if (!updatedPost) {
        return response.status(404).json({ status: "Not Found" });
      }

      return response.status(200).json(updatedPost);
    } catch (error) {
      console.error("Error updating post:", error);
      return response
        .status(500)
        .json({ error: "Internal server error updating post" });
    }
  }

  if (request.method === "DELETE") {
    await Post.findByIdAndDelete(id);
    response.status(200).json({ status: `Post ${id} successfully deleted.` });
  }
}
