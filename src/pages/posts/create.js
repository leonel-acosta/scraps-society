import CreateForm from "@/components/CycleForm";
import Header from "@/components/Header";
import PageTitle from "@/components/PageTitle";
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
      router.push("../posts");
    } else {
      console.error("Failed to add post");
    }
  }

  return (
    <>
      <Header />
      <PageTitle text={"Create new cycle"} />
      <div className="bg-secondary p-5 rounded-lg m-5 w-1/2">
        <CreateForm onSubmit={createPost} />
      </div>
    </>
  );
}
