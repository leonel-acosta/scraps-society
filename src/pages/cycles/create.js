import CreateForm from "@/components/CycleForm";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function CreateFormPage() {
  const router = useRouter();
  const { mutate } = useSWR("../api/posts");

  async function createPost(post) {
    const response = await fetch("../api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    if (response.ok) {
      mutate();
      console.log("New post created:", post);
      router.push("./cycles");
    } else {
      console.error("Failed to add user");
    }
  }

  return (
    <>
      <h2>Create new cycle</h2>
      <CreateForm onSubmit={createPost} />
    </>
  );
}
