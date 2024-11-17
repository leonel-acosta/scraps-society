// api/posts/[id]/wishlist.js
import Post from "@/models/Post";
import dbConnect from "@/utils/dbConnect";

export default async function handler(request, response) {
  const { id } = request.query;
  const { userId } = request.body;

  // Ensure userId is passed in the request body
  if (!userId) {
    return response.status(400).json({ error: "User ID is required" });
  }

  await dbConnect();

  if (request.method === "PATCH") {
    try {
      const post = await Post.findById(id);

      if (!post) {
        return response.status(404).json({ status: "Post not found" });
      }

      // If post is found, ensure 'created_by' is included and handle wishlist toggle
      const isInWishlist = post.wishlist.includes(userId);
      const updatedWishlist = isInWishlist
        ? post.wishlist.filter((user) => user !== userId) // Remove user
        : [...post.wishlist, userId]; // Add user

      // Assign 'created_by' back to the post to pass validation
      post.wishlist = updatedWishlist;
      post.created_by = post.created_by; // Ensure 'created_by' is set

      // Save updated post
      await post.save();

      return response.status(200).json(post);
    } catch (error) {
      console.error("Error updating wishlist:", error);
      return response
        .status(500)
        .json({ error: "Internal server error updating wishlist" });
    }
  } else {
    return response.status(405).json({ message: "Method Not Allowed" });
  }
}
