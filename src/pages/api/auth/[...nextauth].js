import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });

      session.user.id = sessionUser._id;

      return session;
    },

    async signIn({ profile }) {
      console.log(profile);
      try {
        await dbConnect();
        const userExist = await User.findOne({ email: profile.email });
        if (!userExist) {
          const user = await User.create({
            email: profile.email,
            name: profile.name,
            username: profile.name.split(" ").join("-").toLowerCase(),
            image: profile.avatar_url || profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);
