import dbConnect from "@/db/connect";
import Post from "@/db/models/Post";

export default async function handler(request, response) {
  try {
    await dbConnect();
    console.log("Database connected");
  } catch (error) {
    console.log("Database not connected");
    return response.satus(500).json({ error: "Database connection failed" });
  }
  const { id } = request.query;

  if (request.method === "GET") {
    const post = await Post.findById(id);

    if (!post) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(post);
  }

  if (request.method === "PATCH") {
    try {
      const updatedData = request.body;
      const post = await Post.findById(id);

      if (!post) {
        return response.status(404).json({ status: "Post Not Found" });
      }

      if (!post.wishlist) {
        post.wishlist = [];
      }

      const onWishlist = post.wishlist.some(
        (item) => JSON.stringify(item) === JSON.stringify(updatedData.wishlist)
      );

      if (!onWishlist) {
        post.wishlist.push(updatedData.wishlist);
      }

      if (onWishlist) {
        post.wishlist.pop(updatedData.wishlist);
      }
      await post.save();

      return response.status(200).json(post);
    } catch (error) {
      console.error("Error updating post:", error);
      return response
        .status(500)
        .json({ error: "Internal server error updating post" });
    }
  }
}
