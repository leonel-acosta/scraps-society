import dbConnect from "@/db/connect";
import User from "@/db/models/User";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const users = await User.find();
    return response.status(200).json(users);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
