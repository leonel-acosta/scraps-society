/* import dbConnect from "@/db/connect";
import User from "@/db/models/User";

export async function POST(request) {
  const { name, email } = await request.json();
  await dbConnect();
  await User.create({ name, email });
  return NextResponse.json({ message: "User Registered" }, { status: 201 });
}
 */
