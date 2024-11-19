import Link from "next/link";

export default function NavBar() {
  return (
    <div className="md:flex flex-row gap-5 items-center justify-center uppercase basis-1/4 hidden">
      <Link href={"/"}>Home</Link>
      <Link href={"/posts"}>Find</Link>
      <Link href={"/posts/create"}>Create Cycle</Link>
    </div>
  );
}
