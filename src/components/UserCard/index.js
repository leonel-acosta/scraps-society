import Image from "next/image";
import styles from "./UserCard.module.css";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function UserCard({ user, type }) {
  const { data, error } = useSWR(
    user ? `/api/users/${user}` : null,
    user ? fetcher : null
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const { username, name, image } = data;

  return (
    <>
      <div className="rounded-lg bg-primary p-5 text-center w-fit md:w-1/2 border-2">
        <span>{type === "giveaway" ? "Given by" : "Collected by"}</span>
        <Link href={`/user/${user}`}>
          <div className="flex flex-row justify-center gap-5 py-5 items-center ">
            <Image
              src={image}
              width={50}
              height={50}
              className="rounded-full"
              alt={name}
            />
            <h5>{name}</h5>
          </div>
        </Link>
      </div>
    </>
  );
}
