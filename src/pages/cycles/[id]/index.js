import { useRouter } from "next/router";
import useSWR from "swr";
import Button from "@/components/Button";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CyclePage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(
    id ? `/api/posts/${id}` : null,
    id ? fetcher : null
  );
  const post = data;
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  async function deletePost() {
    console.log("delete");
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
    router.push("/");
  }

  return (
    <>
      <p>{post.title}</p>
      <Button onClick={deletePost} text="delete"></Button>
    </>
  );
}
