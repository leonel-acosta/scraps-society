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
  const { id: username } = request.query;

  if (request.method === "GET") {
    const user = await User.findOne({ username });

    if (!user) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(user);
  }

  if (request.method === "POST") {
    try {
      const userData = request.body;
      const newUser = new User({ username, ...userData });
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
      const updatedUser = await User.findOneAndUpdate(
        { username },
        updatedData,
        {
          new: true,
        }
      );

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

  if (request.method === "DELETE") {
    try {
      const deletedUser = await User.findOneAndDelete({ username });
      if (!deletedUser) {
        return response.status(404).json({ status: "Not Found" });
      }
      return response
        .status(200)
        .json({ status: `User ${username} successfully deleted.` });
    } catch (error) {
      console.error("Error deleting user:", error);
      return response
        .status(500)
        .json({ error: "Internal server error deleting user" });
    }
  }
}
