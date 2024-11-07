import dbConnect from "@/db/connect";
import Post from "@/db/models/Post";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  /*   if (request.method === "GET") {
    const post = await Post.findById(id);

    if (!post) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(post);
  } */
}
