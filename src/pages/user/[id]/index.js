import Button from "@/components/Button";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import UpdateForm from "@/components/ProfileForm";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Wishlist from "@/components/Wishlist";
import Header from "@/components/Header";
import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import UserPostsList from "@/components/UserPostsList";

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

  if (session && session.user.id === user._id) {
    return (
      <>
        <Header />
        <PageTitle text={`${user.name}'s profile`} />
        <section className="m-0 flex flex-col xl:flex-row">
          <div className="bg-tertiary primary p-10 hidden xl:block left-0 md:h-auto lg:w-60">
            <h4>Dashboard</h4>
            <hr className="my-3" />
            <ul>
              <li>
                <Link href={"#profile"}>Profile</Link>
              </li>
              <li>
                <Link href={"#cycles"}>Cycles</Link>
              </li>
              <li>
                <Link href={"#wishlist"}>Wishlist</Link>
              </li>
              <li>
                <Link href={"#settings"}>Settings</Link>
              </li>
            </ul>
          </div>
          <div className="md:w-4/5 mt-2 lg:p-10 lg:mx-auto flex flex-col flex-wrap md:gap-10 content-center justify-center">
            <div
              className="rounded-lg bg-primary lg:p-10 flex flex-col xl:flex-row gap-10 p-10 w-10/12 lg:w-1/2 justify-center mb-5 items-start"
              id="profile"
            >
              <Image
                src={user.image}
                alt={user.name}
                width={300}
                height={300}
                className="rounded-full lg:w-1/3"
              />

              <div>
                <h3>{user.name}</h3>
                <h5>
                  {user.city}, {user.country}
                </h5>
                <h5>About</h5>
                <p>{user.description}</p>
                <br />
                <h5>Contact info:</h5>
                <span>
                  phone: {user.phone} | Email: {user.email}
                </span>
                <br />
              </div>
            </div>
            <div
              className="rounded-lg bg-primary py-5 lg:p-10 flex flex-col md:flex-row gap-10 w-10/12 lg:w-1/2 justify-center mb-5 items-center"
              id="cycles"
            >
              <UserPostsList user={user._id} />
            </div>
            <div
              className="rounded-lg bg-primary py-5 lg:p-10 flex flex-col md:flex-row gap-10 w-10/12 lg:w-1/2 justify-center mb-5 items-center"
              id="wishlist"
            >
              <Wishlist user={user._id} />
            </div>
            <div
              className="rounded-lg bg-primary p-5 lg:p-10 flex flex-col md:flex-col gap-10 w-10/12 lg:w-1/2 justify-between mb-5"
              id="settings"
            >
              <h3>Settings</h3>
              <UpdateForm onSubmit={updateUser} defaultData={user} />
              <hr />
              <h3 className="mb-0 p-0">Delete Account</h3>
              <Button text="delete user" onClick={deleteUser} />
            </div>
          </div>
        </section>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <PageTitle text={`${user.name}'s profile`} />
        <section className="m-0 flex flex-col xl:flex-row">
          <div className="w-4/5 py-5 lg:p-10 lg:mx-auto flex flex-col flex-wrap gap-10 content-center justify-center">
            <div
              className="rounded-lg bg-primary py-5 lg:p-10 flex flex-col md:flex-row gap-10 w-10/12 lg:w-1/2 justify-center mb-5 items-center"
              id="profile"
            >
              <Image
                src={user.image}
                alt={user.name}
                width={300}
                height={300}
                className="rounded-full"
              />

              <div>
                <h3>{user.name}</h3>
                <h4>
                  {user.city}, {user.country}
                </h4>
                <h5>About</h5>
                <p>{user.description}</p>
                <br />
                <h5>Contact info:</h5>
                <span>
                  phone: {user.phone} | Email: {user.email}
                </span>
                <br />
              </div>
            </div>
            <div
              className="rounded-lg bg-primary py-5 md:p-10 flex flex-col md:flex-row gap-10 w-10/12 lg:w-1/2 justify-center mb-5 items-center"
              id="cycles"
            >
              <UserPostsList user={user._id} />
            </div>
            <div
              className="rounded-lg bg-primary py-5 lg:p-10 flex flex-col md:flex-row gap-10 w-10/12 lg:w-1/2 justify-center mb-5 items-center"
              id="wishlist"
            >
              <Wishlist user={user._id} />
            </div>
          </div>
        </section>
      </>
    );
  }
}
