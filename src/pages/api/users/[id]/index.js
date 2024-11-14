import dbConnect from "@/db/connect";
import User from "@/db/models/User";

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
    const user = await User.findById(id);

    if (!user) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(user);
  }

  if (request.method === "POST") {
    try {
      const user = await User.findById(id);
      await user.save();

      return response.status(201).json({ status: "User created" });
    } catch (error) {
      console.error("Error in user-id");
      return response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "PATCH") {
    try {
      const updatedData = request.body;
      console.log(updatedData);
      const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
        new: true,
      });

      if (!updatedUser) {
        return response.status(404).json({ status: "Not Found" });
      }

      return response.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      return response
        .status(500)
        .json({ error: "Internal server error updating user" });
    }
  }
}
