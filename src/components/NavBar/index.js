import Link from "next/link";

export default function NavBar() {
  return (
    <div className="hidden md:flex flex-row gap-5 items-center justify-center uppercase">
      <Link href={"/posts"}>Find</Link>
      <Link href={"/posts/create"}>Post</Link>
    </div>
  );
}
