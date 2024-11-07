import dbConnect from "@/db/connect";
import Post from "@/db/models/Post";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const posts = await Post.find();
    return response.status(200).json(posts);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
