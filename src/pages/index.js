import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="gap-2 flex flex-col justify-center text-center py-10">
        <Link href="/api/users">USERS API</Link>
        <Link href="/api/posts">posts API</Link>
        <Link href="/posts">CYCLES </Link>
        <Link href="/posts/create">CREATE CYCLE </Link>
        <Link href="/user/update-profile">USER UPDATE </Link>
      </div>
    </>
  );
}
