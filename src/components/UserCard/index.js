import Image from "next/image";
import styles from "./UserCard.module.css";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function UserCard({ user }) {
  const { data, error } = useSWR(
    user ? `/api/users/${user}` : null,
    user ? fetcher : null
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const { username, name, image } = data;

  return (
    <>
      <div className="rounded-lg bg-primary p-5 text-center w-1/2">
        <Link href={`/user/${username}`}>
          <span>given by</span>
          <div className="flex flex-col justify-center gap-5 py-5">
            <Image
              src={image}
              width={60}
              height={60}
              className="rounded-full"
              alt={name}
            />

            <h4>{name}</h4>
          </div>
        </Link>
      </div>
    </>
  );
}
