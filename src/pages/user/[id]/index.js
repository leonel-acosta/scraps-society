import Button from "@/components/Button";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import UpdateForm from "@/components/ProfileForm";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Wishlist from "@/components/Wishlist";
import Header from "@/components/Header";
import PageTitle from "@/components/PageTitle";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function UserProfile() {
  const { status: sessionStatus, data: session } = useSession();

  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(
    id ? `/api/users/${id}` : null,
    id ? fetcher : null
  );
  const user = data;

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  async function updateUser(updatedProfile) {
    const response = await fetch(`../api/users/${user.username}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProfile),
    });

    if (response.ok) {
      mutate();
      console.log("User Profile Updated:");
    } else {
      console.error("Failed to update user profile");
    }
  }

  async function deleteUser() {
    const confirmDelete = window.confirm(
      "Do you want to delete your user information permanentely?"
    );
    if (confirmDelete) {
      console.log("delete");
      await fetch(`/api/users/${user.username}`, {
        method: "DELETE",
      });
      router.push("/");
    }
  }
  console.log("user loaded:", user._id, user.username);

  if (session && session.user.id === user._id) {
    return (
      <>
        <Header />
        <PageTitle text={"Profile"} />
        <section>
          <section className="flex flex-row">
            <div>
              {" "}
              <Image
                src={user.profile_picture}
                alt={user.username}
                width={300}
                height={300}
              ></Image>
            </div>
            <div>
              <h2>{user.name}</h2>
              <h5>
                {user.city}, {user.country}
              </h5>
              <h3>Contact info:</h3>
              <p>
                phone: {user.phone} | Email: {user.email}
              </p>
              <h3>About</h3>
              <p>{user.description}</p>
            </div>
          </section>
          <section>
            {" "}
            <Wishlist />
          </section>
          <section></section>
          <UpdateForm onSubmit={updateUser} defaultData={user} />

          <Button text="delete user" onClick={deleteUser} />
        </section>
      </>
    );
  } else {
    return (
      <div>
        <h2>{user.name}</h2>
        <h3>
          {user.city}, {user.country}
        </h3>
        <h3>Contact info:</h3>
        <p>
          phone: {user.phone} | Email: {user.email}
        </p>
        <h3>About</h3>
        <p>{user.description}</p>
      </div>
    );
  }
}
