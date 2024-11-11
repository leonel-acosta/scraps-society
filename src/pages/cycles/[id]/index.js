import { useRouter } from "next/router";
import useSWR from "swr";
import Button from "@/components/Button";

export default function CyclePage() {
  const router = useRouter();
  const { id } = router.query;

  const { isReady } = router;

  const { data, isLoading, error, mutate } = useSWR(`/api/posts/${id}`);
  const post = data;
  console.log(post);
  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  async function deletePost() {
    console.log("delete");
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
    router.push("/");
  }

  return (
    <>
      <p>Under Construction</p>
      <Button onClick={deletePost} text="delete"></Button>
    </>
  );
}
