import dbConnect from "@/db/connect";
import User from "@/db/models/User";

export default async function handler(request, response) {
  try {
    await dbConnect();
    console.log("Database connected");
  } catch (error) {
    console.log("Database not connected");
    return response.status(500).json({ error: "Database connection failed" });
  }

  if (request.method == "POST") {
    try {
      const userData = request.body;
      await User.create(userData);
      response.status(201).json({ status: "New user created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "GET") {
    const users = await User.find();
    return response.status(200).json(users);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
