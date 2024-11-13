import CreateForm from "@/components/CycleForm";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function CreateFormPage() {
  const router = useRouter();
  const { mutate } = useSWR("../api/posts");

  async function createPost(post) {
    // Aca vamos a subir a BD -> ya tednriamos que tener todo la info.
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
      router.push("../cycles");
    } else {
      console.error("Failed to add post");
    }
  }

  return (
    <>
      <div className="flex flex-column justify-center"></div>
      <h2>Create new cycle</h2>
      <div className="bg-secondary p-5 rounded-lg m-5 w-1/2">
        <CreateForm onSubmit={createPost} />
      </div>
    </>
  );
}
