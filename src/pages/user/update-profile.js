import UpdateForm from "@/components/ProfileForm";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function UpdateProfilePage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: user, isLoading, error, mutate } = useSWR(`../api/users/${id}`);
  console.log({ user });

  async function updateUser(updatedProfile) {
    const response = await fetch(`../api/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProfile),
    });

    if (response.ok) {
      mutate();
      console.log("User Profile Updated:");
      router.push(`./users/${id}`);
    } else {
      console.error("Failed to update user profile");
    }
  }

  return (
    <>
      <h2>Update your profile</h2>
      <UpdateForm onSubmit={updateUser} defaultData={user} />
    </>
  );
}
