import { useSession } from "next-auth/react";
import Link from "next/link";
import Tag from "../Badge";

export default function NavBar({ mobile, desktop }) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div
        className={`${
          desktop ? "hidden" : ""
        } flex md:flex flex-row gap-5 items-center justify-center uppercase`}
      >
        <Link href={"/posts"}>Find</Link>
        <Link href={"/posts/create"}>Post</Link>
      </div>
    );
  } else {
    return (
      <div
        className={`${
          desktop ? "hidden" : ""
        } flex md:flex flex-row gap-5 items-center justify-center uppercase`}
      >
        {" "}
        <Link href={"/posts"}>Find</Link>
        <Link href={"/posts/create"}>Post</Link>
        <Link href={`/user/${session.user.username}`}>
          <span className="bg-accent p-2 rounded-lg primary">Dashboard</span>
        </Link>
      </div>
    );
  }
}
