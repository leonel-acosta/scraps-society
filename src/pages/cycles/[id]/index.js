import { useRouter } from "next/router";
import useSWR from "swr";
import Button from "@/components/Button";
import TransactionForm from "@/components/TransactionForm";
import Image from "next/image";
import { useSession } from "next-auth/react";
import UserCard from "@/components/UserCard";
import WishlistButton from "@/components/WishlistButton";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CyclePage() {
  const { status: sessionStatus, data: session } = useSession();

  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(
    id ? `/api/posts/${id}` : null,
    id ? fetcher : null
  );
  const post = data;
  console.log("Post info", post);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  async function editPost(updatedPost) {
    console.log("updatedPost", updatedPost);
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
      } else {
        console.error("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  }

  async function onToggleWishlist(wishlist) {
    console.log("userId toggle", wishlist);
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wishlist }),
      });

      if (response.ok) {
        console.log("Post successfully updated");
      } else {
        console.error("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  }

  async function deletePost() {
    const confirmDelete = window.confirm(
      "Do you want to delete your post permanentely?"
    );
    if (confirmDelete) {
      console.log("delete");
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      router.push("/cycles");
      console.log("Post", post.id, "succesfully deleted");
    }
  }

  return (
    <>
      <section className="flex justify-center">
        <container className="flex flex-col sm:flex-row justify-center w-3/4 p-10 m-5 bg-secondary rounded-lg">
          <div className="w-2/4">
            <Image
              src={post.image_url}
              width={500}
              height={500}
              alt={post.title}
              sizes="260px"
              style={{
                width: "500px",
                height: "500px",
                objectFit: "cover",
              }}
              className="rounded-lg text-center"
            />
          </div>
          <div className="sm:w-2/4 flex flex-col py-4 gap-5">
            <WishlistButton onClick={onToggleWishlist} post={post} />
            <h5>{post.status}</h5>
            <h2>{post.title}</h2>
            <h5>
              | ICON | {post.address} | {post.zipcode} {post.city} |{" "}
              {post.country}
            </h5>
            <ul>
              <li>Category: {post.category}</li>
              <li>
                Quantity: {post.quantity} {post.unit}
              </li>
            </ul>
            <UserCard user={post.created_by} />
            <TransactionForm post={post} onClick={editPost} />
            {session && session.user.id === post.created_by ? (
              <Button onClick={deletePost} text="delete"></Button>
            ) : (
              ""
            )}
          </div>
        </container>
      </section>
    </>
  );
}
