import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function UserProfile() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(
    id ? `/api/users/${id}` : null,
    id ? fetcher : null
  );
  const user = data;
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  async function deletePost() {
    console.log("delete");
    await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });
    router.push("/");
  }

  return <p>{user.username}</p>;
}
