import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import Button from "@/components/Button";
import TransactionForm from "@/components/TransactionForm";
import Image from "next/image";
import { useSession } from "next-auth/react";
import UserCard from "@/components/UserCard";
import Badge from "@/components/Badge";
import Tag from "@/components/Tag";
import WishlistButton from "@/components/WishlistButton";
import Header from "@/components/Header";
import PageTitle from "@/components/PageTitle";
import PostMap from "@/components/PostMap";
import Post from "@/db/models/Post";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function PostPage() {
  const { status: sessionStatus, data: session } = useSession();

  const router = useRouter();
  const { id } = router.query;
  const { data, error, mutate } = useSWR(
    id ? `/api/posts/${id}` : null,
    id ? fetcher : null
  );
  const post = data;
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  async function editPost(updatedPost) {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      });

      if (response.ok) {
        console.log("Post successfully updated");
        mutate(`/api/posts/${id}`);
      } else {
        console.error("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  }

  async function onToggleWishlist(wishlist) {
    try {
      const response = await fetch(`/api/posts/${id}/wishlist`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wishlist }),
      });

      if (response.ok) {
        console.log("Post successfully updated");
        mutate(`/api/posts/${id}`);
      } else {
        console.error("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  }
  console.log("Post", post);

  async function deletePost() {
    const confirmDelete = window.confirm(
      "Do you want to delete your post permanentely?"
    );
    if (confirmDelete) {
      console.log("delete");
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      router.push("/posts");
      console.log("Post", post.id, "succesfully deleted");
    }
  }
  return (
    <>
      <section className="flex flex-col justify-center items-center">
        <div className="flex flex-col lg:flex-row gap-1 lg:gap-10 items-center w-full lg:w-3/4 p-5 m-5 lg:m-5 bg-secondary rounded-lg">
          <div className="md:w-2/4 relative">
            <Badge cycle_type={post.cycle_type} text={post.cycle_type} />
            <Image
              src={post.image_url}
              width={600}
              height={600}
              alt={post.title}
              sizes="600px"
              style={{
                width: "600px",
                height: "600px",
                objectFit: "cover",
              }}
              className="rounded-lg text-center"
            />
          </div>
          <div className="md:w-2/4 flex flex-col py-5 gap-2 relative">
            <div className="grid grid-flow-col justify-between items-center">
              <Tag text={post.status} />
              {session && session.user.id !== post.created_by ? (
                <WishlistButton onClick={onToggleWishlist} post={post} />
              ) : (
                ""
              )}
            </div>
            <h2 className="uppercase mb-2">{post.title}</h2>
            <h5>
              {post.address},{post.zipcode}, {post.city} | {post.country}
            </h5>
            <ul>
              <li>Category: {post.category}</li>
              <li>
                Quantity: {post.quantity} {post.unit}
              </li>
              <li>Available until: {post.deadline}</li>
            </ul>

            <UserCard
              user={post.created_by}
              status={post.status}
              type={post.cycle_type}
            />
            <div className="flex flex-row flex-wrap"></div>
            <TransactionForm post={post} onClick={editPost} />
            {session && session.user.username === post.created_by ? (
              <Button onClick={deletePost} text="delete" />
            ) : (
              ""
            )}
          </div>
        </div>
        <section className="flex flex-col gap-5 lg:gap-10 justify-center w-full lg:w-3/4 p-10 m-5 lg:m-5 bg-secondary rounded-lg">
          <h3>Description</h3>
          <p className="text-justify">{post.details}</p>
        </section>
        <section className="flex flex-col gap-5 lg:gap-10 justify-center w-full lg:w-3/4 p-10 m-5 lg:m-5 bg-secondary rounded-lg">
          <h3>Location</h3>
          {post.lngLat && post.lngLat.length === 2 ? (
            <PostMap post={post} />
          ) : (
            ""
          )}
        </section>
      </section>
    </>
  );
}
